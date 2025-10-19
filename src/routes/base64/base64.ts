import type { Tool } from '$lib/types';
import { base64Decode } from '$lib/base64';
import Base64Preview from './Base64Preview.svelte';
import Base64Icon from '$lib/components/icons/Base64.svelte';

export const tool: Tool = {
	name: 'Base64',
	icon: Base64Icon,
	path: '/base64',
	preview: Base64Preview,
	guess(input: string): string | undefined {
		if (input.length < 4) {
			// btoa("a") = "YQ=="
			return undefined;
		}
		return base64Decode(input);
	}
};
