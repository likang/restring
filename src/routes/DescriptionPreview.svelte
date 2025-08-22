<script lang="ts">
	import type { DescriptionItem } from '$lib/types';
	import CopyButton from '$lib/components/CopyButton.svelte';
	import * as Table from '$lib/components/ui/table/index';

	let { value }: { value: DescriptionItem[] } = $props();
</script>

<div class="mb-6 bg-white/5">
	<div class="min-h-32 overflow-x-auto">
		<Table.Root class="text-xs">
			<Table.Body>
				{#each value as desc}
					<Table.Row>
						<Table.Cell
							class="w-px whitespace-nowrap {desc.value !== undefined
								? 'text-right'
								: 'text-center uppercase'}"
							colspan={desc.value !== undefined ? 1 : 2}
						>
							{desc.label}
						</Table.Cell>
						{#if desc.value !== undefined}
							<Table.Cell class="group px-2 py-1">
								<div class="flex items-center justify-between">
									<span>{desc.value}</span>
									<CopyButton
										variant="ghost"
										size="icon"
										text={desc.value}
										class="invisible size-7 rounded-sm group-hover:visible"
										iconClass="size-3"
									/>
								</div>
							</Table.Cell>
						{/if}
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
		<table class="table-sm table w-full">
			<tbody> </tbody>
		</table>
	</div>
</div>
