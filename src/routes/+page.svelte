<script lang="ts">
	import { dev } from '$app/environment';

	import ShuffleIcon from '$lib/icons/Shuffle.svelte';
	import JsonPreview from '$lib/components/JsonPreview.svelte';

	import HistoryButton from './HistoryButton.svelte';
	import TextPreview from './TextPreview.svelte';
	import DescriptionPreview from './DescriptionPreview.svelte';
	import UnknownPreview from './UnknownPreview.svelte';
	import Tools from './Tools.svelte';

	import { guessJSON } from './json/json';
	import { guessUrl } from './url/url';
	import { guessDate } from './datetime/datetime';
	import { guessColor } from './color/color';
	import { guessBase64 } from './base64/base64';
	import { guessJwt } from './jwt/jwt';

	import type { DescriptionItem } from '$lib/types';
	import { unshiftHistory } from '$lib/history';

	let inputText = $state('');
	let trimmedInputText = $derived(inputText.trim());

	let previewType = $state<string | null>(null);
	let previewTextValue = $state<string | null>(null);
	let previewJsonValue = $state<string | null>(null);
	let previewDescriptionValue = $state<DescriptionItem[] | null>(null);

	$effect(() => {
		if (trimmedInputText.length === 0) return;

		previewType = 'unknown';
		// guessUrl should be before guessDate, because http://example.com/?a=1 can be parsed as a Date by new Date()
		for (const parser of [guessJSON, guessUrl, guessDate, guessColor, guessBase64, guessJwt]) {
			let result = parser(trimmedInputText);
			if (result) {
				previewType = result.type;
				if (result.type === 'text') {
					previewTextValue = result.value;
				} else if (result.type === 'json') {
					previewJsonValue = result.value;
				} else if (result.type === 'description') {
					previewDescriptionValue = result.value;
				}
				break;
			}
		}
	});

	function historySelected(his: string) {
		inputText = his;
		unshiftHistory(his);
	}

	function onPaste(event: Event) {
		setTimeout(() => {
			unshiftHistory(trimmedInputText);
		}, 0);
	}
</script>

<div class="m-auto max-w-2xl">
	<div class="h-full p-6">
		<div>
			<div class="flex justify-end">
				{#if dev}
					<div class="tooltip" data-tip="Random Input">
						<button class="btn btn-ghost btn-sm btn-square m-1">
							<ShuffleIcon class="size-[1.2em]" />
						</button>
					</div>
				{/if}
				<HistoryButton {historySelected} />
			</div>
			<textarea
				bind:value={inputText}
				onpaste={onPaste}
				class="mt-3 mb-6 block h-32 w-full resize-none rounded-lg border-none bg-white/10 px-3 py-1.5 text-sm/6 text-white placeholder:text-center placeholder:leading-28 focus:outline-2 focus:-outline-offset-2 focus:outline-white/25"
				placeholder="Paste json/timestamp/color etc here to get quick preview"
			></textarea>
			<div>
				{#if previewTextValue !== null}
					<TextPreview value={previewTextValue} show={previewType === 'text'} />
				{/if}
				{#if previewDescriptionValue !== null}
					<DescriptionPreview
						value={previewDescriptionValue}
						show={previewType === 'description'}
					/>
				{/if}
				{#if previewJsonValue !== null}
					<JsonPreview value={previewJsonValue} show={previewType === 'json'} />
				{/if}
				{#if previewType !== null}
					<UnknownPreview show={inputText.length !== 0 && previewType === 'unknown'} />
				{/if}
			</div>
		</div>

		<div class="mt-32">
			<Tools />
		</div>
	</div>
</div>
