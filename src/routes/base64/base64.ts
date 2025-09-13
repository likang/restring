import type { PreviewConfig } from '$lib/types';
import { base64Decode } from '$lib/base64';
import Base64Preview from './Base64Preview.svelte';

export default function base64(): PreviewConfig {
	return {
		name: 'base64',
		component: Base64Preview,
		parse(input: string): string | undefined {
			if (input.length < 4) {
				// btoa("a") = "YQ=="
				return undefined;
			}
			return base64Decode(input);
		}
	};
}
