<script lang="ts">
	import type { Snippet } from 'svelte';

	let { text, children }: { text?: string; children?: Snippet } = $props();
</script>

<div class="bg-muted min-h-32 rounded-md p-3 font-mono wrap-break-word md:text-sm">
	{#if text}
		{text}
	{:else}
		{@render children?.()}
	{/if}
</div>
