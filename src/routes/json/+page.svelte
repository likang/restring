<script lang="ts">
	import { EditorView, basicSetup } from 'codemirror';
	import { json } from '@codemirror/lang-json';
	import { oneDark } from '@codemirror/theme-one-dark';
	import { onMount } from 'svelte';
	import CopyButton from '$lib/components/CopyButton.svelte';
	import HistoryButton from '$lib/components/HistoryButton.svelte';
	import { browser } from '$app/environment';
	import { unshiftHistory } from '$lib/history';

	let sourceContainer: HTMLDivElement | null = null;
	let resultContainer: HTMLDivElement | null = null;
	let sourceValue = $state('');
	let resultValue = $state('');

	const historyKey = 'history-json';

	if (browser) {
		const stateStr = sessionStorage.getItem('json-state');
		try {
			const state = JSON.parse(stateStr ?? '{}');
			sourceValue = state.value ?? '';
			sessionStorage.removeItem('json-state');
		} catch {}
	}

	$effect(() => {
		try {
			const parsed = JSON.parse(sourceValue);
			resultValue = JSON.stringify(parsed, null, 2);
		} catch {}
	});

	onMount(() => {
		if (!sourceContainer || !resultContainer) return;

		const sourceEditorView = new EditorView({
			parent: sourceContainer,
			doc: sourceValue,
			extensions: [
				basicSetup,
				json(),
				oneDark,
				EditorView.editable.of(true),
				EditorView.lineWrapping,
				EditorView.updateListener.of((update) => {
					if (update.docChanged) {
						sourceValue = update.state.doc.toString();
					}
				}),
				EditorView.domEventHandlers({
					paste: (event: ClipboardEvent) => {
						const pastedText = event.clipboardData?.getData('text') ?? '';
						setTimeout(() => {
							if (sourceValue === pastedText) {
								unshiftHistory(sourceValue, historyKey);
							}
						}, 0);
						return false;
					}
				})
			]
		});

		const resultEditorView = new EditorView({
			parent: resultContainer,
			doc: resultValue,
			extensions: [
				basicSetup,
				json(),
				oneDark,
				EditorView.editable.of(false),
				EditorView.lineWrapping
			]
		});

		$effect(() => {
			sourceEditorView.dispatch({
				changes: {
					from: 0,
					to: sourceEditorView.state.doc.length,
					insert: sourceValue
				}
			});
		});

		$effect(() => {
			resultEditorView.dispatch({
				changes: {
					from: 0,
					to: resultEditorView.state.doc.length,
					insert: resultValue
				}
			});
		});
		return () => {
			resultEditorView.destroy();
			sourceEditorView.destroy();
		};
	});

	function historySelected(his: string) {
		sourceValue = his;
		unshiftHistory(his, historyKey);
	}
</script>

<div class="grid h-[calc(100vh-4rem)] grid-cols-1 gap-4 md:grid-cols-2">
	<div class="flex flex-col">
		<div class="flex items-center p-2">
			<div class="flex flex-1 items-center gap-2">
				<span class="text-lg font-semibold">Source</span>
			</div>
			<HistoryButton {historySelected} key={historyKey} />
			<CopyButton
				text={sourceValue}
				class="btn btn-square btn-ghost btn-sm"
				iconClass="size-[1.2em]"
			/>
		</div>
		<div class="cm-container relative flex-1" bind:this={sourceContainer}></div>
	</div>
	<div class="flex flex-col">
		<div class="flex items-center justify-between p-2">
			<span class="text-lg font-semibold">Formatted</span>
			<CopyButton
				text={resultValue}
				class="btn btn-square btn-ghost btn-sm"
				iconClass="size-[1.2em]"
			/>
		</div>
		<div class="cm-container relative flex-1" bind:this={resultContainer}></div>
	</div>
</div>

<style>
	.cm-container > :global(.cm-editor) {
		position: absolute !important;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}
</style>
