<script lang="ts">
	import CopyButton from '$lib/components/CopyButton.svelte';
	import RefreshCcwIcon from '@lucide/svelte/icons/refresh-ccw';
	import DownIcon from '@lucide/svelte/icons/chevron-down';

	import { v4 as uuidv4 } from 'uuid';
	import { v7 as uuidv7 } from 'uuid';

	let version = $state('v4');

	let ids = $derived(generate());

	function generate() {
		let ids = [];
		if (version === 'v4') {
			for (let i = 0; i < 10; i++) {
				ids.push(uuidv4());
			}
		} else {
			for (let i = 0; i < 10; i++) {
				ids.push(uuidv7());
			}
		}
		return ids;
	}

	function onGenerate() {
		ids = generate();
	}

	const vPopoverId = 'uuid-v-popover';
</script>

<svelte:head>
	<title>restring - UUID Generator</title>
	<meta name="description" content="Generate UUIDs online." />
	<meta
		name="keywords"
		content="UUID generator, UUID online, UUID tool, UUID online tool, UUID generator online, UUID tool online"
	/>
</svelte:head>

{#snippet itemRow(value: string)}
	<div
		class="group hover:bg-muted/50 relative flex min-h-9 items-center justify-between gap-2 rounded-md px-1 py-2 md:px-2"
	>
		<p class="font-mono text-xs md:text-sm">{value}</p>
		<CopyButton
			text={value}
			class="text-muted-foreground hover:text-accent-foreground size-6 rounded-sm group-hover:visible md:invisible "
		/>
	</div>
{/snippet}

<div class="m-auto max-w-2xl px-6 pt-6">
	<div class="mb-6 flex flex-row items-center gap-2">
		<span class="text-lg font-semibold">UUID Generator</span>

		<div class="flex-1"></div>

		<div id={vPopoverId} class="dropdown-menu">
			<button
				type="button"
				id={vPopoverId + '-trigger'}
				aria-haspopup="menu"
				aria-controls={vPopoverId + '-menu'}
				aria-expanded="false"
				class="btn-ghost"
			>
				{version}
				<DownIcon />
			</button>
			<div
				id={vPopoverId + '-popover'}
				data-popover
				data-align="end"
				aria-hidden="true"
				class="min-w-16"
			>
				<div role="menu" id={vPopoverId + '-menu'} aria-labelledby={vPopoverId + '-trigger'}>
					{#each ['v4', 'v7'] as v}
						{#if v !== version}
							<button role="menuitem" onclick={() => (version = v)}>{v}</button>
						{/if}
					{/each}
				</div>
			</div>
		</div>

		<button class="btn-icon-ghost" onclick={onGenerate}><RefreshCcwIcon /> </button>
	</div>

	<div class="grid grid-cols-1 items-center gap-2">
		{#each ids as id}
			{@render itemRow(id)}
		{/each}
	</div>
</div>
