<script lang="ts">
	import DownloadIcon from '@lucide/svelte/icons/download';
	import { states } from './state.svelte';
	import { downloadBlob } from '$lib/file';

	async function downloadImage() {
		const match = states.imageEncoded.match(/^\s*data:image\/([a-zA-Z]+)/);
		if (match) {
			const response = await fetch(states.imageEncoded);
			const blob = await response.blob();
			const type = match[1];
			const filename = `image.${type}`;
			downloadBlob(blob, filename);
		}
	}
</script>

<button
	class="btn-icon-ghost"
	disabled={states.imageEncodedError || states.imageEncoded.length === 0}
	onclick={downloadImage}
>
	<DownloadIcon />
</button>
