<script lang="ts">
	import CopyButton from '$lib/components/CopyButton.svelte';

	let { value }: { value: string } = $props();
</script>

<div class="mb-6">
	<div class="flex justify-end p-2">
		<CopyButton variant="ghost" size="icon" text={value} />
	</div>
	<div class="min-h-32 bg-white/5">
		<p class="p-1 text-white/90">{value}</p>
	</div>
</div>
