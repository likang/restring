<script lang="ts">
	import { globalStates } from '../state.svelte';
	import { untrack } from 'svelte';
	import ExternalLinkIcon from '@lucide/svelte/icons/external-link';
	import { states } from './state.svelte';
	import CopyButton from '$lib/components/CopyButton.svelte';
	import PreviewTextCard from '$lib/components/PreviewTextCard.svelte';
	import base64Tool from './base64';
	import { previewValueOfTool } from '$lib/types';
	import DownloadImageButton from './DownloadImageButton.svelte';

	$effect(() => {
		const value = previewValueOfTool(globalStates.preview, base64Tool);
		if (value) {
			untrack(() => {
				states.type = value.type;
				if (value.type === 'text') {
					states.txt = value.result;
					states.encoded = globalStates.trimmedInput;
					states.txtError = false;
					states.encodedError = false;
				} else if (value.type === 'image') {
					states.imageSrc = value.result;
					states.imageEncoded = value.result;
					states.imageEncodedError = false;
				}
			});
		}
	});
</script>

<div class="mb-6">
	<div class="flex items-center py-1">
		<a href={base64Tool.path} class="btn-link px-0 text-sm">
			<h2 class="text-sm font-medium">Base64 Encoding</h2>
			<ExternalLinkIcon class="size-4" />
		</a>
		<div class="flex-1"></div>
		{#if states.type === 'text'}
			<CopyButton text={() => states.txt} />
		{:else if states.type === 'image'}
			<DownloadImageButton />
		{/if}
	</div>
	{#if states.type === 'text'}
		<PreviewTextCard text={states.txt} />
	{:else if states.type === 'image'}
		<div class="flex h-64 items-center justify-center rounded-md border">
			<img src={states.imageSrc} alt="Base64 Preview" class="max-h-full max-w-full" />
		</div>
	{/if}
</div>
