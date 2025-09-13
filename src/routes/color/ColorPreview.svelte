<script lang="ts">
	import { globalStates } from '../state.svelte';
	import { setColor } from './state.svelte';
	import { untrack } from 'svelte';
	import Color from './Color.svelte';
	import ExternalLinkIcon from '@lucide/svelte/icons/external-link';

	$effect(() => {
		const color = globalStates.preview?.name === 'color' ? globalStates.preview.value : undefined;
		if (color) {
			untrack(() => {
				setColor(color);
			});
		}
	});
</script>

<Color>
	{#snippet header()}
		<div class="py-1">
			<a href="/color" class="btn-link text-sm">
				<span class="text-lg font-semibold">Color</span>
				<ExternalLinkIcon class="size-4" />
			</a>
		</div>
	{/snippet}
</Color>
