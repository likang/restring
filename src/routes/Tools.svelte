<script lang="ts">
	import SearchIcon from '$lib/icons/Search.svelte';

	import { allTools } from '$lib/tools';

	let search = $state('');
	let tools = $derived(
		search.length === 0
			? allTools
			: allTools.filter((tool) => tool.title.toLowerCase().includes(search.toLowerCase()))
	);
</script>

<div class="mb-6 flex items-end">
	<h3 class="flex-1">Advanced Tools</h3>
	<div>
		<label class="input input-sm">
			<SearchIcon class="h-[1em] opacity-50" />
			<input type="search" class="grow" placeholder="Search" bind:value={search} />
			<kbd class="kbd kbd-sm">⌘</kbd>
			<kbd class="kbd kbd-sm">K</kbd>
		</label>
	</div>
</div>

<ul class="grid grid-flow-row grid-cols-1 gap-2 sm:grid-cols-3">
	{#each tools as tool (tool.title)}
		<li class="list-none">
			<a
				href={tool.href}
				class="inline-flex w-full items-center rounded-xs p-2 text-white/60 transition-colors hover:bg-white/10"
			>
				<tool.icon class="size-4" />
				<span class="ps-2">{tool.title}</span>
			</a>
		</li>
	{/each}
</ul>
