import type { Colord } from 'colord';

class States {
	inputText: string = $state('');
	inputTrimmed: string = $derived(this.inputText.trim());

	pickerColor: string = $state('#ffffff');

	color: Colord | undefined = $state.raw();

	inputError: boolean = $derived(this.inputTrimmed.length > 0 && this.color === undefined);

	previewColor: string = $derived.by(() => {
		if (this.color === undefined) {
			return 'transparent';
		}
		return this.color.toHex();
	});

	hex: string = $derived(this.color?.toHex() ?? '');
	rgb: string = $derived(this.color?.toRgbString() ?? '');
	hsl: string = $derived(this.color?.toHslString() ?? '');
	hwb: string = $derived(this.color?.toHwbString() ?? '');
	lch: string = $derived(this.color?.toLchString() ?? '');
	cmyk: string = $derived(this.color?.toCmykString() ?? '');
}

export const states = new States();
