<script lang="ts">
	let { class: className }: { class: string } = $props();
</script>

<svg
	viewBox="0 0 48 48"
	xmlns="http://www.w3.org/2000/svg"
	fill="none"
	stroke="currentColor"
	stroke-width="4"
	stroke-linejoin="round"
	stroke-linecap="round"
	class={className}
>
	<path d="M20 6H6V20H20V6Z" />
	<path d="M20 28H6V42H20V28Z" />
	<path d="M42 6H28V20H42V6Z" />
	<path d="M29 28V42" />
	<path d="M41 28V42" />
</svg>
