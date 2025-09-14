<script lang="ts">
	import { states } from './state.svelte';
	import JsonEditor from '$lib/components/JsonEditor.svelte';
</script>

<div class="json-wrapper grid grid-cols-1 gap-2 md:grid-cols-2">
	<JsonEditor obj={states.value?.header} readonly>
		{#snippet header()}
			<span class="px-3 text-lg font-semibold">Header</span>
		{/snippet}
	</JsonEditor>
	<JsonEditor obj={states.value?.payload} readonly>
		{#snippet header()}
			<span class="px-3 text-lg font-semibold">Payload</span>
		{/snippet}
	</JsonEditor>
</div>

<style>
	.json-wrapper :global(.cm-editor) {
		height: 100%;
	}
</style>
