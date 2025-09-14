<script lang="ts">
	import { dev } from '$app/environment';

	import { unshiftHistory } from '$lib/history';
	import ShuffleIcon from '@lucide/svelte/icons/shuffle';
	import HistoryButton from '$lib/components/HistoryButton.svelte';
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
			if (pastedText.length === globalStates.inputText.length) {
				unshiftHistory(globalStates.trimmedInputText);
			}
		}, 0);
	}

	let PreviewComponent = $derived(globalStates.preview?.component);
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
			bind:value={globalStates.inputText}
			onpaste={onPaste}
			placeholder="Paste json/timestamp/color etc here to get quick preview"
			class="textarea h-32"
		></textarea>
		<div class="preview-wrapper mt-4">
			{#if PreviewComponent}
				<PreviewComponent />
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
