import type { IParse } from '$lib/types';
import type { DescriptionItem } from '$lib/types';
import { base64ToText } from '$lib/base64';

export const guessJwt: IParse = (input) => {
	const parts = input.split('.');
	if (parts.length !== 3) {
		return null;
	}
	if (input.includes('=')) {
		return null;
	}

	try {
		const items: DescriptionItem[] = [];

		const headerText = base64ToText(parts[0].replace(/-/g, '+').replace(/_/g, '/'));
		if (headerText === null) {
			return null;
		}
		const header = JSON.parse(headerText);
		// Parse header
		items.push({ label: 'Header' });
		for (const [key, value] of Object.entries(header)) {
			items.push({ label: key, value: String(value) });
		}

		// Parse payload
		const payloadText = base64ToText(parts[1].replace(/-/g, '+').replace(/_/g, '/'));
		if (payloadText === null) {
			return null;
		}
		const payload = JSON.parse(payloadText);
		items.push({ label: 'Payload' });
		for (const [key, value] of Object.entries(payload)) {
			if (key === 'exp' || key === 'iat' || key === 'nbf') {
				// Convert timestamp fields to readable dates
				const date = new Date(Number(value) * 1000);
				items.push({ label: key, value: date.toLocaleString() });
			} else {
				items.push({ label: key, value: String(value) });
			}
		}

		// Add signature part
		items.push({ label: 'Signature', value: parts[2] });

		return { type: 'description', value: items };
	} catch {
		return null;
	}
};
