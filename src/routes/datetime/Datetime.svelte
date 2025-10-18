<script lang="ts">
	import CopyButton from '$lib/components/CopyButton.svelte';

	import { states } from './state.svelte';
</script>

{#snippet itemRow(label: string, value: () => string)}
	<div class="text-muted-foreground text-right text-xs whitespace-nowrap">{label}</div>
	<div class="group hover:bg-muted/50 relative min-h-9 rounded-md p-2">
		<p class="font-mono text-sm">{value()}</p>
		<CopyButton
			text={value}
			class="btn-icon-ghost invisible absolute top-1/2 right-1 size-7 -translate-y-1/2 rounded-sm group-hover:visible"
		/>
	</div>
{/snippet}

<div class="mb-6">
	<div class="grid grid-cols-[auto_1fr] items-center gap-2">
		{@render itemRow('Unix Epoch', () => states.unixEpoch)}
		{@render itemRow('Timestamp (ms)', () => states.timestampMs)}
		{@render itemRow('ISO 8601', () => states.isoTimezone)}
		{@render itemRow('ISO 8601 (UTC)', () => states.iso)}
		<!--rfc 822 -->
		{@render itemRow('Email/RSS', () => states.emailRss)}
		<!--rfc 7231 -->
		{@render itemRow('HTTP Header', () => states.httpHeader)}
	</div>
</div>
