<script lang="ts">
	import ExternalLinkIcon from '@lucide/svelte/icons/external-link';
	import JsonEditor from '$lib/components/JsonEditor.svelte';

	import { globalStates } from '../state.svelte';
	import { states } from './state.svelte';
	import { untrack } from 'svelte';
	import jsonTool from './json';
	import type { JsonValue } from './json';

	$effect(() => {
		if (globalStates.preview?.tool === jsonTool) {
			untrack(() => {
				const value: JsonValue = globalStates.preview!.value;
				states.obj = value.obj;
				states.txt = value.txt;
			});
		}
	});
</script>

<JsonEditor obj={states.obj} readonly>
	{#snippet header()}
		<a href="/json" class="btn-link px-0 text-sm">
			<span class="text-lg font-semibold">JSON</span>
			<ExternalLinkIcon class="size-4" />
		</a>
	{/snippet}
</JsonEditor>
