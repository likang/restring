import type { IParse } from '$lib/types';
import type { DescriptionItem } from '$lib/types';

export const guessDate: IParse = (input) => {
	function dateToDescriptionItems(date: Date): DescriptionItem[] {
		return [
			{ label: 'Timestamp (s)', value: Math.floor(date.getTime() / 1000).toString() },
			{ label: 'Timestamp (ms)', value: date.getTime().toString() },
			{ label: 'Local time', value: date.toLocaleString() },
			{ label: 'UTC time', value: date.toUTCString() },
			{ label: 'ISO 8601', value: date.toISOString() }
		];
	}

	// todo: =1 .1 /1 is also a valid date
	var date = new Date(input);
	if (!isNaN(date.getTime())) {
		if (input.length < 8) {
			// a minimal length of datetime string will be like "2025-5-1"
			return null;
		}
		return { type: 'description', value: dateToDescriptionItems(date) };
	}
	const numInput = Number(input); // as seconds
	if (isNaN(numInput)) {
		return null;
	}
	if (numInput < 1000000000 || numInput > new Date().getTime() / 1000 + 60 * 60 * 24 * 365 * 50) {
		// as for a guess, a minimal length of timestamp string will be like "1687181773"
		// and a maximal date will be 50 years from now
		// user can still use advanced tools to input any legal datetime string
		return null;
	}
	date = new Date(numInput * 1000);
	if (!isNaN(date.getTime())) {
		return { type: 'description', value: dateToDescriptionItems(date) };
	}
	return null;
};
