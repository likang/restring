import type { JwtValue } from './jwt';

class States {
	inputText: string = $state('');
	value: JwtValue | undefined = $state();
	inputError: boolean = $derived(this.inputText.trim().length > 0 && this.value === undefined);
}

export const states = new States();
