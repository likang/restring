class States {
	inputText: string = $state('');
	date: Date | undefined = $state.raw();
	inputError: boolean = $derived(this.inputText.trim().length > 0 && this.date === undefined);
}

export const states = new States();
