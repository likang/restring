<script lang="ts">
	import { globalStates } from '../state.svelte';
	import { states } from './state.svelte';
	import { untrack } from 'svelte';
	import Color from './Color.svelte';
	import ExternalLinkIcon from '@lucide/svelte/icons/external-link';
	import { tool } from './color';
	import type { Colord } from 'colord';

	$effect(() => {
		if (globalStates.preview?.name === tool.name) {
			untrack(() => {
				states.color = globalStates.preview!.value;
			});
		}
	});
</script>

<Color showPicker={true}>
	{#snippet header()}
		<div class="py-1">
			<a href="/color" class="btn-link px-0 text-sm">
				<span class="text-lg font-semibold">Color</span>
				<ExternalLinkIcon class="size-4" />
			</a>
		</div>
	{/snippet}
</Color>
