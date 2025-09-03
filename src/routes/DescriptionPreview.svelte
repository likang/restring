<script lang="ts">
	import type { DescriptionItem } from '$lib/types';
	import CopyButton from '$lib/components/CopyButton.svelte';

	let { value }: { value: DescriptionItem[] } = $props();
</script>

<div class="mb-6 bg-white/5">
	<div class="min-h-32 overflow-x-auto">
		<table class="table text-xs">
			<tbody>
				{#each value as desc}
					<tr>
						<td
							class="w-px whitespace-nowrap {desc.value !== undefined
								? 'text-right'
								: 'text-center uppercase'}"
							colspan={desc.value !== undefined ? 1 : 2}
						>
							{desc.label}
						</td>
						{#if desc.value !== undefined}
							<td class="group px-2 py-1">
								<div class="flex items-center justify-between">
									<span>{desc.value}</span>
									<CopyButton
										text={desc.value}
										class="btn-icon-ghost invisible size-7 rounded-sm group-hover:visible"
									/>
								</div>
							</td>
						{/if}
					</tr>
				{/each}
			</tbody>
		</table>
		<table class="table-sm table w-full">
			<tbody> </tbody>
		</table>
	</div>
</div>
