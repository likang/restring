<script lang="ts">
	let { show }: { show: boolean } = $props();
</script>

<div class="mb-6 bg-white/5" class:hidden={!show}>
	<div class="flex min-h-32 items-center justify-center text-sm">
		<p class="text-white/20">No preview for this input, you may try an advanced tool below</p>
	</div>
</div>
