import { base64Decode, isImageBase64 } from '$lib/base64';
import Base64Preview from './Base64Preview.svelte';
import Base64Icon from '$lib/components/icons/Base64.svelte';
import { defineTool } from '$lib/tools';

export default defineTool({
	name: 'Base64',
	icon: Base64Icon,
	path: '/base64',
	preview: Base64Preview,
	guess(input: string): Base64PreviewValue | undefined {
		if (input.length < 4) {
			// btoa("a") = "YQ=="
			return undefined;
		}
		const text = base64Decode(input);
		if (text !== undefined) {
			return { type: 'text', result: text };
		}
		if (isImageBase64(input)) {
			return { type: 'image', result: input };
		}
		return undefined;
	}
});

export type Base64PreviewValue = {
	type: 'text' | 'image';
	result: string;
};
