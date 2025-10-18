import type { ToolConfig } from '$lib/types';

import DatetimePreview from './DatetimePreview.svelte';
import TimeIcon from '@lucide/svelte/icons/clock';

export default function datetime(): ToolConfig {
	return {
		name: 'Date/Time',
		icon: TimeIcon,
		path: '/datetime',
		component: DatetimePreview,
		parse(input: string): Date | undefined {
			return parseDate(input);
		}
	};
}

const guessTimeStart = new Date('1991-08-06').getTime();
const guessTimeEnd = new Date('2038-01-19').getTime();

export function parseDate(input: string): Date | undefined {
	var date = new Date(input);
	if (!isNaN(date.getTime())) {
		if (input.length >= '19910806'.length) {
			return date;
		}
	}
	const numInput = Number(input);
	if (!isNaN(numInput)) {
		for (const input of [numInput, numInput * 1000]) {
			date = new Date(input);
			let time = date.getTime();
			if (!isNaN(time) && time >= guessTimeStart && time <= guessTimeEnd) {
				return date;
			}
		}
	}

	return undefined;
}
