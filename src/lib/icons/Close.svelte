<script lang="ts">
	let { class: className }: { class?: string } = $props();
</script>
<svg
	viewBox="0 0 48 48"
	xmlns="http://www.w3.org/2000/svg"
	fill="none"
	stroke="currentColor"
	stroke-width="4"
	stroke-linecap="round"
	stroke-linejoin="round"
	class={className}
>
	<path d="M8 8L40 40" />
	<path d="M8 40L40 8" />
</svg>
