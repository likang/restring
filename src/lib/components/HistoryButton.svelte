<script lang="ts">
	import HistoryIcon from '@lucide/svelte/icons/history';
	import { getHistory } from '$lib/history';
	import { onMount, flushSync } from 'svelte';

	let { historySelected, key }: { historySelected: (his: string) => void; key?: string } = $props();

	const id = 'popover-' + Math.random().toString(36).slice(2, 10);

	let history = $state<string[]>([]);

	let dropdownMenu: HTMLDivElement;

	function handleHistoryClick(his: string) {
		historySelected(his);
	}

	function onOpen(event: Event) {
		if ((event as CustomEvent).detail.source === dropdownMenu) {
			// js code in basecoat will check menuitems right away
			flushSync(() => {
				history = getHistory(key);
			});
		}
	}

	onMount(() => {
		document.addEventListener('basecoat:popover', onOpen);

		return () => {
			document.removeEventListener('basecoat:popover', onOpen);
		};
	});
</script>

<div {id} class="dropdown-menu" bind:this={dropdownMenu}>
	<button
		type="button"
		data-tooltip="History"
		id={id + '-trigger'}
		aria-haspopup="menu"
		aria-controls={id + '-menu'}
		aria-expanded="false"
		class="btn-icon-ghost"
	>
		<HistoryIcon />
	</button>
	<div
		id={id + '-popover'}
		data-popover
		data-side="bottom"
		data-align="end"
		aria-hidden="true"
		class="w-56"
	>
		<div role="menu" id={id + '-menu'} aria-labelledby={id + '-trigger'}>
			{#if history.length > 0}
				{#each history as his}
					<button role="menuitem" onclick={() => handleHistoryClick(his)} class="text-start">
						<span class="line-clamp-2 break-all whitespace-normal">{his.slice(0, 100)}</span>
					</button>
				{/each}
			{:else}
				<div class="text-muted-foreground p-2 text-sm">No history</div>
			{/if}
		</div>
	</div>
</div>
