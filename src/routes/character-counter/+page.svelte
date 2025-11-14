<script lang="ts">
	import { states } from './state.svelte';
	import CopyButton from '$lib/components/CopyButton.svelte';
	import CharactersLimit from './CharactersLimit.svelte';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	const CHARS_LIMIT_KEY = 'counter-chars-limit';

	let textAreaElement: HTMLTextAreaElement;
	let displayElement: HTMLDivElement;

	function onTextareaScroll() {
		displayElement.scrollTop = textAreaElement.scrollTop;
		displayElement.scrollLeft = textAreaElement.scrollLeft;
	}

	if (browser) {
		const charsLimit = Number(localStorage.getItem(CHARS_LIMIT_KEY));
		if (!isNaN(charsLimit) && charsLimit >= 0) {
			states.charsLimit = charsLimit;
		}
		$effect(() => {
			localStorage.setItem(CHARS_LIMIT_KEY, states.charsLimit.toString());
		});
	}
</script>

<svelte:head>
	<title>restring - Character Counter</title>
	<meta name="description" content="Count characters, words, and lines in your text online." />
	<meta name="keywords" content="character counter, word counter, line counter" />
</svelte:head>

<div class="m-auto max-w-2xl px-6 pt-6">
	<div class="mb-2 flex flex-row items-center gap-2">
		<h2 class="text-lg font-semibold">Character Counter</h2>

		<div class="flex-1"></div>

		<CopyButton text={() => states.inputText} />
	</div>

	<div class="mb-6">
		<div class="flex-col">
			<div class="relative">
				<textarea
					bind:this={textAreaElement}
					bind:value={states.inputText}
					class="textarea no-scrollbar max-h-144 min-h-96 overflow-scroll overflow-x-hidden bg-transparent px-3 py-2 pb-15"
					placeholder="Enter your text here"
					onscroll={onTextareaScroll}
				></textarea>
				<div
					bind:this={displayElement}
					class="absolute top-0 right-0 bottom-0 left-0 -z-10 overflow-scroll overflow-x-hidden border border-transparent bg-transparent px-3 py-2 pb-15 break-words whitespace-pre-wrap text-transparent md:text-sm"
				>
					{#if states.charsLimit > 0 && states.inputText.length > states.charsLimit}
						{states.inputText.slice(0, states.charsLimit)}<span class="bg-red-500/20"
							>{states.inputText
								.slice(states.charsLimit)
								.replace(/([\r\n])(?=[\r\n]*$)/gm, '$1 ')}</span
						>
					{:else}
						{states.inputText}
					{/if}
				</div>

				<div class="border-border absolute right-px bottom-12 left-px z-10 border-t"></div>

				<footer
					class="text-muted-foreground absolute right-3 bottom-px left-3 grid h-12 grid-cols-4 items-center gap-2 bg-(--color-background) text-center"
				>
					<div class="flex flex-col">
						<div class="font-mono text-sm">
							{states.counts.chars}
							<!-- svelte-ignore a11y_click_events_have_key_events -->
							/<CharactersLimit />
						</div>
						<div class="text-xs">Characters</div>
					</div>
					<div class="flex flex-col">
						<div class="font-mono text-sm">{states.counts.words}</div>
						<div class="text-xs">Words</div>
					</div>
					<div class="flex flex-col">
						<div class="font-mono text-sm">{states.counts.spaces}</div>
						<div class="text-xs">Spaces</div>
					</div>
					<div class="flex flex-col">
						<div class="font-mono text-sm">{states.counts.lines}</div>
						<div class="text-xs">Lines</div>
					</div>
				</footer>
			</div>
		</div>
	</div>
</div>

<style>
	.no-scrollbar {
		scrollbar-width: none;
		-ms-overflow-style: none;
		&::-webkit-scrollbar {
			display: none;
		}
	}
</style>
