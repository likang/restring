<script lang="ts">
	import { dev } from '$app/environment';

	import { beforeLinkOpen } from '$lib/attachments/beforeLinkOpen';
	import { unshiftHistory } from '$lib/history';
	import ShuffleIcon from '$lib/icons/Shuffle.svelte';
	import HistoryButton from '$lib/components/HistoryButton.svelte';
	import JsonEditor from './json/JsonEditor.svelte';

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

	let inputText = $state('');
	let trimmedInputText = $derived(inputText.trim());

	let preview = $derived.by(() => {
		if (trimmedInputText.length === 0) return null;
		// guessUrl should be before guessDate, because http://example.com/?a=1 can be parsed as a Date by new Date()
		for (const parser of [guessJSON, guessUrl, guessDate, guessColor, guessBase64, guessJwt]) {
			let result = parser(trimmedInputText);
			if (result) {
				return result;
			}
		}
		return null;
	});

	function historySelected(his: string) {
		inputText = his;
		unshiftHistory(his);
	}

	function onPaste(event: ClipboardEvent) {
		const pastedText = event.clipboardData?.getData('text') ?? '';
		setTimeout(() => {
			if (pastedText.length === inputText.length) {
				unshiftHistory(trimmedInputText);
			}
		}, 0);
	}

	function saveState(element: Element) {
		sessionStorage.setItem('json-input', inputText);
	}
</script>

<div class="m-auto max-w-2xl">
	<div class="h-full px-6">
		<div>
			<div class="flex justify-end p-2">
				{#if dev}
					<div class="tooltip" data-tip="Random Input">
						<button class="btn btn-ghost btn-sm btn-square">
							<ShuffleIcon class="size-[1.2em]" />
						</button>
					</div>
				{/if}
				<HistoryButton {historySelected} />
			</div>
			<textarea
				bind:value={inputText}
				onpaste={onPaste}
				class="mb-3 block h-32 w-full resize-none rounded-lg border-none bg-white/10 px-3 py-1.5 text-sm/6 text-white placeholder:text-center placeholder:leading-28 focus:outline-2 focus:-outline-offset-2 focus:outline-white/25"
				placeholder="Paste json/timestamp/color etc here to get quick preview"
			></textarea>
			<div class="preview-wrapper">
				{#if preview?.type === 'text'}
					<TextPreview value={preview.value} />
				{:else if preview?.type === 'description'}
					<DescriptionPreview value={preview.value} />
				{:else if preview?.type === 'json'}
					<JsonEditor jsonObj={preview.value}>
						{#snippet header()}
							<span class="text-lg font-semibold">JSON</span>
							<a
								href="/json"
								class="link link-primary link-hover text-sm"
								{@attach beforeLinkOpen(saveState)}
							>
								Advanced mode
							</a>
						{/snippet}
					</JsonEditor>
				{:else if trimmedInputText.length !== 0 && preview === null}
					<UnknownPreview />
				{/if}
			</div>
		</div>

		<div class="mt-6">
			<Tools />
		</div>
	</div>
</div>

<style>
	.preview-wrapper :global(.cm-editor) {
		@reference "tailwindcss";
		@apply max-h-[calc(100vh-36rem)] min-h-32 overflow-auto;
	}
</style>
