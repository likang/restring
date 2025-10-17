import type { PreviewConfig } from '$lib/types';
import { colord, extend } from 'colord';
import hwbPlugin from 'colord/plugins/hwb';
import lchPlugin from 'colord/plugins/lch';
import cmykPlugin from 'colord/plugins/cmyk';

import ColorPreview from './ColorPreview.svelte';

extend([hwbPlugin, lchPlugin, cmykPlugin]);

export default function color(): PreviewConfig {
	return {
		name: 'color',
		component: ColorPreview,
		parse(input: string) {
			return parseColor(input);
		}
	};
}

export function parseColor(input: string) {
	const color = colord(input);
	return color.isValid() ? color : undefined;
}
