<script lang="ts">
	import Color from './Color.svelte';
	import { states } from './state.svelte';
	import ColorPicker from './ColorPicker.svelte';
	import { parseColor } from './color';
</script>

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
