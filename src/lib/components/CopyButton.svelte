<script lang="ts">
	import CopyIcon from '@lucide/svelte/icons/copy';
	import DoneIcon from '@lucide/svelte/icons/check-check';
	import { onDestroy } from 'svelte';

	let {
		text,
		class: className = 'btn-icon-ghost',
		tooltip
	}: { text: string; class?: string; tooltip?: string } = $props();

	let isCopied = $state(false);
	let timeoutId: number | undefined;

	function handleClick() {
		navigator.clipboard.writeText(text);

		isCopied = true;

		// Clear existing timeout
		if (timeoutId) {
			clearTimeout(timeoutId);
		}

		// Set timeout to revert back
		timeoutId = setTimeout(() => {
			isCopied = false;
		}, 2000);
	}

	onDestroy(() => {
		if (timeoutId) {
			clearTimeout(timeoutId);
			timeoutId = undefined;
		}
	});
</script>

<button onclick={handleClick} class={className} data-tooltip={tooltip}>
	{#if isCopied}
		<DoneIcon />
	{:else}
		<CopyIcon />
	{/if}
</button>
