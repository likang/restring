<script lang="ts">
	import { globalStates } from '../state.svelte';
	import { untrack } from 'svelte';
	import ExternalLinkIcon from '@lucide/svelte/icons/external-link';
	import { states } from './state.svelte';
	import Datetime from './Datetime.svelte';

	$effect(() => {
		const value =
			globalStates.preview?.name === 'datetime' ? globalStates.preview.value : undefined;
		if (value) {
			untrack(() => {
				states.inputText = globalStates.trimmedInputText;
				states.date = value;
			});
		}
	});
</script>

<div class="py-1">
	<a href="/datetime" class="btn-link text-sm">
		<span class="text-lg font-semibold">Datetime</span>
		<ExternalLinkIcon class="size-4" />
	</a>
</div>
<Datetime />
