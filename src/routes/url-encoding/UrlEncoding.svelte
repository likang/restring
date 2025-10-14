<script lang="ts">
	import { states } from './state.svelte';
	import CopyButton from '$lib/components/CopyButton.svelte';

	let txtInput: HTMLTextAreaElement;
	let encodedInput: HTMLTextAreaElement;

	function onTxtInput(event: Event) {
		const txt = (event.target as HTMLTextAreaElement).value;
		states.from = 'txt';
		let encoded: string | undefined;
		try {
			if (states.type === 'uri') {
				encoded = encodeURI(txt);
			} else {
				encoded = encodeURIComponent(txt);
			}
		} catch {
			encoded = undefined;
		}
		if (encoded === undefined) {
			states.txtError = true;
			return;
		}

		states.encoded = encoded;
		states.encodedError = false;
	}

	function onEncodedInput(event: Event) {
		const encoded = (event.target as HTMLTextAreaElement).value;
		states.from = 'encoded';
		let txt: string | undefined;
		try {
			if (states.type === 'uri') {
				txt = decodeURI(encoded);
			} else {
				txt = decodeURIComponent(encoded);
			}
		} catch {
			txt = undefined;
		}
		if (txt === undefined) {
			states.encodedError = true;
			return;
		}
		states.encodedError = false;
		states.txt = txt;
		states.txtError = false;
	}

	function onTypeChange() {
		const event = new Event('input', {
			bubbles: true
		});

		if (states.from === 'txt') {
			txtInput.dispatchEvent(event);
		} else {
			encodedInput.dispatchEvent(event);
		}
	}
</script>

<div class="mb-6">
	<div class="flex items-center py-1">
		<span class="text-lg font-semibold">Text</span>
		<div class="flex-1"></div>
		<CopyButton text={() => states.txt} />
	</div>
	<textarea
		bind:this={txtInput}
		bind:value={states.txt}
		aria-invalid={states.txtError}
		oninput={onTxtInput}
		placeholder=""
		class="textarea h-32"
	></textarea>

	<div class="flex items-center py-1">
		<fieldset class="flex flex-row gap-2">
			<label class="label">
				<input
					type="radio"
					name="type-group"
					value="uri"
					class="input"
					checked={states.type === 'uri'}
					bind:group={states.type}
					onchange={onTypeChange}
				/>
				<span class="text-lg">URI</span>
			</label>
			<label class="label">
				<input
					type="radio"
					name="type-group"
					value="uri-component"
					class="input"
					checked={states.type === 'uri-component'}
					bind:group={states.type}
					onchange={onTypeChange}
				/>
				<span class="text-lg">URI Component</span>
			</label>
		</fieldset>

		<div class="flex-1"></div>
		<CopyButton text={() => states.encoded} />
	</div>
	<textarea
		bind:this={encodedInput}
		bind:value={states.encoded}
		aria-invalid={states.encodedError}
		oninput={onEncodedInput}
		placeholder=""
		class="textarea h-32"
	></textarea>
</div>
