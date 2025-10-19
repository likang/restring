<script lang="ts">
	import { globalStates } from '../state.svelte';
	import { states } from './state.svelte';
	import { untrack } from 'svelte';
	import Color from './Color.svelte';
	import ExternalLinkIcon from '@lucide/svelte/icons/external-link';
	import colorTool from './color';
	import { previewValueOfTool } from '$lib/types';

	$effect(() => {
		const value = previewValueOfTool(globalStates.preview, colorTool);
		if (value) {
			untrack(() => {
				states.color = value;
			});
		}
	});
</script>

<Color showPicker={true}>
	{#snippet header()}
		<div class="py-1">
			<a href={colorTool.path} class="btn-link px-0 text-sm">
				<span class="text-lg font-semibold">{colorTool.name}</span>
				<ExternalLinkIcon class="size-4" />
			</a>
		</div>
	{/snippet}
</Color>
