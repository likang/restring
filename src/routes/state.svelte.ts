import { guessJSON } from './json/json';
import { guessUrl } from './url/url';
import { guessDate } from './datetime/datetime';
import { guessColor } from './color/color';
import { guessBase64 } from './base64/base64';
import { guessJwt } from './jwt/jwt';

class States {
	inputText: string = $state('');

	trimmedInputText = $derived(this.inputText.trim());

	preview = $derived.by(() => {
		if (this.trimmedInputText.length === 0) return null;
		// guessUrl should be before guessDate, because http://example.com/?a=1 can be parsed as a Date by new Date()
		for (const parser of [guessJSON, guessUrl, guessDate, guessColor, guessBase64, guessJwt]) {
			let result = parser(this.trimmedInputText);
			if (result) {
				return result;
			}
		}
		return null;
	});

	reset() {
		this.inputText = '';
	}
}

export const globalStates = new States();
