<script lang="ts">
	import HistoryIcon from '$lib/icons/History.svelte';
	import { clickOutsideDropdown } from '$lib/attachments/clickOutside';
	import { getHistory } from '$lib/history';

	let { historySelected, key }: { historySelected: (his: string) => void; key?: string } = $props();

	let detailsElement: HTMLDetailsElement;
	let history = $state<string[]>([]);

	function handleHistoryClick(his: string) {
		historySelected(his);
		if (detailsElement) {
			detailsElement.removeAttribute('open');
		}
	}

	function handleToggle(event: Event) {
		if (detailsElement.open) {
			history = getHistory(key);
		}
	}
</script>

<div class="tooltip" data-tip="History">
	<details
		class="dropdown"
		bind:this={detailsElement}
		ontoggle={handleToggle}
		{@attach clickOutsideDropdown}
	>
		<summary class="btn btn-ghost btn-sm btn-square">
			<HistoryIcon class="size-[1.2em]" />
		</summary>
		<ul class="dropdown-content bg-base-100 rounded-box right-0 z-1 w-52 p-2 text-xs shadow-sm">
			{#if history.length > 0}
				{#each history as his}
					<li>
						<button
							class="hover:bg-base-content/10 w-full rounded-sm px-3 py-1.5 text-start outline-hidden"
							onclick={() => handleHistoryClick(his)}
						>
							<span class="line-clamp-2 break-all">{his.slice(0, 100)}</span>
						</button>
					</li>
				{/each}
			{:else}
				<li>
					<span class="text-base-content/50 text-sm">No history</span>
				</li>
			{/if}
		</ul>
	</details>
</div>
