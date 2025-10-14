import type { PreviewConfig } from '$lib/types';
import UrlEncodingPreview from './UrlEncodingPreview.svelte';

export default function urlEncoding(): PreviewConfig {
	return {
		name: 'url-encoding',
		component: UrlEncodingPreview,
		parse(input: string): string | undefined {
			if (!/^https?:\/\//i.test(input)) {
				return undefined;
			}

			// has non-ascii character
			if (/[^\x00-\x7F]/.test(input)) {
				return encodeURI(input);
			}

			// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURI
			const encodedPattern =
				/^(https?:\/\/)((%[0-9A-Fa-f]{2})|[A-Za-z0-9\-_.!~*'();/?:@&=+$,#])+$/i;
			if (!encodedPattern.test(input)) {
				return undefined;
			}

			// Check if input contains percent-encoded sequences (e.g., %20, %2F)
			const percentEncodedPattern = /%[0-9A-Fa-f]{2}/;
			if (!percentEncodedPattern.test(input)) {
				return undefined;
			}

			try {
				return decodeURI(input);
			} catch {
				return undefined;
			}
		}
	};
}
