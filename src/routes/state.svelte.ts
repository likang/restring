import type { PreviewConfig, Preview } from '$lib/types';

import json from './json/json';
import datetime from './datetime/datetime';
import color from './color/color';
import base64 from './base64/base64';
import jwt from './jwt/jwt';
import urlEncoding from './url-encoding/url-encoding';

class States {
	inputText: string = $state('');

	trimmedInputText: string = $derived(this.inputText.trim());

	preview: Preview | undefined = $derived.by(() => {
		const previewers: PreviewConfig[] = [
			json(),
			datetime(),
			color(),
			base64(),
			jwt(),
			urlEncoding()
		];

		if (this.trimmedInputText.length > 0) {
			for (const previewer of previewers) {
				let result = previewer.parse(this.trimmedInputText);
				if (result) {
					return { name: previewer.name, component: previewer.component, value: result };
				}
			}
		}
		return undefined;
	});

	reset() {
		this.inputText = '';
	}
}

export const globalStates = new States();
