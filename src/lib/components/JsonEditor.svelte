<script lang="ts">
	import { EditorView } from 'codemirror';
	import { json } from '$lib/json/json-lang';

	import { mode } from 'mode-watcher';

	import {
		lineNumbers,
		highlightActiveLineGutter,
		highlightSpecialChars,
		drawSelection,
		dropCursor,
		rectangularSelection,
		crosshairCursor,
		highlightActiveLine,
		keymap
	} from '@codemirror/view';
	export { EditorView } from '@codemirror/view';
	import { EditorState } from '@codemirror/state';
	import {
		foldGutter,
		indentOnInput,
		syntaxHighlighting,
		defaultHighlightStyle,
		bracketMatching,
		foldKeymap,
		codeFolding
	} from '@codemirror/language';
	import { highlightSelectionMatches, searchKeymap } from '@codemirror/search';
	import { history, defaultKeymap, historyKeymap } from '@codemirror/commands';

	import { oneDark as githubDark } from '$lib/codemirror/codemirror-one-dark';
	import { oneLight as oneLight } from '$lib/codemirror/codemirror-one-light';

	import { Compartment } from '@codemirror/state';

	import {
		search,
		SearchQuery,
		setSearchQuery,
		findNext,
		findPrevious,
		searchPanelOpen,
		openSearchPanel,
		closeSearchPanel
	} from '@codemirror/search';
	import { onMount, tick } from 'svelte';
	import type { Snippet } from 'svelte';

	import CopyButton from '$lib/components/CopyButton.svelte';
	import HistoryButton from '$lib/components/HistoryButton.svelte';
	import SearchIcon from '@lucide/svelte/icons/search';
	import DownloadIcon from '@lucide/svelte/icons/download';
	import CloseIcon from '@lucide/svelte/icons/x';
	import ShrinkIcon from '@lucide/svelte/icons/shrink';
	import ArrowDownIcon from '@lucide/svelte/icons/move-down';
	import ArrowUpIcon from '@lucide/svelte/icons/move-up';
	import MoreIcon from '@lucide/svelte/icons/more-vertical';
	import RegexIcon from '@lucide/svelte/icons/regex';
	import TextWrapIcon from '@lucide/svelte/icons/wrap-text';
	import CheckIcon from '@lucide/svelte/icons/check';

	import { unshiftHistory } from '$lib/history';
	import { HISTORY_KEY_JSON } from '../../routes/json/json';
	import { downloadBlob } from '$lib/file';

	let cmContainer: HTMLDivElement;
	let headerContainer: HTMLDivElement;

	let searchValue = $state('');
	let searchOpen = $state(false);
	let searchUsingRegex = $state(false);

	let syncing = false;

	let {
		txt,
		obj,
		compact = false,
		textOverflow = false,
		readonly = false,
		uniToolbar = false,
		onDocChanged,
		header
	}: {
		txt?: string; // raw json string
		obj?: any; // parsed json object
		compact?: boolean;
		textOverflow?: boolean;
		readonly?: boolean;
		uniToolbar?: boolean;
		onDocChanged?: (txt: string) => void;
		header?: Snippet;
	} = $props();

	const popoverMoreId = 'popover-more-' + Math.random().toString(36).slice(2, 10);

	let docStr = $derived.by(() => {
		if (txt) {
			return txt;
		} else if (obj) {
			return JSON.stringify(obj, null, compact ? 0 : 2);
		} else {
			return '';
		}
	});

	let editorView: EditorView;

	const jsonBasicSetup = (() => [
		lineNumbers(),
		highlightSpecialChars(),
		history(),
		foldGutter(),
		drawSelection(),
		dropCursor(),
		EditorState.allowMultipleSelections.of(true),
		indentOnInput(),
		syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
		bracketMatching(),
		rectangularSelection(),
		crosshairCursor(),
		highlightSelectionMatches(),
		keymap.of([...defaultKeymap, ...searchKeymap, ...historyKeymap, ...foldKeymap]),
		// Add custom fold placeholder to show array/object sizes
		codeFolding({
			preparePlaceholder: (state, range) => {
				// The range doesn't include outer brackets, so we need to find them
				// Find the first previous { or [ from range.from
				let expandedFrom = range.from;
				let openBracket = '';
				while (expandedFrom > 0) {
					expandedFrom--;
					const char = state.doc.sliceString(expandedFrom, expandedFrom + 1);
					if (char === '{' || char === '[') {
						openBracket = char;
						break;
					}
				}

				// Find the matching closing bracket
				const closeBracket = openBracket === '{' ? '}' : ']';
				let expandedTo = range.to;
				const docLength = state.doc.length;
				while (expandedTo < docLength) {
					const char = state.doc.sliceString(expandedTo, expandedTo + 1);
					expandedTo++;
					if (char === closeBracket) {
						break;
					}
				}

				const text = state.doc.sliceString(expandedFrom, expandedTo);
				let size = 0;
				let type = '';

				try {
					const parsed = JSON.parse(text);
					if (Array.isArray(parsed)) {
						size = parsed.length;
						type = size === 1 ? 'item' : 'items';
					} else if (typeof parsed === 'object' && parsed !== null) {
						size = Object.keys(parsed).length;
						type = size === 1 ? 'property' : 'properties';
					}
				} catch (e) {
					// If parsing fails, return null to use default placeholder
					return null;
				}

				return { size, type };
			},
			placeholderDOM: (view, onclick, prepared) => {
				const element = document.createElement('span');
				element.className = 'cm-foldPlaceholder';
				element.onclick = onclick;

				if (prepared && prepared.size !== undefined) {
					element.textContent = `${prepared.size} ${prepared.type}`;
				} else {
					element.textContent = '…';
				}

				return element;
			}
		})
	])();

	onMount(() => {
		const editableCompartment = new Compartment();
		const wrapCompartment = new Compartment();
		const highlightActiveLineCompartment = new Compartment();
		const themeCompartment = new Compartment();

		editorView = new EditorView({
			parent: cmContainer,
			doc: docStr,
			extensions: [
				jsonBasicSetup,
				json(),
				themeCompartment.of(mode.current === 'dark' ? githubDark : oneLight),
				search({
					createPanel: (view) => {
						return {
							dom: document.createElement('div') // create a dummy search panel
						};
					}
				}),
				wrapCompartment.of(textOverflow ? [] : EditorView.lineWrapping),
				editableCompartment.of(EditorView.editable.of(!readonly)),
				highlightActiveLineCompartment.of(
					readonly ? [] : [highlightActiveLine(), highlightActiveLineGutter()]
				),
				EditorView.updateListener.of((update) => {
					if (update.docChanged) {
						if (readonly) {
							return;
						}
						syncing = true;
						onDocChanged?.(update.state.doc.toString());
						tick().then(() => {
							syncing = false;
						});
					} else {
						searchOpen = searchPanelOpen(update.state);
					}
				}),
				EditorView.domEventHandlers({
					paste: (event: ClipboardEvent) => {
						const pastedTextLength = (event.clipboardData?.getData('text') ?? '').length;
						setTimeout(() => {
							if (pastedTextLength === docStr.length) {
								unshiftHistory(docStr, HISTORY_KEY_JSON);
							}
						}, 0);
						return false;
					}
				})
			]
		});

		$effect(() => {
			editorView.dispatch({
				effects: editableCompartment.reconfigure(EditorView.editable.of(!readonly))
			});
		});

		$effect(() => {
			editorView.dispatch({
				effects: wrapCompartment.reconfigure(textOverflow ? [] : EditorView.lineWrapping)
			});
		});

		$effect(() => {
			editorView.dispatch({
				effects: themeCompartment.reconfigure(mode.current === 'dark' ? githubDark : oneLight)
			});
		});

		$effect(() => {
			const doc = docStr;
			if (syncing) {
				return;
			}
			editorView.dispatch({
				changes: {
					from: 0,
					to: editorView.state.doc.length,
					insert: doc
				}
			});
		});

		$effect(() => {
			if (searchOpen) {
				openSearchPanel(editorView);
				tick().then(() => {
					headerContainer.querySelector('input')?.focus();
				});
			} else {
				closeSearchPanel(editorView);
			}
		});

		$effect(() => {
			let query = new SearchQuery({
				search: searchValue,
				caseSensitive: false,
				regexp: searchUsingRegex,
				wholeWord: false
			});
			editorView.dispatch({ effects: setSearchQuery.of(query) });
		});

		return () => {
			editorView.destroy();
		};
	});

	function handleFindNext() {
		if (editorView) findNext(editorView);
	}

	function handleFindPrevious() {
		if (editorView) findPrevious(editorView);
	}

	function historySelected(his: string) {
		editorView.dispatch({
			changes: {
				from: 0,
				to: editorView.state.doc.length,
				insert: his
			}
		});
		unshiftHistory(his, HISTORY_KEY_JSON);
	}
	function downloadJson() {
		const jsonStr = editorView?.state?.doc?.toString() ?? '';
		const blob = new Blob([jsonStr], { type: 'application/json' });
		downloadBlob(blob, 'data.json');
	}
