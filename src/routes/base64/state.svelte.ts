import { base64ToBytes } from '$lib/base64';

class States {
	txt: string = $state('');
	txtError: boolean = $state(false);
	encoded: string = $state('');
	encodedError: boolean = $state(false);
	type: 'text' | 'image' = $state('text');

	// NOTE: Not found a proper way to use imageEncoded directly yet
	imageSrc: string | undefined = $state();
	imageEncoded: string = $state('');
	imageEncodedError: boolean = $state(false);
}

export const states = new States();
