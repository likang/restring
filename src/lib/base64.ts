export function base64ToText(base64: string): string | null {
	const bytes = base64ToBytes(base64);
	if (bytes === null) {
		return null;
	}
	try {
		const decoder = new TextDecoder('utf8', { fatal: true });
		return decoder.decode(bytes);
	} catch {
		return null;
	}
}

export function base64ToBytes(base64: string): Uint8Array<ArrayBuffer> | null {
	let binString;
	try {
		binString = atob(base64);
	} catch {
		return null;
	}
	return Uint8Array.from(binString, (m) => m.codePointAt(0)!);
}
