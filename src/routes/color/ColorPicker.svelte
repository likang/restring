<script lang="ts">
	import { colord } from 'colord';
	import { states } from './state.svelte';

	function onInput(event: Event) {
		const value = (event.target as HTMLInputElement).value;
		const color = colord(value);
		states.color = color.isValid() ? color : undefined;
	}

	$effect(() => {
		states.pickerColor = states.color?.toHex().substring(0, 7) ?? '#ffffff';
	});
</script>

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
		oninput={onInput}
	/>
</div>
