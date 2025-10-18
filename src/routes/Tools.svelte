<script lang="ts">
	import { allTools } from '$lib/tools';

	let search = $state('');
	let tools = $derived(
		search.length === 0
			? allTools
			: allTools.filter((tool) => tool.name.toLowerCase().includes(search.toLowerCase()))
	);
</script>

<div class="mb-3">
	<h3 class="text-lg font-semibold">Tools</h3>
</div>

<ul class="mb-6 grid grid-flow-row grid-cols-1 gap-2 sm:grid-cols-3">
	{#each tools as tool (tool.name)}
		<li class="list-none">
			<a
				href={tool.path}
				class="text-muted-foreground btn-icon-ghost w-full justify-start gap-2 px-2 font-normal"
			>
				<tool.icon class="size-4" />
				{tool.name}
			</a>
		</li>
	{/each}
</ul>
