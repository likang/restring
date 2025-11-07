<script lang="ts">
	import { globalStates } from '../state.svelte';
	import { untrack } from 'svelte';
	import ExternalLinkIcon from '@lucide/svelte/icons/external-link';
	import { states } from './state.svelte';
	import JsonEditor from '$lib/components/JsonEditor.svelte';
	import jwtTool from './jwt';
	import { previewValueOfTool } from '$lib/types';

	$effect(() => {
		const value = previewValueOfTool(globalStates.preview, jwtTool);
		if (value) {
			untrack(() => {
				states.inputText = globalStates.trimmedInput;
				states.value = value;
			});
		}
	});
</script>

<div class="py-1">
	<a href={jwtTool.path} class="btn-link px-0 text-sm">
		<h2 class="text-lg font-semibold">JWT Decoder</h2>
		<ExternalLinkIcon class="size-4" />
	</a>
</div>
<div class="json-wrapper grid grid-cols-1 gap-2 md:grid-cols-2">
	<JsonEditor obj={states.value?.header} readonly uniToolbar>
		{#snippet header()}
			<span class="px-3">Header</span>
		{/snippet}
	</JsonEditor>
	<JsonEditor obj={states.value?.payload} readonly uniToolbar>
		{#snippet header()}
			<span class="px-3">Payload</span>
		{/snippet}
	</JsonEditor>
</div>

<style>
	.json-wrapper :global(.cm-editor) {
		height: 100%;
	}
</style>
