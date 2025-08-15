<script lang="ts">
	import type { DescriptionItem } from '$lib/types';
	import CopyButton from '$lib/components/CopyButton.svelte';

	let { value }: { value: DescriptionItem[] } = $props();
</script>

<div class="mb-6 bg-white/5">
	<div class="min-h-32 overflow-x-auto">
		<table class="table-sm table w-full">
			<tbody>
				{#each value as desc}
					<tr>
						<td
							class="w-px whitespace-nowrap text-white/50"
							class:text-right={desc.value !== undefined}
							class:text-center={desc.value === undefined}
							class:uppercase={desc.value === undefined}
							colspan={desc.value !== undefined ? 1 : 2}
						>
							{desc.label}
						</td>
						{#if desc.value !== undefined}
							<td class="group rounded-sm text-white/90">
								<div class="flex items-center justify-between">
									<span>{desc.value}</span>
									<CopyButton
										text={desc.value}
										class="btn btn-square btn-ghost btn-sm invisible group-hover:visible"
										iconClass="size-[1.2em]"
									/>
								</div>
							</td>
						{/if}
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
