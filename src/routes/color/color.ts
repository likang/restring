import { colord, extend } from 'colord';
import hwbPlugin from 'colord/plugins/hwb';
import lchPlugin from 'colord/plugins/lch';
import cmykPlugin from 'colord/plugins/cmyk';

import ColorPreview from './ColorPreview.svelte';
import ColorIcon from '@lucide/svelte/icons/palette';
import type { Colord } from 'colord';
import { defineTool } from '$lib/tools';

extend([hwbPlugin, lchPlugin, cmykPlugin]);

export default defineTool({
	name: 'Color',
	icon: ColorIcon,
	path: '/color',
	preview: ColorPreview,
	guess(input: string): Colord | undefined {
		return parseColor(input);
	}
});

export function parseColor(input: string) {
	const color = colord(input);
	return color.isValid() ? color : undefined;
}
