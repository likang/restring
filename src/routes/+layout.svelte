<script lang="ts">
	import NavBar from './NavBar.svelte';
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';

	let { children } = $props();
</script>

<ModeWatcher />
<NavBar />
<div class="text-neutral-800 dark:text-neutral-300">{@render children()}</div>
