import type { IParse } from '$lib/types';

export const guessJSON: IParse = (input) => {
	const jsonStartRegex = /^\s*[\{\[]/;
	if (!jsonStartRegex.test(input)) {
		return null;
	}

	try {
		JSON.parse(input);
		return { type: 'json', value: input };
	} catch {
		return null;
	}
};
