<script lang="ts">
	import { dev } from '$app/environment';

	import { beforeLinkOpen } from '$lib/attachments/beforeLinkOpen';
	import { unshiftHistory } from '$lib/history';
	import ShuffleIcon from '@lucide/svelte/icons/shuffle';
	import HistoryButton from '$lib/components/HistoryButton.svelte';
	import JsonEditor from './json/JsonEditor.svelte';

	import { Textarea } from '$lib/components/ui/textarea/index';
	import { Button } from '$lib/components/ui/button/index';

	import TextPreview from './TextPreview.svelte';
	import DescriptionPreview from './DescriptionPreview.svelte';
	import UnknownPreview from './UnknownPreview.svelte';
	import Tools from './Tools.svelte';
	import * as Tooltip from '$lib/components/ui/tooltip/index';
	import { buttonVariants } from '$lib/components/ui/button/index';

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
			<div class="flex items-center justify-end py-1">
				{#if dev}
					<Button variant="ghost" size="icon">
						<ShuffleIcon />
					</Button>
				{/if}
				<HistoryButton {historySelected} />
			</div>
			<Textarea
				bind:value={inputText}
				onpaste={onPaste}
				placeholder="Paste json/timestamp/color etc here to get quick preview"
				class="h-32"
			></Textarea>
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
