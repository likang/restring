import { defineTool } from '$lib/tools';
import DiffIcon from '@lucide/svelte/icons/diff';

export default defineTool({
	name: 'Text Diff',
	icon: DiffIcon,
	path: '/diff'
});
