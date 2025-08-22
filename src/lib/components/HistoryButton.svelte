<script lang="ts">
	import HistoryIcon from '@lucide/svelte/icons/history';
	import { getHistory } from '$lib/history';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index';
	import { Button } from '$lib/components/ui/button/index';

	let { historySelected, key }: { historySelected: (his: string) => void; key?: string } = $props();

	let history = $state<string[]>([]);

	function handleHistoryClick(his: string) {
		historySelected(his);
	}

	function onOpenChange(open: boolean) {
		if (open) {
			history = getHistory(key);
		}
	}
</script>

<DropdownMenu.Root {onOpenChange}>
	<DropdownMenu.Trigger>
		{#snippet child({ props })}
			<Button {...props} variant="ghost" size="icon">
				<HistoryIcon />
			</Button>
		{/snippet}
	</DropdownMenu.Trigger>
	<DropdownMenu.Content class="w-56" align="end">
		{#if history.length > 0}
			{#each history as his}
				<DropdownMenu.Item onclick={() => handleHistoryClick(his)}>
					<span class="line-clamp-2 break-all">{his.slice(0, 100)}</span>
				</DropdownMenu.Item>
			{/each}
		{:else}
			<DropdownMenu.Label>No history</DropdownMenu.Label>
		{/if}
	</DropdownMenu.Content>
</DropdownMenu.Root>
