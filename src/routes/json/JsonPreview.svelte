<script lang="ts">
	import ExternalLinkIcon from '@lucide/svelte/icons/external-link';
	import JsonEditor from '$lib/components/JsonEditor.svelte';

	import { globalStates } from '../state.svelte';
	import { states } from './state.svelte';
	import { untrack } from 'svelte';
	import jsonTool from './json';
	import { previewValueOfTool } from '$lib/types';

	$effect(() => {
		const value = previewValueOfTool(globalStates.preview, jsonTool);
		if (value) {
			untrack(() => {
				states.obj = value.obj;
				states.txt = value.txt;
			});
		}
	});
</script>

<JsonEditor obj={states.obj} readonly>
	{#snippet header()}
		<a href={jsonTool.path} class="btn-link px-0 text-sm">
			<span class="text-lg font-semibold">{jsonTool.name}</span>
			<ExternalLinkIcon class="size-4" />
		</a>
	{/snippet}
</JsonEditor>
