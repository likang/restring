<script lang="ts">
	import Datetime from './Datetime.svelte';
	import { states } from './state.svelte';
	import { parseDate } from './datetime';

	function onInput(event: Event) {
		states.date = parseDate(states.inputText);
	}
</script>

<div class="m-auto max-w-2xl px-6 pt-6">
	<input
		type="text"
		class="input mb-6"
		bind:value={states.inputText}
		oninput={onInput}
		aria-invalid={states.inputError}
	/>
	<Datetime />
</div>
