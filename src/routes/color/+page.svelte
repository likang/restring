<script lang="ts">
	import Color from './Color.svelte';
	import { states } from './state.svelte';
	import ColorPicker from './ColorPicker.svelte';
	import { parseColor } from './color';
</script>

<svelte:head>
	<title>restring - Color Converter</title>
	<meta
		name="description"
		content="Convert between different color formats: hex, rgb, hsl, hwb, lch, cmyk."
	/>
	<meta
		name="keywords"
		content="color converter, color picker, hex, rgb, hsl, hwb, lch, cmyk, color formats, color converter tool, color picker tool, color online tool, color converter online, color picker online, restring"
	/>
</svelte:head>

<div class="m-auto max-w-2xl px-6 pt-6">
	<div class="mb-6 flex flex-row gap-2">
		<input
			type="text"
			class="input flex-1"
			bind:value={states.inputText}
			oninput={() => (states.color = parseColor(states.inputTrimmed))}
			aria-invalid={states.inputError}
			placeholder="Color string"
		/>
		<div class="w-20">
			<ColorPicker />
		</div>
	</div>

	<Color showPicker={false} />
</div>
