<script lang="ts">
	import CopyButton from '$lib/components/CopyButton.svelte';

	import { states } from './state.svelte';
</script>

{#snippet itemRow(label: string, value: () => string)}
	<div class="text-muted-foreground text-xs whitespace-nowrap md:text-right">{label}</div>
	<div
		class="group md:hover:bg-muted/50 relative -top-3 flex min-h-9 items-center justify-between gap-2 rounded-md md:top-0 md:p-2"
	>
		<p class="font-mono text-sm">{value()}</p>
		<CopyButton
			text={value}
			class="text-muted-foreground hover:text-accent-foreground size-6 rounded-sm group-hover:visible md:invisible"
		/>
	</div>
{/snippet}

<div class="mb-6">
	<div class="grid grid-cols-1 items-center gap-1 md:grid-cols-[auto_1fr] md:gap-2">
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
