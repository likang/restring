import type { Preview } from '$lib/types';

import { allTools } from '$lib/tools';

class States {
	input: string = $state('');

	trimmedInput: string = $derived(this.input.trim());

	preview: Preview | undefined = $derived.by(() => {
		if (this.trimmedInput.length > 0) {
			for (const tool of allTools) {
				let result = tool.guess(this.trimmedInput);
				if (result) {
					return { name: tool.name, component: tool.preview, value: result };
				}
			}
		}
		return undefined;
	});

	reset() {
		this.input = '';
	}
}

export const globalStates = new States();
