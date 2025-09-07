<script lang="ts">
	import JsonEditor from './JsonEditor.svelte';
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

<div
	class="json-wrapper grid h-[calc(100vh-(var(--spacing)*14))] grid-cols-1 gap-2 px-2 md:grid-cols-2"
>
	<JsonEditor txt={states.txt} {onDocChanged}>
		{#snippet header()}
			<span class="text-lg font-semibold">Source</span>
		{/snippet}
	</JsonEditor>

	<JsonEditor obj={states.obj} readonly>
		{#snippet header()}
			<span class="text-lg font-semibold">Formatted</span>
		{/snippet}
	</JsonEditor>
</div>

<style>
	.json-wrapper :global(.cm-editor) {
		height: 100%;
	}
</style>
