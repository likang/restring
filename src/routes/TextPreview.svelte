<script lang="ts">
	let { value, show }: { value: string; show: boolean } = $props();
</script>

<div class="mb-6 bg-white/5" class:hidden={!show}>
	<div class="min-h-32">
		<p class="p-1 text-white/90">{value}</p>
	</div>	
</div>
