import JsonIcon from '$lib/components/icons/Json.svelte';
import TimeIcon from '@lucide/svelte/icons/clock';
import ColorIcon from '@lucide/svelte/icons/palette';
import Base64Icon from '$lib/components/icons/Base64.svelte';
import PercentIcon from '@lucide/svelte/icons/percent';
import JwtIcon from '$lib/components/icons/Jwt.svelte';

export const allTools = [
	{
		href: '/json',
		title: 'JSON',
		icon: JsonIcon
	},
	{
		href: '/datetime',
		title: 'Date/Time',
		icon: TimeIcon
	},

	{
		href: '/color',
		title: 'Color',
		icon: ColorIcon
	},
	{
		href: '/base64',
		title: 'Base64',
		icon: Base64Icon
	},
	{
		href: '/url-encoding',
		title: 'URL Encoding',
		icon: PercentIcon
	},
	{
		href: '/jwt',
		title: 'JWT',
		icon: JwtIcon
	}
];
