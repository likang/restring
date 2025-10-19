class States {
	txt: string = $state('');
	txtError: boolean = $state(false);
	encoded: string = $state('');
	encodedError: boolean = $state(false);
	type: 'uri' | 'uri-component' = $state('uri');
	from: 'txt' | 'encoded' = $state('txt');
}

export const states = new States();
