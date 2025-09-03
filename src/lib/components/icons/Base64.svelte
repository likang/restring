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
	<path d="M 39 9 L 27 21" />
	<path d="M 9 33 L 21 33" />
	<path d="M 9 15 L 21 15" />
	<path d="M 15 21 L 15 9" />
	<path d="M 9 39 L 21 39" />
	<path d="M 27 33 L 39 33" />
	<path d="M 27 39 L 39 39" />
</svg>
