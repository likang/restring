import type { IParse } from '$lib/types';
import type { DescriptionItem } from '$lib/types';

export const guessUrl: IParse = (input) => {
	try {
		const url = new URL(input);
		const items: DescriptionItem[] = [];

		items.push({ label: 'Origin', value: url.origin });
		const decodedPathname = decodeURIComponent(url.pathname);
		items.push({ label: 'Path Name', value: decodedPathname });

		const addedKeys = new Set<string>();

		if (url.searchParams.size > 0) {
			items.push({ label: 'Search Params' });
		}
		for (const key of url.searchParams.keys()) {
			if (addedKeys.has(key)) {
				continue;
			}
			const value = url.searchParams.getAll(key)!;
			if (value.length === 1) {
				items.push({ label: key, value: value[0] });
			} else {
				items.push({ label: key, value: value.toString() });
			}
			addedKeys.add(key);
		}
		return { type: 'description', value: items };
	} catch {
		return null;
	}
};
