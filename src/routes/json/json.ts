import type { PreviewConfig } from '$lib/types';
import JsonPreview from './JsonPreview.svelte';

export type JsonValue = { obj: any; txt: string };

export default function json(): PreviewConfig {
	const jsonStartRegex = /^\s*[\{\[]/;

	return {
		name: 'json',
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
