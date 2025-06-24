<script lang="ts">
	import CopyIcon from '$lib/icons/Copy.svelte';
	import DoneIcon from '$lib/icons/Done.svelte';
	import { onDestroy } from 'svelte';

	let {
		class: className,
		iconClass,
		text,
	}: {
		class?: string;
		iconClass?: string;
		text: string;
	} = $props();

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

<button class={className} onclick={handleClick}>
	{#if isCopied}
		<DoneIcon class={iconClass} />
	{:else}
		<CopyIcon class={iconClass} />
	{/if}
</button>
