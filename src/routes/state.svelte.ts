import type { Preview } from '$lib/types';

import { allTools } from '$lib/tools';

class States {
	inputText: string = $state('');

	trimmedInputText: string = $derived(this.inputText.trim());

	preview: Preview | undefined = $derived.by(() => {
		if (this.trimmedInputText.length > 0) {
			for (const tool of allTools) {
				let result = tool.parse(this.trimmedInputText);
				if (result) {
					return { name: tool.name, component: tool.component, value: result };
				}
			}
		}
		return undefined;
	});

	reset() {
		this.inputText = '';
	}
}

export const globalStates = new States();
