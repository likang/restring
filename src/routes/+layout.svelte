<script lang="ts">
	import NavBar from './NavBar.svelte';
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
	import { onMount } from 'svelte';

	let { children } = $props();

	onMount(async () => {
		// Suppress monkey patching of history API by basecoat (see node_modules/basecoat-css/dist/js/all.js)
		window.history.__basecoatPatched = true;
		// @ts-ignore
		await import('basecoat-css/all');
		(window as any).basecoat.initAll();
		(window as any).basecoat.start();
	});
</script>

<ModeWatcher />
<NavBar />
<div class="text-neutral-800 dark:text-neutral-300">{@render children()}</div>
