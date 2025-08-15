<script lang="ts">
	import { browser } from '$app/environment';
	import { unshiftHistory } from '$lib/history';

	import JsonEditor from './JsonEditor.svelte';

	const historyKey = 'history-json';
	const whitespaceRegex = /^\s*$/;

	let jsonStr = $state('');
	if (browser) {
		const jsonInput = sessionStorage.getItem('json-input');
		if (jsonInput) {
			jsonStr = jsonInput;
			unshiftHistory(jsonInput, historyKey);
			sessionStorage.removeItem('json-input');
		}
	}

	let jsonObj = $derived.by(() => {
		if (whitespaceRegex.test(jsonStr)) {
			return undefined;
		}

		try {
			return JSON.parse(jsonStr);
		} catch {
			return null;
		}
	});
</script>

<div class="json-wrapper grid h-[calc(100vh-4rem)] grid-cols-1 gap-4 md:grid-cols-2">
	<JsonEditor bind:jsonStr>
		{#snippet header()}
			<span class="text-lg font-semibold">Source</span>
		{/snippet}
	</JsonEditor>

	<JsonEditor {jsonObj}>
		{#snippet header()}
			<span class="text-lg font-semibold">Formatted</span>
		{/snippet}
	</JsonEditor>
</div>

<style>
	.json-wrapper :global(.cm-editor) {
		position: absolute !important;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}
</style>
