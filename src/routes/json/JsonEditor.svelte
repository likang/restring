<script lang="ts">
	import { EditorView, basicSetup } from 'codemirror';
	import { json } from '@codemirror/lang-json';
	import { oneDark } from '@codemirror/theme-one-dark';
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
	import { clickOutsideDropdown } from '$lib/attachments/clickOutside';
	import SearchIcon from '$lib/icons/Search.svelte';
	import DownloadIcon from '$lib/icons/Download.svelte';
	import CloseIcon from '$lib/icons/Close.svelte';
	import CompressionIcon from '$lib/icons/Compression.svelte';
	import ArrowDownIcon from '$lib/icons/ArrowDown.svelte';
	import ArrowUpIcon from '$lib/icons/ArrowUp.svelte';
	import RegexIcon from '$lib/icons/Regex.svelte';
	import MoreIcon from '$lib/icons/More.svelte';

	import { unshiftHistory } from '$lib/history';
	import TextOverflowIcon from '$lib/icons/TextOverflow.svelte';

	let cmContainer: HTMLDivElement;
	let headerContainer: HTMLDivElement;

	let searchValue = $state('');
	let searchOpen = $state(false);
	let searchUsingRegex = $state(false);

	let muteDocChange = false;

	const HISTORY_KEY = 'history-json';

	let {
		jsonStr = $bindable(),
		jsonObj,
		compact = false,
		textOverflow = false,
		historyKey = HISTORY_KEY,
		header
	}: {
		jsonStr?: string; // raw json string, undefined means readonly viewer
		jsonObj?: any; // parsed json object
		compact?: boolean;
		textOverflow?: boolean;
		historyKey?: string;
		header?: Snippet;
	} = $props();

	let isReadonlyViewer = $derived(jsonStr === undefined);

	let docStr = $derived.by(() => {
		const js = jsonStr ?? '';
		if (jsonObj === null) {
			return 'Invalid JSON';
		} else if (jsonObj !== undefined) {
			return JSON.stringify(jsonObj, null, compact ? undefined : 2);
		} else {
			return isReadonlyViewer ? '' : js;
		}
	});

	let editorView: EditorView;

	onMount(() => {
		const editableCompartment = new Compartment();
		const wrapCompartment = new Compartment();

		editorView = new EditorView({
			parent: cmContainer,
			doc: docStr,
			extensions: [
				basicSetup,
				json(),
				oneDark,
				search({
					createPanel: (view) => {
						return {
							dom: document.createElement('div') // create a dummy search panel
						};
					}
				}),
				wrapCompartment.of(textOverflow ? [] : EditorView.lineWrapping),
				editableCompartment.of(EditorView.editable.of(!isReadonlyViewer)),
				EditorView.updateListener.of((update) => {
					if (update.docChanged) {
						if (isReadonlyViewer) {
							return;
						}
						muteDocChange = true;
						jsonStr = update.state.doc.toString();
						tick().then(() => {
							muteDocChange = false;
						});
					} else {
						searchOpen = searchPanelOpen(update.state);
					}
				}),
				EditorView.domEventHandlers({
					paste: (event: ClipboardEvent) => {
						const pastedText = event.clipboardData?.getData('text') ?? '';
						setTimeout(() => {
							if (pastedText.length === docStr.length) {
								unshiftHistory(pastedText, historyKey);
							}
						}, 0);
						return false;
					}
				})
			]
		});

		$effect(() => {
			editorView.dispatch({
				effects: editableCompartment.reconfigure(EditorView.editable.of(!isReadonlyViewer))
			});
		});

		$effect(() => {
			editorView.dispatch({
				effects: wrapCompartment.reconfigure(textOverflow ? [] : EditorView.lineWrapping)
			});
		});

		$effect(() => {
			const doc = docStr;
			if (muteDocChange) {
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
		jsonStr = his;
		unshiftHistory(his, historyKey);
	}
</script>

{#snippet searchBar()}
	<label class="input input-sm">
		<SearchIcon class="size-[1em] opacity-50" />
		<input
			type="input"
			class="grow"
			placeholder="Search"
			bind:value={searchValue}
			onkeydown={(e) => {
				if (e.key === 'Escape') {
					searchOpen = false;
				}
			}}
		/>
		<div class="flex flex-row items-center">
			<button class="btn btn-xs btn-ghost px-0.5" onclick={handleFindPrevious}>
				<ArrowUpIcon class="size-[1em]" />
			</button>
			<button class="btn btn-xs btn-ghost px-0.5" onclick={handleFindNext}>
				<ArrowDownIcon class="size-[1em]" />
			</button>
			<button
				class="btn btn-xs btn-ghost px-0.5"
				onclick={() => (searchUsingRegex = !searchUsingRegex)}
			>
				<RegexIcon class="size-[1em] {searchUsingRegex ? 'text-primary' : ''}" />
			</button>
		</div>
	</label>
	<button
		class="btn btn-square btn-ghost btn-sm"
		onclick={() => {
			searchOpen = false;
		}}
	>
		<CloseIcon class="size-[1.2em]" />
	</button>
{/snippet}

<div class="flex flex-col">
	<div class="flex items-center gap-2 p-2" bind:this={headerContainer}>
		{@render header?.()}
		<div class="flex flex-1 items-center justify-end">
			{#if searchOpen}
				{@render searchBar()}
			{:else}
				<div class="tooltip" data-tip="Search">
					<button
						class="btn btn-square btn-ghost btn-sm"
						onclick={() => {
							searchOpen = true;
						}}
					>
						<SearchIcon class="size-[1.2em]" />
					</button>
				</div>
				{#if isReadonlyViewer}
					<div class="tooltip" data-tip="Compact">
						<button class="btn btn-square btn-ghost btn-sm" onclick={() => (compact = !compact)}>
							<CompressionIcon class="size-[1.2em] {compact ? 'text-primary' : ''}" />
						</button>
					</div>
				{/if}
				{#if !isReadonlyViewer}
					<HistoryButton {historySelected} key={historyKey} />
				{/if}
				<div class="tooltip" data-tip="Copy">
					<CopyButton
						text={docStr}
						class="btn btn-square btn-ghost btn-sm"
						iconClass="size-[1.2em]"
					/>
				</div>

				<details class="dropdown dropdown-end" {@attach clickOutsideDropdown}>
					<summary class="btn btn-square btn-ghost btn-sm">
						<MoreIcon class="size-[1.2em]" />
					</summary>
					<ul class="menu dropdown-content bg-base-100 rounded-box z-1 w-max p-2 shadow-sm">
						<li>
							<button class="cursor-auto" onclick={() => (textOverflow = !textOverflow)}>
								<TextOverflowIcon class="size-[1.2em] {textOverflow ? 'text-primary' : ''}" />
								No Wrap
							</button>
						</li>

						<li>
							<button class="cursor-auto">
								<DownloadIcon class="size-[1.2em]" />
								Download
							</button>
						</li>
					</ul>
				</details>
			{/if}
		</div>
	</div>
	<div class="cm-container relative flex-1" bind:this={cmContainer}></div>
</div>

<style>
	.cm-container :global(.cm-panels) {
		border: none !important;
	}
</style>
