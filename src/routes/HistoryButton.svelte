<script lang="ts">
	import HistoryIcon from '$lib/icons/History.svelte';
	import { history } from './history.svelte';
	import { clickOutsideDropdown } from '$lib/attachments/clickOutside';

	let { historySelected }: { historySelected: (his: string) => void } = $props();

	let detailsElement: HTMLDetailsElement;

	function handleHistoryClick(his: string) {
		historySelected(his);
		if (detailsElement) {
			detailsElement.removeAttribute('open');
		}
	}
</script>

<div class="tooltip" data-tip="History">
	<details class="dropdown" bind:this={detailsElement} {@attach clickOutsideDropdown}>
		<summary class="btn btn-ghost btn-sm btn-square m-1">
			<HistoryIcon class="size-[1.2em]" />
		</summary>
		<ul class="dropdown-content bg-base-100 rounded-box right-0 z-1 w-52 p-2 text-xs shadow-sm">
			{#each history as his (his)}
				<li>
					<button
						class="hover:bg-base-content/10 w-full cursor-pointer rounded-sm px-3 py-1.5 text-start outline-hidden"
						onclick={() => handleHistoryClick(his)}
					>
						<span class="line-clamp-2 break-all">{his}</span>
					</button>
				</li>
			{/each}
		</ul>
	</details>
</div>