</script>

{#snippet searchBar()}
	<div class="relative">
		<input
			type="text"
			placeholder="Search"
			class="input h-7 pr-8"
			bind:value={searchValue}
			onkeydown={(e) => {
				if (e.key == 'Escape') {
					searchOpen = false;
				}
			}}
		/>

		<div class="absolute inset-y-0 right-1 flex flex-row items-center">
			<button
				class="btn-ghost h-6 rounded-xs px-0.5"
				onclick={() => (searchUsingRegex = !searchUsingRegex)}
			>
				<RegexIcon class={searchUsingRegex ? 'text-blue-600' : ''} />
			</button>
		</div>
	</div>
	<button class="btn-icon-ghost size-7" onclick={handleFindPrevious}>
		<ArrowUpIcon />
	</button>
	<button class="btn-icon-ghost size-7" onclick={handleFindNext}>
		<ArrowDownIcon />
	</button>
	<button
		class="btn-icon-ghost size-7"
		onclick={() => {
			searchOpen = false;
		}}
	>
		<CloseIcon />
	</button>
{/snippet}

<div class="flex min-h-0 flex-col {uniToolbar ? 'rounded-md bg-[#fafafa] dark:bg-[#282c34]' : ''}">
	<div
		class="flex h-11 items-center gap-2 py-1 {uniToolbar
			? 'border-b border-gray-950/5 dark:border-white/10'
			: ''}"
		bind:this={headerContainer}
	>
		{@render header?.()}
		<div class="flex flex-1 items-center justify-end">
			{#if searchOpen}
				{@render searchBar()}
			{:else}
				<button
					class="btn-icon-ghost"
					data-tooltip="Search"
					onclick={() => {
						searchOpen = true;
					}}
				>
					<SearchIcon />
				</button>

				{#if readonly}
					<button
						class="btn-icon-ghost"
						data-tooltip="Toggle compact mode"
						onclick={() => (compact = !compact)}
					>
						<ShrinkIcon class={compact ? 'text-blue-600' : ''} />
					</button>
				{/if}
				{#if !readonly}
					<HistoryButton {historySelected} key={HISTORY_KEY_JSON} />
				{/if}
				<CopyButton text={docStr} tooltip="Copy" />

				<div id={popoverMoreId} class="dropdown-menu">
					<button
						type="button"
						id={popoverMoreId + '-trigger'}
						aria-haspopup="menu"
						aria-controls={popoverMoreId + '-menu'}
						aria-expanded="false"
						class="btn-icon-ghost"
					>
						<MoreIcon />
					</button>
					<div
						id={popoverMoreId + '-popover'}
						data-popover
						data-side="bottom"
						data-align="end"
						aria-hidden="true"
					>
						<div
							role="menu"
							id={popoverMoreId + '-menu'}
							aria-labelledby={popoverMoreId + '-trigger'}
						>
							<button role="menuitem" onclick={() => (textOverflow = !textOverflow)}>
								{#if textOverflow}
									<TextWrapIcon />
								{:else}
									<CheckIcon />
								{/if}

								Text Wrap
							</button>
							<button role="menuitem" onclick={downloadJson}>
								<DownloadIcon />
								Download
							</button>
						</div>
					</div>
				</div>
			{/if}
		</div>
	</div>
	<div class="cm-container relative min-h-0 flex-1" bind:this={cmContainer}></div>
</div>

<style>
	.cm-container :global(.cm-editor) {
		@reference "tailwindcss";
		@apply rounded-md py-3;
	}
</style>
