<script lang="ts">
	import { EditorView, basicSetup } from 'codemirror';
	import { json } from '@codemirror/lang-json';
	import { oneDark } from '@codemirror/theme-one-dark';
	import { onDestroy, onMount } from 'svelte';
	import CopyButton from '$lib/components/CopyButton.svelte';

	let { value, show }: { value: string; show: boolean } = $props();

	let view: EditorView | null = null;
	let container: HTMLDivElement | null = null;

	onMount(() => {
		if (!container) return;

		view = new EditorView({
			parent: container,
			doc: value,
			extensions: [basicSetup, json(), oneDark, EditorView.editable.of(false)]
		});
	});

	$effect(() => {
		if (!view) return;
		view.dispatch({
			changes: {
				from: 0,
				to: view.state.doc.length,
				insert: value
			}
		});
	});

	onDestroy(() => {
		view?.destroy();
	});
</script>

<div class="mb-6" class:hidden={!show}>
	<div class="flex justify-end p-2">
		<CopyButton text={value} class="btn btn-square btn-ghost btn-sm" iconClass="size-[1.2em]" />
	</div>
	<div class="min-h-32" bind:this={container}></div>
</div>
