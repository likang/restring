<script lang="ts">
	import ArrowRightLeftIcon from '@lucide/svelte/icons/arrow-right-left';
	import ArrowDownUpIcon from '@lucide/svelte/icons/arrow-down-up';
	import DownIcon from '@lucide/svelte/icons/chevron-down';
	import PreviewTextCard from '$lib/components/PreviewTextCard.svelte';
	import { diffModes, states } from './state.svelte';

	const vPopoverId = 'diff-mode-popover';

	function onSwitch() {
		const originalText = states.originalText;
		states.originalText = states.modifiedText;
		states.modifiedText = originalText;
	}
</script>

<svelte:head>
	<title>restring - Text Diff Checker &amp; Comparison Tool</title>
	<meta
		name="description"
		content="Compare text, files, and code online to find differences. Free text diff checker with side-by-side comparison and highlighting of changes."
	/>
	<meta name="keywords" content="text diff, text compare, text comparison, diff tool, restring" />
</svelte:head>

<div class="m-auto max-w-4xl px-6 pt-6">
	<div class="mb-2 flex flex-row items-center gap-2">
		<h2 class="text-sm font-medium">Text Diff Checker</h2>

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
				{states.diffMode}
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
					{#each diffModes as mode}
						{#if mode !== states.diffMode}
							<button role="menuitem" onclick={() => (states.diffMode = mode)}>{mode}</button>
						{/if}
					{/each}
				</div>
			</div>
		</div>
	</div>

	<div class="mb-6 flex flex-col gap-2 md:flex-row">
		<div class="flex-1">
			<textarea
				class="textarea h-full min-h-32"
				spellcheck="false"
				bind:value={states.originalText}
				placeholder="Original Text"
			></textarea>
		</div>
		<div class="flex items-center justify-center">
			<button
				class="btn-icon-ghost text-muted-foreground hover:text-accent-foreground"
				onclick={onSwitch}
			>
				<ArrowRightLeftIcon class="hidden md:inline-block" />
				<ArrowDownUpIcon class="inline-block md:hidden" />
			</button>
		</div>
		<div class="flex-1">
			<textarea
				class="textarea h-full min-h-32"
				spellcheck="false"
				bind:value={states.modifiedText}
				placeholder="Modified Text"
			></textarea>
		</div>
	</div>

	{#if states.addedCount > 0 || states.removedCount > 0}
		<div class="text-muted-foreground mb-2 text-sm">
			{#if states.addedCount > 0}
				<span class="text-green-600">{states.addedCount} added</span>
			{/if}
			{#if states.addedCount > 0 && states.removedCount > 0}
				<span class="text-muted-foreground">, </span>
			{/if}
			{#if states.removedCount > 0}
				<span class="text-red-600">{states.removedCount} removed</span>
			{/if}
		</div>
		<div class="min-h-32 rounded-md border p-3 whitespace-pre-wrap md:text-sm">
			{#each states.diffResult as diff}
				{#if diff.added}
					<span class="diff-added">{diff.value}</span>
				{:else if diff.removed}
					<span class="diff-removed">{diff.value}</span>
				{:else}
					<span>{diff.value}</span>
				{/if}
			{/each}
		</div>
	{:else if states.originalText.length > 0 || states.modifiedText.length > 0}
		<PreviewTextCard>
			<p class="text-muted-foreground flex min-h-30 items-center justify-center">
				No differences found.
			</p>
		</PreviewTextCard>
	{/if}
</div>

<style>
	.diff-added {
		@reference "tailwindcss";
		@apply bg-green-500/20 px-[2px] text-green-600;
	}
	.diff-removed {
		@reference "tailwindcss";
		@apply bg-red-500/20 px-[2px] text-red-500;
	}
</style>
