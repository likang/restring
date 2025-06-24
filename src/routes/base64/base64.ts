import type { IParse } from '$lib/types';
import { base64ToText } from '$lib/base64';

export const guessBase64: IParse = (input) => {
	if (input.length < 4) {
		// btoa("a") = "YQ=="
		return null;
	}
	const text = base64ToText(input);
	if (text === null) {
		return null;
	}
	return { type: 'text', value: text };
};
