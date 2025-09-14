import JwtPreview from './JwtPreview.svelte';
import type { PreviewConfig } from '$lib/types';
import { base64Decode } from '$lib/base64';

export type JwtValue = {
	header: object;
	payload: object;
	signature: string;
};

export default function jwt(): PreviewConfig {
	return {
		name: 'jwt',
		component: JwtPreview,
		parse(input: string) {
			return parseJwt(input);
		}
	};
}

export function parseJwt(input: string): JwtValue | undefined {
	input = input.trim();
	const parts = input.split('.');
	if (parts.length !== 3) {
		return undefined;
	}
	const header = parseJwtPart(parts[0]);
	if (header === undefined) {
		return undefined;
	}
	const payload = parseJwtPart(parts[1]);
	if (payload === undefined) {
		return undefined;
	}
	const signature = parts[2];
	if (signature.length === 0) {
		return undefined;
	}
	return { header, payload, signature };
}

function parseJwtPart(part: string): object | undefined {
	const text = base64Decode(part.replace(/-/g, '+').replace(/_/g, '/'));
	if (text === undefined) {
		return undefined;
	}
	try {
		const result = JSON.parse(text);
		if (typeof result !== 'object') {
			return undefined;
		}
		return result;
	} catch {
		return undefined;
	}
}
