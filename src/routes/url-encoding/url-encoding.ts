import { defineTool } from '$lib/tools';
import UrlEncodingPreview from './UrlEncodingPreview.svelte';
import PercentIcon from '@lucide/svelte/icons/percent';

export type UrlEncodingPreviewValue = {
	type: 'encoded' | 'txt';
	content: string;
};

export default defineTool({
	name: 'URL Encoding',
	icon: PercentIcon,
	path: '/url-encoding',
	preview: UrlEncodingPreview,
	guess(input: string): UrlEncodingPreviewValue | undefined {
		if (!/^https?:\/\//i.test(input)) {
			return undefined;
		}

		// has non-ascii character
		if (/[^\x00-\x7F]/.test(input)) {
			return { type: 'encoded', content: encodeURI(input) };
		}

		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURI
		const encodedPattern = /^(https?:\/\/)((%[0-9A-Fa-f]{2})|[A-Za-z0-9\-_.!~*'();/?:@&=+$,#])+$/i;
		if (!encodedPattern.test(input)) {
			return undefined;
		}

		// Check if input contains percent-encoded sequences (e.g., %20, %2F)
		const percentEncodedPattern = /%[0-9A-Fa-f]{2}/;
		if (!percentEncodedPattern.test(input)) {
			return undefined;
		}

		try {
			return { type: 'txt', content: decodeURI(input) };
		} catch {
			return undefined;
		}
	}
});
