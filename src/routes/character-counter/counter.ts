import { defineTool } from '$lib/tools';
import TallyIcon from '@lucide/svelte/icons/tally-5';

export default defineTool({
	name: 'Character Counter',
	icon: TallyIcon,
	path: '/character-counter'
});
