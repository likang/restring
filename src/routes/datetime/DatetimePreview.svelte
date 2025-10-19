<script lang="ts">
	import { globalStates } from '../state.svelte';
	import { untrack } from 'svelte';
	import ExternalLinkIcon from '@lucide/svelte/icons/external-link';
	import { states } from './state.svelte';
	import Datetime from './Datetime.svelte';
	import datetimeTool from './datetime';
	import { previewValueOfTool } from '$lib/types';

	$effect(() => {
		const value = previewValueOfTool(globalStates.preview, datetimeTool);
		if (value) {
			untrack(() => {
				states.inputText = globalStates.trimmedInput;
				states.date = value;
			});
		}
	});
</script>

<div class="py-1">
	<a href={datetimeTool.path} class="btn-link px-0 text-sm">
		<span class="text-lg font-semibold">{datetimeTool.name}</span>
		<ExternalLinkIcon class="size-4" />
	</a>
</div>
<Datetime />
