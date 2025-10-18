<script lang="ts">
	import { unshiftHistory } from '$lib/history';
	import HistoryButton from '$lib/components/HistoryButton.svelte';
	import PreviewTextCard from '$lib/components/PreviewTextCard.svelte';
	import Tools from './Tools.svelte';
	import { globalStates } from './state.svelte';

	globalStates.reset();

	function historySelected(his: string) {
		globalStates.inputText = his;
		unshiftHistory(his);
	}

	function onPaste(event: ClipboardEvent) {
		const pastedText = event.clipboardData?.getData('text') ?? '';
		setTimeout(() => {
			if (
				pastedText.length === globalStates.inputText.length &&
				globalStates.preview !== undefined &&
				globalStates.preview.name !== 'unknown'
			) {
				unshiftHistory(globalStates.trimmedInputText);
			}
		}, 0);
	}

	let PreviewComponent = $derived(globalStates.preview?.component);
</script>

<div class="m-auto max-w-2xl px-6">
	<div class="mt-6">
		<div class="flex items-center py-1">
			<h3 class="text-lg font-semibold">Quick Preview</h3>
			<div class="flex-1"></div>
			<HistoryButton {historySelected} />
		</div>
		<textarea
			bind:value={globalStates.inputText}
			onpaste={onPaste}
			spellcheck="false"
			placeholder="Try json, timestamp, color, base64, jwt, or url-encoded text"
			class="textarea h-32 font-mono"
		></textarea>
		<div class="preview-wrapper mt-4">
			{#if PreviewComponent}
				<PreviewComponent />
			{:else if globalStates.trimmedInputText.length > 0}
				<PreviewTextCard>
					<p class="text-muted-foreground flex min-h-30 items-center justify-center">
						No preview is available.
					</p>
				</PreviewTextCard>
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
