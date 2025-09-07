import type { IParse } from '$lib/types';
import { colord, extend, getFormat } from 'colord';
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
			type: 'color',
			value: color
		};
	} catch {
		return null;
	}
};

export { colord, getFormat };
