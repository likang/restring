<script lang="ts">
	import { globalStates } from '../state.svelte';
	import { untrack } from 'svelte';
	import ExternalLinkIcon from '@lucide/svelte/icons/external-link';
	import { states } from './state.svelte';
	import CopyButton from '$lib/components/CopyButton.svelte';
	import PreviewTextCard from '$lib/components/PreviewTextCard.svelte';
	import base64Tool from './base64';

	$effect(() => {
		if (globalStates.preview?.name === base64Tool.name) {
			untrack(() => {
				states.txt = globalStates.preview!.value;
				states.encoded = globalStates.trimmedInput;
				states.txtError = false;
				states.encodedError = false;
			});
		}
	});
</script>

<div class="mb-6">
	<div class="flex items-center py-1">
		<a href="/base64" class="btn-link px-0 text-sm">
			<span class="text-lg font-semibold">Base64</span>
			<ExternalLinkIcon class="size-4" />
		</a>
		<div class="flex-1"></div>
		<CopyButton text={() => states.txt} />
	</div>
	<PreviewTextCard text={states.txt} />
</div>
