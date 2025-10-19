<script lang="ts">
	import { globalStates } from '../state.svelte';
	import { untrack } from 'svelte';
	import ExternalLinkIcon from '@lucide/svelte/icons/external-link';
	import { states } from './state.svelte';
	import Datetime from './Datetime.svelte';
	import datetimeTool from './datetime';

	$effect(() => {
		if (globalStates.preview?.tool === datetimeTool) {
			untrack(() => {
				states.inputText = globalStates.trimmedInput;
				states.date = globalStates.preview!.value;
			});
		}
	});
</script>

<div class="py-1">
	<a href="/datetime" class="btn-link px-0 text-sm">
		<span class="text-lg font-semibold">Datetime</span>
		<ExternalLinkIcon class="size-4" />
	</a>
</div>
<Datetime />
