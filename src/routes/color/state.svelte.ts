import type { Colord } from 'colord';

export type Source = 'picker' | 'hex' | 'rgb' | 'hsl' | 'hwb' | 'lch' | 'cmyk';

export const states = $state({
	previewColor: 'transparent',
	pickerColor: '#ffffff',
	hex: { value: '', error: false },
	rgb: { value: '', error: false },
	hsl: { value: '', error: false },
	hwb: { value: '', error: false },
	lch: { value: '', error: false },
	cmyk: { value: '', error: false }
});

export function setColor(color: Colord, source?: Source) {
	states.previewColor = color.toHex();
	states.pickerColor = states.previewColor.substring(0, 7);
	if (source !== 'hex') {
		states.hex.value = color.toHex();
		states.hex.error = false;
	}
	if (source !== 'rgb') {
		states.rgb.value = color.toRgbString();
		states.rgb.error = false;
	}
	if (source !== 'hsl') {
		states.hsl.value = color.toHslString();
		states.hsl.error = false;
	}
	if (source !== 'hwb') {
		states.hwb.value = color.toHwbString();
		states.hwb.error = false;
	}
	if (source !== 'lch') {
		states.lch.value = color.toLchString();
		states.lch.error = false;
	}
	if (source !== 'cmyk') {
		states.cmyk.value = color.toCmykString();
		states.cmyk.error = false;
	}
}
