<script lang="ts">
	import JsonEditor from '$lib/components/JsonEditor.svelte';
	import { states } from './state.svelte';

	const whitespaceRegex = /^\s*$/;

	function onDocChanged(txt: string) {
		states.txt = txt;

		if (whitespaceRegex.test(txt)) {
			states.obj = undefined;
		} else {
			try {
				states.obj = JSON.parse(txt);
			} catch {
				states.obj = undefined;
			}
		}
	}
</script>

<svelte:head>
	<title>restring - JSON Formatter and Viewer</title>
	<meta name="description" content="Easily format, view, and edit your JSON online." />
</svelte:head>

<div
	class="json-wrapper grid h-[calc(100vh-(var(--spacing)*14))] grid-cols-1 gap-2 px-2 md:grid-cols-2"
>
	<JsonEditor txt={states.txt} {onDocChanged}>
		{#snippet header()}
			<h2 class="text-lg font-semibold">JSON Text</h2>
		{/snippet}
	</JsonEditor>

	<JsonEditor obj={states.obj} readonly>
		{#snippet header()}
			<h2 class="text-lg font-semibold">JSON Formatted</h2>
		{/snippet}
	</JsonEditor>
</div>

<style>
	.json-wrapper :global(.cm-editor) {
		height: 100%;
	}
</style>
