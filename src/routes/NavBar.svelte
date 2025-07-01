<script lang="ts">
	import DownIcon from '$lib/icons/Down.svelte';
	import GithubIcon from '$lib/icons/Github.svelte';
	import { clickOutsideDropdown } from '$lib/attachments/clickOutside';
	import { page } from '$app/state';
	import { allTools } from '$lib/tools';
	import LightingIcon from '$lib/icons/Lighting.svelte';

	let currentTool = $derived(allTools.find((tool) => tool.href === page.url.pathname));
	let otherTools = $derived(allTools.filter((tool) => tool.href !== page.url.pathname));
</script>

<div class="navbar shadow-sm">
	<div class="flex flex-1 items-center">
		<a class="text-2xl font-bold" href="/"><span class="text-primary">re</span>string</a>

		{#if currentTool}
			<details class="dropdown ml-4" {@attach clickOutsideDropdown}>
				<summary class="btn h-8">
					<currentTool.icon class="size-[1.2em]" />
					{currentTool.title}
					<DownIcon class="size-[1.2em]" />
				</summary>
				<ul class="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
					<li>
						<a href="/">
							<LightingIcon class="size-[1.2em]" />
							Auto
						</a>
					</li>
					{#each otherTools as tool (tool.title)}
						<li>
							<a href={tool.href}>
								<tool.icon class="size-[1.2em]" />
								{tool.title}
							</a>
						</li>
					{/each}
				</ul>
			</details>
		{/if}
	</div>
	<div>
		<a href="https://github.com/likang/restring" class="btn btn-ghost btn-square" target="_blank">
			<GithubIcon class="size-[1.2em]" />
		</a>
	</div>
</div>
