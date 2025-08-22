<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';

	import { allTools } from '$lib/tools';

	let search = $state('');
	let tools = $derived(
		search.length === 0
			? allTools
			: allTools.filter((tool) => tool.title.toLowerCase().includes(search.toLowerCase()))
	);
</script>

<div class="mb-6 flex items-center gap-2">
	<h3>Advanced Tools</h3>
</div>

<ul class="mb-6 grid grid-flow-row grid-cols-1 gap-2 sm:grid-cols-3">
	{#each tools as tool (tool.title)}
		<li class="list-none">
			<Button
				href={tool.href}
				variant="ghost"
				class="text-muted-foreground w-full justify-start font-normal"
			>
				<tool.icon class="size-4" />
				<span class="ps-2">{tool.title}</span>
			</Button>
		</li>
	{/each}
</ul>
