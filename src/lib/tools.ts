import JsonIcon from '$lib/components/icons/Json.svelte';
import TimeIcon from '@lucide/svelte/icons/clock';
import ColorIcon from '@lucide/svelte/icons/palette';
import Base64Icon from '$lib/components/icons/Base64.svelte';
import EscapeIcon from '$lib/components/icons/Escape.svelte';
import UrlIcon from '@lucide/svelte/icons/link';
import RegexIcon from '@lucide/svelte/icons/regex';
import JwtIcon from '$lib/components/icons/Jwt.svelte';
import QrCodeIcon from '@lucide/svelte/icons/qr-code';

export const allTools = [
	{
		href: '/json',
		title: 'JSON',
		icon: JsonIcon
	},
	{
		href: '#',
		title: 'Date/Time',
		icon: TimeIcon
	},

	{
		href: '#',
		title: 'Color',
		icon: ColorIcon
	},
	{
		href: '#',
		title: 'Base64',
		icon: Base64Icon
	},
	{
		href: '#',
		title: 'Escape',
		icon: EscapeIcon
	},
	{
		href: '#',
		title: 'URL',
		icon: UrlIcon
	},
	{
		href: '#',
		title: 'Regex',
		icon: RegexIcon
	},
	{
		href: '#',
		title: 'JWT',
		icon: JwtIcon
	},
	{
		href: '#',
		title: 'QR Code',
		icon: QrCodeIcon
	}
];
