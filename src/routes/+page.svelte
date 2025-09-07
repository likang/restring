<script lang="ts">
	import { dev } from '$app/environment';

	import { beforeLinkOpen } from '$lib/attachments/beforeLinkOpen';
	import { unshiftHistory } from '$lib/history';
	import ShuffleIcon from '@lucide/svelte/icons/shuffle';
	import HistoryButton from '$lib/components/HistoryButton.svelte';
	import ExternalLinkIcon from '@lucide/svelte/icons/external-link';
	import JsonEditor from './json/JsonEditor.svelte';
	import ColorComponent from './color/Color.svelte';

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

<div class="m-auto max-w-2xl px-6">
	<div>
		<div class="flex items-center justify-end py-1">
			{#if dev}
				<button class="btn-icon-ghost" data-tooltip="Random">
					<ShuffleIcon />
				</button>
			{/if}
			<HistoryButton {historySelected} />
		</div>
		<textarea
			bind:value={inputText}
			onpaste={onPaste}
			placeholder="Paste json/timestamp/color etc here to get quick preview"
			class="textarea h-32"
		></textarea>
		<div class="preview-wrapper mt-4">
			{#if preview?.type === 'text'}
				<TextPreview value={preview.value} />
			{:else if preview?.type === 'description'}
				<DescriptionPreview value={preview.value} />
			{:else if preview?.type === 'color'}
				<ColorComponent color={preview.value} />
			{:else if preview?.type === 'json'}
				<JsonEditor jsonObj={preview.value} readonly>
					{#snippet header()}
						<a
							href="/json"
							class="btn-link text-sm"
							data-tooltip="Advanced mode"
							{@attach beforeLinkOpen(saveState)}
						>
							<span class="text-lg font-semibold">JSON</span>
							<ExternalLinkIcon class="size-4" />
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

<style>
	.preview-wrapper :global(.cm-editor) {
		@reference "tailwindcss";
		@apply max-h-[calc(100vh-36rem)] min-h-32 overflow-auto;
	}
</style>
