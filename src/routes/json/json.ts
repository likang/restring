import type { IParse } from '$lib/types';

export const guessJSON: IParse = (input) => {
	const jsonStartRegex = /^\s*[\{\[]/;
	if (!jsonStartRegex.test(input)) {
		return null;
	}

	try {
		const parsed = JSON.parse(input);
		return { type: 'json', value: JSON.stringify(parsed, null, 2) };
	} catch {
		return null;
	}
};
