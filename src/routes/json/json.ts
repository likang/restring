import type { ToolConfig } from '$lib/types';
import JsonPreview from './JsonPreview.svelte';
import JsonIcon from '$lib/components/icons/Json.svelte';

export type JsonValue = { obj: any; txt: string };

export default function json(): ToolConfig {
	const jsonStartRegex = /^\s*[\{\[]/;

	return {
		name: 'JSON',
		icon: JsonIcon,
		path: '/json',
		component: JsonPreview,
		parse(input: string): JsonValue | undefined {
			if (!jsonStartRegex.test(input)) {
				return undefined;
			}
			try {
				const parsed = JSON.parse(input);
				return { obj: parsed, txt: input };
			} catch {
				return undefined;
			}
		}
	};
}

export const HISTORY_KEY_JSON = 'history-json';
