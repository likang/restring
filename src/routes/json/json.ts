import JsonPreview from './JsonPreview.svelte';
import JsonIcon from '$lib/components/icons/Json.svelte';
import { defineTool } from '$lib/tools';

export type JsonValue = { obj: any; txt: string };

const jsonStartRegex = /^\s*[\{\[]/;
export const HISTORY_KEY_JSON = 'history-json';

export default defineTool({
	name: 'JSON',
	icon: JsonIcon,
	path: '/json',
	preview: JsonPreview,
	guess(input: string): JsonValue | undefined {
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
});
