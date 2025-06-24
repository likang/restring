<script lang="ts">
	import type { TextPreview } from '$lib/types';

	let { preview }: { preview: TextPreview } = $props();
</script>

<div class="mb-6 bg-white/5">
	<div class="min-h-32">
		<p class="p-1 text-white/90">{preview.value}</p>
	</div>
</div>
