import { defineTool } from '$lib/tools';
import FingerprintIcon from '@lucide/svelte/icons/fingerprint';

export default defineTool({
	name: 'UUID',
	icon: FingerprintIcon,
	path: '/uuid'
});
