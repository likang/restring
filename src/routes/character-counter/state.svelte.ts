class CounterStates {
	inputText: string = $state('');
	charsLimit: number = $state(0);

	counts = $derived.by(() => {
		if (this.inputText.length === 0) {
			return { chars: 0, words: 0, spaces: 0, lines: 0 };
		}

		let words = 0;
		let spaces = 0;
		let lines = 1;
		let inWord = false;
		let lastCharIsReturn = false;
		for (const char of this.inputText) {
			if (char === '\n') {
				lines++;
				spaces++;
				inWord = false;
				lastCharIsReturn = false;
				if (lastCharIsReturn) {
					lines--;
				}
			} else if (char === '\r') {
				lines++;
				spaces++;
				inWord = false;
				lastCharIsReturn = true;
			} else if (char === ' ' || char === '\t' || char === '\v' || char === '\f') {
				spaces++;
				inWord = false;
				lastCharIsReturn = false;
			} else {
				lastCharIsReturn = false;
				if (!inWord) {
					words++;
					inWord = true;
				}
			}
		}

		return { chars: this.inputText.length, words, spaces, lines };
	});
}

export const states = new CounterStates();
