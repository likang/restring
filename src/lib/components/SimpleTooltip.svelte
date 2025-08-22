<script lang="ts">
	import * as Tooltip from '$lib/components/ui/tooltip/index';
	import type { Snippet } from 'svelte';

	let {
		child,
		tips,
	}: {
		child: Snippet<
			[
				{
					props: Record<string, unknown>;
				}
			]
		>;
		tips: string;
	} = $props();
</script>

<Tooltip.Provider>
	<Tooltip.Root>
		<Tooltip.Trigger {child}></Tooltip.Trigger>
		<Tooltip.Content>{tips}</Tooltip.Content>
	</Tooltip.Root>
</Tooltip.Provider>
