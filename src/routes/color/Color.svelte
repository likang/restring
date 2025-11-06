<script lang="ts">
	import type { Snippet } from 'svelte';

	import CopyButton from '$lib/components/CopyButton.svelte';
	import { states } from './state.svelte';
	import ColorPicker from './ColorPicker.svelte';

	let { showPicker, header }: { showPicker: boolean; header?: Snippet } = $props();
</script>

{#snippet itemRow(label: string, value: () => string)}
	<div class="text-muted-foreground text-right text-xs whitespace-nowrap">{label}</div>
	<div
		class="group hover:bg-muted/50 relative flex min-h-9 items-center justify-between gap-2 rounded-md p-2"
	>
		<p class="font-mono text-sm">{value()}</p>
		<CopyButton
			text={value}
			class="text-muted-foreground hover:text-accent-foreground size-6 rounded-sm group-hover:visible md:invisible"
		/>
	</div>
{/snippet}

{@render header?.()}

<div class="grid grid-cols-[auto_1fr] items-center gap-2">
	{#if showPicker}
		<div class="col-span-2">
			<ColorPicker />
		</div>
	{/if}

	{@render itemRow('HEX', () => states.hex)}
	{@render itemRow('RGB', () => states.rgb)}
	{@render itemRow('HSL', () => states.hsl)}
	{@render itemRow('HWB', () => states.hwb)}
	{@render itemRow('LCH', () => states.lch)}
	{@render itemRow('CMYK', () => states.cmyk)}
</div>
