<script lang="ts">
	import { states } from './state.svelte';
	import CopyButton from '$lib/components/CopyButton.svelte';
	import { base64Encode, base64Decode } from '$lib/base64';

	function onTxtInput(event: Event) {
		const txt = (event.target as HTMLTextAreaElement).value;
		states.encoded = base64Encode(txt);
		states.encodedError = false;
	}

	function onEncodedInput(event: Event) {
		const encoded = (event.target as HTMLTextAreaElement).value;
		const txt = base64Decode(encoded);
		if (txt === undefined) {
			states.encodedError = true;
			return;
		}
		states.encodedError = false;
		states.txt = txt;
		states.txtError = false;
	}
</script>

<div class="mb-6">
	<div class="flex items-center py-1">
		<span class="text-lg font-semibold">Text</span>
		<div class="flex-1"></div>
		<CopyButton text={() => states.txt} />
	</div>
	<textarea
		bind:value={states.txt}
		aria-invalid={states.txtError}
		oninput={onTxtInput}
		placeholder=""
		class="textarea h-32"
	></textarea>

	<div class="flex items-center py-1">
		<span class="text-lg font-semibold">Base64 Encoded</span>
		<div class="flex-1"></div>
		<CopyButton text={() => states.encoded} />
	</div>
	<textarea
		bind:value={states.encoded}
		aria-invalid={states.encodedError}
		oninput={onEncodedInput}
		placeholder=""
		class="textarea h-32"
	></textarea>
</div>
