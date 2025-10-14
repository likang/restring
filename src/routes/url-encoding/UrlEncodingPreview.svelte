<script lang="ts">
	import { globalStates } from '../state.svelte';
	import { untrack } from 'svelte';
	import ExternalLinkIcon from '@lucide/svelte/icons/external-link';
	import { states } from './state.svelte';
	import CopyButton from '$lib/components/CopyButton.svelte';
	import PreviewTextCard from '$lib/components/PreviewTextCard.svelte';

	$effect(() => {
		const decoded =
			globalStates.preview?.name === 'url-encoding' ? globalStates.preview.value : undefined;
		if (decoded) {
			untrack(() => {
				states.type = 'uri';
				states.from = 'encoded';
				states.txt = decoded;
				states.encoded = globalStates.trimmedInputText;
				states.txtError = false;
				states.encodedError = false;
			});
		}
	});
</script>

<div class="mb-6">
	<div class="flex items-center py-1">
		<a href="/url-encoding" class="btn-link text-sm">
			<span class="text-lg font-semibold">URL Encoding</span>
			<ExternalLinkIcon class="size-4" />
		</a>
		<div class="flex-1"></div>
		<CopyButton text={() => states.txt} />
	</div>
	<PreviewTextCard text={states.txt} />
</div>
