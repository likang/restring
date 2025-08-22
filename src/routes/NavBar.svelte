<script lang="ts">
	import DownIcon from '@lucide/svelte/icons/chevron-down';
	import GithubIcon from '$lib/components/icons/Github.svelte';
	import { page } from '$app/state';
	import { allTools } from '$lib/tools';
	import LightingIcon from '@lucide/svelte/icons/zap';

	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index';
	import { Button } from '$lib/components/ui/button/index';
	import SunIcon from '@lucide/svelte/icons/sun';
	import MoonIcon from '@lucide/svelte/icons/moon';

	import { toggleMode } from 'mode-watcher';

	let currentTool = $derived(allTools.find((tool) => tool.href === page.url.pathname));
	let otherTools = $derived(allTools.filter((tool) => tool.href !== page.url.pathname));
</script>

<div
	class="flex h-14 w-full items-center gap-2 border-b border-gray-950/5 px-2 dark:border-white/10"
>
	<a class="flex flex-row items-center text-2xl font-bold" href="/">
		<!-- <span>
			re<span class="font-bold underline decoration-blue-500 decoration-wavy decoration-2"
				>string</span
			>
		</span> -->
		<span
			class="text-blue- font-bold underline decoration-blue-500 decoration-wavy decoration-1 underline-offset-4"
			>re</span
		><span>string</span>
		<!-- <span
			class="text-blue- font-bold underline decoration-blue-500 decoration-wavy decoration-1 underline-offset-4"
			>re</span
		><span>string</span> -->
		<!--
		<span>
			<span
				class="relative inline-block before:absolute before:inset-[80%_0_0_0] before:-z-1 before:block before:border-t-2 before:border-b-3 before:border-t-blue-500 before:border-b-blue-500"
				>re</span
			>string
		</span>
		<span>
			<span
				class="relative inline-block before:absolute before:inset-[60%_0_0_0] before:-z-1 before:block before:-skew-y-3 before:bg-pink-500"
				>re</span
			>string
		</span>
-->
	</a>
	<!-- <span class="underline">re</span>string</a -->
	<!-- > -->

	{#if currentTool}
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				{#snippet child({ props })}
					<Button {...props} variant="ghost" class="">
						<currentTool.icon />
						{currentTool.title}
						<DownIcon />
					</Button>
				{/snippet}
			</DropdownMenu.Trigger>
			<DropdownMenu.Content class="w-56" align="start">
				<DropdownMenu.Item class="px-0 py-0">
					<a href="/" class="flex w-full flex-row items-center gap-2 px-2 py-1.5">
						<LightingIcon />
						Auto
					</a>
				</DropdownMenu.Item>
				<DropdownMenu.Separator />
				{#each otherTools as tool (tool.title)}
					<DropdownMenu.Item class="px-0 py-0">
						<a href={tool.href} class="flex w-full flex-row items-center gap-2 px-2 py-1.5">
							<tool.icon />
							{tool.title}
						</a>
					</DropdownMenu.Item>
				{/each}
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	{/if}
	<div class="flex-1"></div>

	<Button variant="ghost" size="icon" href="https://github.com/likang/restring" target="_blank">
		<GithubIcon />
	</Button>

	<Button onclick={toggleMode} variant="ghost" size="icon">
		<SunIcon
			class="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 !transition-all dark:scale-0 dark:-rotate-90"
		/>
		<MoonIcon
			class="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 !transition-all dark:scale-100 dark:rotate-0"
		/>
		<span class="sr-only">Toggle theme</span>
	</Button>
</div>
