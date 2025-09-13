import type { PreviewConfig } from '$lib/types';

import DatetimePreview from './DatetimePreview.svelte';

export default function datetime(): PreviewConfig {
	return {
		name: 'datetime',
		component: DatetimePreview,
		parse(input: string): Date | undefined {
			return parseDate(input);
		}
	};
}

export function parseDate(input: string): Date | undefined {
	// todo: =1 .1 /1 is also a valid date
	var date = new Date(input);
	if (!isNaN(date.getTime())) {
		if (input.length < 8) {
			// a minimal length of datetime string will be like "2025-5-1"
			return undefined;
		}
		return date;
	}
	const numInput = Number(input); // as seconds
	if (isNaN(numInput)) {
		return undefined;
	}
	if (numInput < 1000000000 || numInput > new Date().getTime() / 1000 + 60 * 60 * 24 * 365 * 50) {
		// as for a guess, a minimal length of timestamp string will be like "1687181773"
		// and a maximal date will be 50 years from now
		// user can still use advanced tools to input any legal datetime string
		return undefined;
	}
	date = new Date(numInput * 1000);
	if (!isNaN(date.getTime())) {
		return date;
	}
	return undefined;
}
