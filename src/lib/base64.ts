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

export function bytesToBase64(bytes: Uint8Array) {
	const binString = Array.from(bytes, (byte) => String.fromCodePoint(byte)).join('');
	return btoa(binString);
}

export function isImageBase64(encoded: string): boolean {
	const match = encoded.match(/^\s*data:image\/[a-zA-Z0-9+\-.]+;base64,(.*)$/);
	let bytes: Uint8Array<ArrayBuffer> | undefined = undefined;
	if (match) {
		const pureBase64 = match[1];
		bytes = base64ToBytes(pureBase64);
	}
	return bytes !== undefined && bytes.length > 0;
}
