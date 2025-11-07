<script lang="ts">
	import { globalStates } from '../state.svelte';
	import { untrack } from 'svelte';
	import ExternalLinkIcon from '@lucide/svelte/icons/external-link';
	import { states } from './state.svelte';
	import CopyButton from '$lib/components/CopyButton.svelte';
	import PreviewTextCard from '$lib/components/PreviewTextCard.svelte';
	import urlEncodingTool from './url-encoding';
	import { previewValueOfTool } from '$lib/types';

	$effect(() => {
		const value = previewValueOfTool(globalStates.preview, urlEncodingTool);
		if (value) {
			untrack(() => {
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
		<a href={urlEncodingTool.path} class="btn-link px-0 text-sm">
			<h2 class="text-lg font-semibold">URL Encoding</h2>
			<ExternalLinkIcon class="size-4" />
		</a>
		<div class="flex-1"></div>
		<CopyButton text={() => states.txt} />
	</div>
	<PreviewTextCard text={states.from === 'txt' ? states.encoded : states.txt} />
</div>
