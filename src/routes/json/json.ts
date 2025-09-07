import type { IParse } from '$lib/types';

export const guessJSON: IParse = (input) => {
	const jsonStartRegex = /^\s*[\{\[]/;
	if (!jsonStartRegex.test(input)) {
		return null;
	}

	try {
		const parsed = JSON.parse(input);
		return { type: 'json', value: { obj: parsed, txt: input } };
	} catch (e) {
		console.error(e);
		return null;
	}
};

export const HISTORY_KEY_JSON = 'history-json';
