class States {
	inputText: string = $state('');

	inputTrimmed: string = $derived(this.inputText.trim());

	date: Date | undefined = $state.raw();

	inputError: boolean = $derived(this.inputTrimmed.length > 0 && this.date === undefined);

	unixEpoch: string = $derived.by(() => {
		if (this.date === undefined) {
			return '';
		}
		return Math.trunc(this.date.getTime() / 1000).toString();
	});

	timestampMs: string = $derived.by(() => {
		if (this.date === undefined) {
			return '';
		}
		return this.date.getTime().toString();
	});

	httpHeader: string = $derived.by(() => {
		if (this.date === undefined) {
			return '';
		}
		return this.date.toUTCString();
	});

	emailRss: string = $derived.by(() => {
		if (this.date === undefined) {
			return '';
		}
		const offset = -this.date.getTimezoneOffset();
		const offsetHours = String(Math.floor(Math.abs(offset) / 60)).padStart(2, '0');
		const offsetMinutes = String(Math.abs(offset) % 60).padStart(2, '0');
		const offsetSign = offset >= 0 ? '+' : '-';
		const timezone = `${offsetSign}${offsetHours}${offsetMinutes}`;

		const date = new Date(this.date.getTime() - this.date.getTimezoneOffset() * 60 * 1000);
		return date.toUTCString().replace('GMT', timezone);
	});

	isoTime: string = $derived.by(() => {
		if (this.date === undefined) {
			return '';
		}
		return this.date.toISOString();
	});

	setNow() {
		this.date = new Date();
		this.inputText = '';
	}
}

export const states = new States();
