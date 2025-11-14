<script lang="ts">
	import DownIcon from '@lucide/svelte/icons/chevron-down';
	import GithubIcon from '$lib/components/icons/Github.svelte';
	import { page } from '$app/state';
	import { allTools } from '$lib/tools';
	import LightingIcon from '@lucide/svelte/icons/zap';

	import SunIcon from '@lucide/svelte/icons/sun';
	import MoonIcon from '@lucide/svelte/icons/moon';
	import ShellIcon from '@lucide/svelte/icons/shell';

	import { toggleMode } from 'mode-watcher';

	const toolsPopoverId = 'popover-nav-bar-tools';

	let currentTool = $derived(allTools.find((tool) => tool.path === page.url.pathname));
	let otherTools = $derived(allTools.filter((tool) => tool.path !== page.url.pathname));
</script>

<div
	class="flex h-14 w-full items-center gap-2 border-b border-gray-950/5 px-2 dark:border-white/10"
>
	<a class="flex flex-row items-end gap-1 text-2xl font-bold" href="/">
		<ShellIcon class="size-7" />
		<h1>restring</h1>
	</a>

	<div class="flex-1"></div>

	{#if currentTool}
		<div id={toolsPopoverId} class="dropdown-menu min-w-0">
			<button
				type="button"
				id={toolsPopoverId + '-trigger'}
				aria-haspopup="menu"
				aria-controls={toolsPopoverId + '-menu'}
				aria-expanded="false"
				class="btn-ghost min-w-0 shrink-1"
			>
				<currentTool.icon />
				<span class="min-w-0 overflow-hidden text-ellipsis whitespace-nowrap"
					>{currentTool.name}</span
				>
				<DownIcon class="text-muted-foreground" />
			</button>
			<div
				id={toolsPopoverId + '-popover'}
				data-popover
				data-align="end"
				aria-hidden="true"
				class="min-w-56"
			>
				<div
					role="menu"
					id={toolsPopoverId + '-menu'}
					aria-labelledby={toolsPopoverId + '-trigger'}
				>
					<a role="menuitem" href="/">
						<LightingIcon />
						Quick Preview
					</a>
					<!-- svelte-ignore a11y_no_redundant_roles -->
					<hr role="separator" />
					{#each otherTools as tool (tool.name)}
						<a role="menuitem" href={tool.path}>
							<tool.icon />
							{tool.name}
						</a>
					{/each}
				</div>
			</div>
		</div>
	{/if}

	<a class="btn-icon-ghost" href="https://github.com/likang/restring" target="_blank">
		<GithubIcon />
	</a>

	<button onclick={toggleMode} class="btn-icon-ghost">
		<SunIcon
			class="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 !transition-all dark:scale-0 dark:-rotate-90"
		/>
		<MoonIcon
			class="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 !transition-all dark:scale-100 dark:rotate-0"
		/>
		<span class="sr-only">Toggle theme</span>
	</button>
</div>
