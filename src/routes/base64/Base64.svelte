<script lang="ts">
	import { states } from './state.svelte';
	import CopyButton from '$lib/components/CopyButton.svelte';
	import ImageIcon from '@lucide/svelte/icons/image';
	import { base64Encode, base64Decode, isImageBase64 } from '$lib/base64';
	import DownloadImageButton from './DownloadImageButton.svelte';

	function onTxtInput(event: Event) {
		const txt = (event.target as HTMLTextAreaElement).value;
		states.encoded = base64Encode(txt);
		states.encodedError = false;
	}

	function onTxtEncodedInput(event: Event) {
		const encoded = (event.target as HTMLTextAreaElement).value;
		const txt = base64Decode(encoded);
		if (txt === undefined) {
			if (isImageBase64(encoded)) {
				states.encoded = '';
				states.encodedError = false;
				states.type = 'image';
				states.imageSrc = encoded;
				states.imageEncoded = encoded;
				states.imageEncodedError = false;
				return;
			}
			states.encodedError = true;
			return;
		}
		states.encodedError = false;
		states.txt = txt;
		states.txtError = false;
	}

	function onImageInput(event: Event) {
		console.log('onImageInput');
		const file = (event.target as HTMLInputElement).files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = () => {
				states.imageSrc = reader.result as string;
				states.imageEncoded = states.imageSrc;
				states.imageEncodedError = false;
			};
			reader.onerror = () => {
				alert('Failed to read image');
			};
			reader.readAsDataURL(file);
		}
	}

	function onImageEncodedInput(event: Event) {
		const encoded = (event.target as HTMLTextAreaElement).value;
		if (encoded.length === 0) {
			states.imageEncodedError = false;
			return;
		}

		const valid = isImageBase64(encoded);
		if (valid) {
			states.imageSrc = encoded;
			states.imageEncodedError = false;
		} else {
			const txt = base64Decode(encoded);
			if (txt === undefined) {
				states.imageSrc = undefined;
				states.imageEncodedError = true;
			} else {
				states.imageEncoded = '';
				states.imageEncodedError = false;
				states.type = 'text';
				states.txt = txt;
				states.txtError = false;
			}
		}
	}
</script>

<div class="mb-6">
	<div class="flex items-center py-1">
		<div class="tabs">
			<!-- svelte-ignore a11y_no_noninteractive_element_to_interactive_role -->
			<nav role="tablist" aria-orientation="horizontal">
				<button
					type="button"
					role="tab"
					aria-selected={states.type === 'text'}
					tabindex="0"
					onclick={() => (states.type = 'text')}
				>
					Text
				</button>

				<button
					type="button"
					role="tab"
					aria-selected={states.type === 'image'}
					onclick={() => (states.type = 'image')}
					tabindex="0"
				>
					Image
				</button>
			</nav>
		</div>
		<div class="flex-1"></div>
		{#if states.type === 'text'}
			<CopyButton text={() => states.txt} />
		{:else if states.type === 'image'}
			<label class="btn-icon-ghost" for="base64-image-input">
				<ImageIcon />
			</label>
			<input
				id="base64-image-input"
				type="file"
				accept="image/*"
				onchange={onImageInput}
				class="hidden"
			/>
			<DownloadImageButton />
		{/if}
	</div>
	{#if states.type === 'text'}
		<textarea
			bind:value={states.txt}
			name="base64-text"
			aria-invalid={states.txtError}
			oninput={onTxtInput}
			placeholder=""
			class="textarea h-32"
		></textarea>
	{:else if states.type === 'image'}
		<div
			class="flex items-center justify-center rounded-md border"
			class:h-64={states.imageSrc}
			class:h-32={!states.imageSrc}
		>
			{#if states.imageEncoded.length === 0}
				<p class="text-muted-foreground flex items-center justify-center text-sm">
					Select an image file or paste a Base64-encoded image string below
				</p>
			{:else if states.imageSrc}
				<img src={states.imageSrc} alt="Base64 Preview" class="max-h-full max-w-full" />
			{/if}
		</div>
	{/if}

	<div class="flex items-center py-1">
		<h2 class="text-sm font-medium">Base64 Encoded</h2>
		<div class="flex-1"></div>
		<CopyButton text={() => (states.type === 'text' ? states.encoded : states.imageEncoded)} />
	</div>
	{#if states.type === 'text'}
		<textarea
			bind:value={states.encoded}
			name="base64-encoded"
			aria-invalid={states.encodedError}
			oninput={onTxtEncodedInput}
			placeholder=""
			class="textarea h-32"
		></textarea>
	{:else if states.type === 'image'}
		<textarea
			bind:value={states.imageEncoded}
			name="base64-image-encoded"
			aria-invalid={states.imageEncodedError}
			oninput={onImageEncodedInput}
			placeholder=""
			class="textarea h-32"
		></textarea>
	{/if}
</div>
