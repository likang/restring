<script lang="ts">
	import { EditorView, basicSetup } from 'codemirror';
	import { json } from '@codemirror/lang-json';
	import { oneDark } from '@codemirror/theme-one-dark';
	import { onMount } from 'svelte';
	import CopyButton from '$lib/components/CopyButton.svelte';
	import { beforeLinkOpen } from '$lib/attachments/beforeLinkOpen';

	let { value, show, raw }: { value: any; show: boolean; raw: string } = $props();

	let container: HTMLDivElement | null = null;

	onMount(() => {
		if (!container) return;

		const view = new EditorView({
			parent: container,
			doc: JSON.stringify(value, null, 2),
			extensions: [
				basicSetup,
				json(),
				oneDark,
				EditorView.editable.of(false),
				EditorView.lineWrapping
			]
		});

		$effect(() => {
			view.dispatch({
				changes: {
					from: 0,
					to: view.state.doc.length,
					insert: JSON.stringify(value, null, 2)
				}
			});
		});

		return () => view.destroy();
	});

	function saveState(element: Element) {
		sessionStorage.setItem('json-state', JSON.stringify({ value: raw }));
	}
</script>

<div class="mb-6" class:hidden={!show}>
	<div class="flex items-center justify-between p-2">
		<a
			href="/json"
			class="link link-hover text-lg font-semibold"
			{@attach beforeLinkOpen(saveState)}>JSON</a
		>
		<CopyButton text={value} class="btn btn-square btn-ghost btn-sm" iconClass="size-[1.2em]" />
	</div>
	<div class="cm-container" bind:this={container}></div>
	<div class="flex justify-end p-2">
		<a href="/json" class="link link-primary text-sm" {@attach beforeLinkOpen(saveState)}
			>Open in advanced mode</a
		>
	</div>
</div>

<style>
	.cm-container > :global(.cm-editor) {
		@reference "tailwindcss";
		@apply max-h-[calc(100vh-36rem)] min-h-32 overflow-auto;
	}
</style>
