export function base64Decode(base64: string): string | undefined {
	const bytes = base64ToBytes(base64);
	if (bytes === undefined) {
		return undefined;
	}
	try {
		const decoder = new TextDecoder('utf8', { fatal: true });
		return decoder.decode(bytes);
	} catch {
		return undefined;
	}
}

export function base64Encode(txt: string): string {
	const bytes = new TextEncoder().encode(txt);
	return bytesToBase64(bytes);
}

export function base64ToBytes(base64: string): Uint8Array<ArrayBuffer> | undefined {
	let binString;
	try {
		binString = atob(base64);
	} catch {
		return undefined;
	}
	return Uint8Array.from(binString, (m) => m.codePointAt(0)!);
}

function bytesToBase64(bytes: Uint8Array) {
	const binString = Array.from(bytes, (byte) => String.fromCodePoint(byte)).join('');
	return btoa(binString);
}
