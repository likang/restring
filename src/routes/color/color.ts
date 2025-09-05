import type { IParse } from '$lib/types';
import { colord, extend } from 'colord';
import hwbPlugin from 'colord/plugins/hwb';
import lchPlugin from 'colord/plugins/lch';
import cmykPlugin from 'colord/plugins/cmyk';

extend([hwbPlugin, lchPlugin, cmykPlugin]);

export const guessColor: IParse = (input) => {
	try {
		const color = colord(input);
		if (!color.isValid()) {
			return null;
		}
		return {
			type: 'description',
			value: [
				{ label: 'Hex', value: color.toHex() },
				{ label: 'Rgb', value: color.toRgbString() },
				{ label: 'Hsl', value: color.toHslString() },
				{ label: 'Hwb', value: color.toHwbString() },
				{ label: 'Lch', value: color.toLchString() },
				{ label: 'Cmyk', value: color.toCmykString() }
			]
		};
	} catch {
		return null;
	}
};
