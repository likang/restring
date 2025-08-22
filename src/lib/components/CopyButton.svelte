<script lang="ts">
	import CopyIcon from '@lucide/svelte/icons/copy';
	import DoneIcon from '@lucide/svelte/icons/check-check';
	import { onDestroy } from 'svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import type { ButtonProps } from '$lib/components/ui/button/button.svelte';

	let {
		iconClass,
		text,
		...restProps
	}: {
		iconClass?: string;
		text: string;
		variant?: ButtonProps['variant'];
		size?: ButtonProps['size'];
		class?: string;
		restProps?: ButtonProps;
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

<Button onclick={handleClick} {...restProps}>
	{#if isCopied}
		<DoneIcon class={iconClass} />
	{:else}
		<CopyIcon class={iconClass} />
	{/if}
</Button>
