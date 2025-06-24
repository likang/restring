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
	<path d="M40 33L44 37L40 41" />
	<path d="M40 7L44 11L40 15" />
	<path d="M44 11H37C29.8203 11 24 16.8203 24 24C24 31.1797 29.8203 37 37 37H44" />
	<path d="M4 37H11C18.1797 37 24 31.1797 24 24C24 16.8203 18.1797 11 11 11H4" />
</svg>
