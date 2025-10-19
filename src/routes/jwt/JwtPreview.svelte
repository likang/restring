<script lang="ts">
	import { globalStates } from '../state.svelte';
	import { untrack } from 'svelte';
	import ExternalLinkIcon from '@lucide/svelte/icons/external-link';
	import { states } from './state.svelte';
	import JsonEditor from '$lib/components/JsonEditor.svelte';
	import jwtTool from './jwt';

	$effect(() => {
		if (globalStates.preview?.name === jwtTool.name) {
			untrack(() => {
				states.inputText = globalStates.trimmedInput;
				states.value = globalStates.preview!.value;
			});
		}
	});
</script>

<div class="py-1">
	<a href="/jwt" class="btn-link px-0 text-sm">
		<span class="text-lg font-semibold">JWT</span>
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
