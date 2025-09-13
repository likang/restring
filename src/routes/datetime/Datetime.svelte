<script lang="ts">
	import CopyButton from '$lib/components/CopyButton.svelte';

	import { states } from './state.svelte';
</script>

{#snippet itemRow(label: string, value: () => string)}
	<tr>
		<td class="text-muted-foreground w-px text-right text-xs whitespace-nowrap"> {label} </td>
		<td class="group px-2 py-1">
			<div class="flex items-center justify-between">
				<span>{value()}</span>
				<CopyButton
					text={value}
					class="btn-icon-ghost invisible size-7 rounded-sm group-hover:visible"
				/>
			</div>
		</td>
	</tr>
{/snippet}

<div class="mb-6">
	{#if states.date}
		<div class="overflow-x-auto">
			<table class="table">
				<tbody>
					{@render itemRow('Timestamp (s)', () => (states.date!.getTime() / 1000).toString())}
					{@render itemRow('Timestamp (ms)', () => states.date!.getTime().toString())}
					{@render itemRow('Local Time', () => states.date!.toLocaleString())}
					{@render itemRow('UTC Time', () => states.date!.toUTCString())}
					{@render itemRow('ISO Time', () => states.date!.toISOString())}
				</tbody>
			</table>
		</div>
	{/if}
</div>
