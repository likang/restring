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
	<path d="M14 24L15.25 25.25M44 14L24 34L22.75 32.75" />
	<path d="M4 24L14 34L34 14" />
</svg>
