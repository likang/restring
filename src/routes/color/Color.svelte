<script lang="ts">
	import CopyButton from '$lib/components/CopyButton.svelte';
	import { page } from '$app/state';

	import type { Colord } from 'colord';
	import { colord, getFormat } from './color';
	import ExternalLinkIcon from '@lucide/svelte/icons/external-link';

	import { colors } from './state.svelte';

	const onHomepage = $derived(page.url.pathname === '/');

	type Source = 'picker' | 'hex' | 'rgb' | 'hsl' | 'hwb' | 'lch' | 'cmyk';

	let hexInput: HTMLInputElement;
	let rgbInput: HTMLInputElement;
	let hslInput: HTMLInputElement;
	let hwbInput: HTMLInputElement;
	let lchInput: HTMLInputElement;
	let cmykInput: HTMLInputElement;

	let { color }: { color?: Colord } = $props();
	if (color && color.isValid()) {
		onColorChange(color);
	}

	function onColorInputChange(source: Source) {
		return (event: Event) => {
			const value = (event.target as HTMLInputElement).value;
			if (source !== 'picker' && getFormat(value) !== source) {
				if (value !== '') {
					colors[source].error = true;
				}
				return;
			}
			colors[source].error = false;
			onColorChange(colord(value), source);
		};
	}

	function onColorChange(color: Colord, source?: Source) {
		colors.previewColor = color.toHex();
		colors.picker.value = colors.previewColor.substring(0, 7);

		if (source !== 'hex') {
			colors.hex.value = color.toHex();
			colors.hex.error = false;
		}
		if (source !== 'rgb') {
			colors.rgb.value = color.toRgbString();
			colors.rgb.error = false;
		}
		if (source !== 'hsl') {
			colors.hsl.value = color.toHslString();
			colors.hsl.error = false;
		}
		if (source !== 'hwb') {
			colors.hwb.value = color.toHwbString();
			colors.hwb.error = false;
		}
		if (source !== 'lch') {
			colors.lch.value = color.toLchString();
			colors.lch.error = false;
		}
		if (source !== 'cmyk') {
			colors.cmyk.value = color.toCmykString();
			colors.cmyk.error = false;
		}
	}
</script>

<div class="py-1">
	{#if onHomepage}
		<a href="/color" class="btn-link text-sm">
			<span class="text-lg font-semibold">Color</span>
			<ExternalLinkIcon class="size-4" />
		</a>
	{/if}
</div>
<div class="flex flex-col gap-2">
	<div class="relative">
		<label
			class="border-input border-1px block h-9 w-full rounded-md border"
			style="background-color: {colors.previewColor}"
			for="color-picker"
		></label>
		<input
			id="color-picker"
			type="color"
			class="invisible absolute top-0 left-1/3 h-9"
			value={colors.picker.value}
			oninput={onColorInputChange('picker')}
		/>
	</div>
	<div class="group relative">
		<input
			bind:this={hexInput}
			type="text"
			class="input"
			placeholder="Hex, e.g. #fafafa"
			value={colors.hex.value}
			oninput={onColorInputChange('hex')}
			aria-invalid={colors.hex.error}
		/>
		<CopyButton
			text={() => hexInput.value}
			class="btn-icon-ghost invisible absolute top-1/2 right-1 size-7 -translate-y-1/2 rounded-sm group-hover:visible"
		/>
	</div>
	<div class="group relative">
		<input
			bind:this={rgbInput}
			type="text"
			class="input"
			placeholder="Rgb, e.g. rgb(250, 250, 250)"
			value={colors.rgb.value}
			oninput={onColorInputChange('rgb')}
			aria-invalid={colors.rgb.error}
		/>
		<CopyButton
			text={() => rgbInput.value}
			class="btn-icon-ghost invisible absolute top-1/2 right-1 size-7 -translate-y-1/2 rounded-sm group-hover:visible"
		/>
	</div>
	<div class="group relative">
		<input
			bind:this={hslInput}
			type="text"
			class="input"
			placeholder="Hsl, e.g. hsl(0, 0%, 100%)"
			value={colors.hsl.value}
			oninput={onColorInputChange('hsl')}
			aria-invalid={colors.hsl.error}
		/>
		<CopyButton
			text={() => hslInput.value}
			class="btn-icon-ghost invisible absolute top-1/2 right-1 size-7 -translate-y-1/2 rounded-sm group-hover:visible"
		/>
	</div>
	<div class="group relative">
		<input
			bind:this={hwbInput}
			type="text"
			class="input"
			placeholder="Hwb, e.g. hwb(0, 0%, 0%)"
			value={colors.hwb.value}
			oninput={onColorInputChange('hwb')}
			aria-invalid={colors.hwb.error}
		/>
		<CopyButton
			text={() => hwbInput.value}
			class="btn-icon-ghost invisible absolute top-1/2 right-1 size-7 -translate-y-1/2 rounded-sm group-hover:visible"
		/>
	</div>
	<div class="group relative">
		<input
			bind:this={lchInput}
			type="text"
			class="input"
			placeholder="Lch, e.g. lch(0, 0%, 0%)"
			value={colors.lch.value}
			oninput={onColorInputChange('lch')}
			aria-invalid={colors.lch.error}
		/>
		<CopyButton
			text={() => lchInput.value}
			class="btn-icon-ghost invisible absolute top-1/2 right-1 size-7 -translate-y-1/2 rounded-sm group-hover:visible"
		/>
	</div>
	<div class="group relative">
		<input
			bind:this={cmykInput}
			type="text"
			class="input"
			placeholder="Cmyk, e.g. cmyk(0, 0%, 0%, 0%)"
			value={colors.cmyk.value}
			oninput={onColorInputChange('cmyk')}
			aria-invalid={colors.cmyk.error}
		/>
		<CopyButton
			text={() => cmykInput.value}
			class="btn-icon-ghost invisible absolute top-1/2 right-1 size-7 -translate-y-1/2 rounded-sm group-hover:visible"
		/>
	</div>
</div>
