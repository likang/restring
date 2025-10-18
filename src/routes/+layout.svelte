<script lang="ts">
	import NavBar from './NavBar.svelte';
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
	import { onMount } from 'svelte';

	let { children } = $props();

	onMount(async () => {
		// @ts-ignore
		await import('basecoat-css/basecoat');
		// @ts-ignore
		await import('basecoat-css/dropdown-menu');
		(window as any).basecoat.initAll();
		(window as any).basecoat.start();
	});
</script>

<ModeWatcher />
<NavBar />
<div class="text-neutral-800 dark:text-neutral-300">{@render children()}</div>
