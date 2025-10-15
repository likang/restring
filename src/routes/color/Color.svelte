<script lang="ts">
	import type { Snippet } from 'svelte';

	import CopyButton from '$lib/components/CopyButton.svelte';
	import { colord, getFormat } from 'colord';
	import { states, setColor, type Source } from './state.svelte';

	let { header }: { header?: Snippet } = $props();

	let hexInput: HTMLInputElement;
	let rgbInput: HTMLInputElement;
	let hslInput: HTMLInputElement;
	let hwbInput: HTMLInputElement;
	let lchInput: HTMLInputElement;
	let cmykInput: HTMLInputElement;

	function onColorInputChange(source: Source) {
		return (event: Event) => {
			const value = (event.target as HTMLInputElement).value;
			if (source !== 'picker') {
				if (getFormat(value) !== source) {
					if (value === '') {
						states[source].error = false;
					} else {
						states[source].error = true;
					}
					return;
				}
				states[source].error = false;
			}
			const newColor = colord(value);
			setColor(newColor, source);
		};
	}
</script>

{@render header?.()}
<div class="flex flex-col gap-2">
	<div class="relative">
		<label
			class="border-input border-1px block h-9 w-full rounded-md border"
			style="background-color: {states.previewColor}"
			for="color-picker"
		></label>
		<input
			id="color-picker"
			type="color"
			class="invisible absolute top-0 left-1/3 h-9"
			value={states.pickerColor}
			oninput={onColorInputChange('picker')}
		/>
	</div>
	<div class="group relative">
		<input
			bind:this={hexInput}
			type="text"
			class="input"
			placeholder="Hex, e.g. #fafafa"
			value={states.hex.value}
			oninput={onColorInputChange('hex')}
			aria-invalid={states.hex.error}
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
			value={states.rgb.value}
			oninput={onColorInputChange('rgb')}
			aria-invalid={states.rgb.error}
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
			value={states.hsl.value}
			oninput={onColorInputChange('hsl')}
			aria-invalid={states.hsl.error}
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
			value={states.hwb.value}
			oninput={onColorInputChange('hwb')}
			aria-invalid={states.hwb.error}
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
			value={states.lch.value}
			oninput={onColorInputChange('lch')}
			aria-invalid={states.lch.error}
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
			value={states.cmyk.value}
			oninput={onColorInputChange('cmyk')}
			aria-invalid={states.cmyk.error}
		/>
		<CopyButton
			text={() => cmykInput.value}
			class="btn-icon-ghost invisible absolute top-1/2 right-1 size-7 -translate-y-1/2 rounded-sm group-hover:visible"
		/>
	</div>
</div>
