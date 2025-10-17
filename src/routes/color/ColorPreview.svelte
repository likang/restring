<script lang="ts">
	import { globalStates } from '../state.svelte';
	import { states } from './state.svelte';
	import { untrack } from 'svelte';
	import Color from './Color.svelte';
	import ExternalLinkIcon from '@lucide/svelte/icons/external-link';

	$effect(() => {
		const color = globalStates.preview?.name === 'color' ? globalStates.preview.value : undefined;
		if (color) {
			untrack(() => {
				states.color = color;
			});
		}
	});
</script>

<Color showPicker={true}>
	{#snippet header()}
		<div class="py-1">
			<a href="/color" class="btn-link text-sm">
				<span class="text-lg font-semibold">Color</span>
				<ExternalLinkIcon class="size-4" />
			</a>
		</div>
	{/snippet}
</Color>
