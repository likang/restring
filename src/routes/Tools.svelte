<script lang="ts">
	import { allTools } from '$lib/tools';

	let search = $state('');
	let tools = $derived(
		search.length === 0
			? allTools
			: allTools.filter((tool) => tool.title.toLowerCase().includes(search.toLowerCase()))
	);
</script>

<div class="mb-6">
	<h3 class="px-3 text-lg font-semibold">Advanced Tools</h3>
</div>

<ul class="mb-6 grid grid-flow-row grid-cols-1 gap-2 sm:grid-cols-3">
	{#each tools as tool (tool.title)}
		<li class="list-none">
			<a
				href={tool.href}
				class="text-muted-foreground btn-icon-ghost w-full justify-start gap-2 px-2 font-normal"
			>
				<tool.icon class="size-4" />
				{tool.title}
			</a>
		</li>
	{/each}
</ul>
