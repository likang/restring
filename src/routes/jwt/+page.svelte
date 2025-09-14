<script lang="ts">
	import { states } from './state.svelte';
	import { parseJwt } from './jwt';
	import Jwt from './Jwt.svelte';

	function onInput(event: Event) {
		states.value = parseJwt(states.inputText);
	}
</script>

<div class="m-auto max-w-2xl px-6 pt-6">
	<textarea
		class="textarea mb-6 h-32"
		bind:value={states.inputText}
		placeholder="JSON Web Token (JWT)"
		oninput={onInput}
		aria-invalid={states.inputError}
	></textarea>
	{#if states.value}
		<Jwt />
	{/if}
</div>
