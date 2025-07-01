<script lang="ts">
	import NavBar from './NavBar.svelte';
	import '../app.css';

	let { children } = $props();
</script>

<NavBar />
{@render children()}
