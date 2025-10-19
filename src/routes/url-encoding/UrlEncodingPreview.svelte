<script lang="ts">
	import { globalStates } from '../state.svelte';
	import { untrack } from 'svelte';
	import ExternalLinkIcon from '@lucide/svelte/icons/external-link';
	import { states } from './state.svelte';
	import CopyButton from '$lib/components/CopyButton.svelte';
	import PreviewTextCard from '$lib/components/PreviewTextCard.svelte';
	import type { UrlEncodingPreviewResult } from './url-encoding';
	import { tool } from './url-encoding';

	$effect(() => {
		if (globalStates.preview?.name === tool.name) {
			untrack(() => {
				const value: UrlEncodingPreviewResult = globalStates.preview!.value;

				states.type = 'uri';
				if (value.type === 'encoded') {
					states.encoded = value.content;
					states.from = 'txt';
					states.txt = globalStates.trimmedInput;
				} else if (value.type === 'txt') {
					states.txt = value.content;
					states.from = 'encoded';
					states.encoded = globalStates.trimmedInput;
				} else {
					return;
				}
				states.txtError = false;
				states.encodedError = false;
			});
		}
	});
</script>

<div class="mb-6">
	<div class="flex items-center py-1">
		<a href="/url-encoding" class="btn-link px-0 text-sm">
			<span class="text-lg font-semibold">URL Encoding</span>
			<ExternalLinkIcon class="size-4" />
		</a>
		<div class="flex-1"></div>
		<CopyButton text={() => states.txt} />
	</div>
	<PreviewTextCard text={states.from === 'txt' ? states.encoded : states.txt} />
</div>
