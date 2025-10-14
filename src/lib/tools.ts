import JsonIcon from '$lib/components/icons/Json.svelte';
import TimeIcon from '@lucide/svelte/icons/clock';
import ColorIcon from '@lucide/svelte/icons/palette';
import Base64Icon from '$lib/components/icons/Base64.svelte';
import EscapeIcon from '$lib/components/icons/Escape.svelte';
import PercentIcon from '@lucide/svelte/icons/percent';
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
		href: '#',
		title: 'Escape',
		icon: EscapeIcon
	},
	{
		href: '/url-encoding',
		title: 'URL Encoding',
		icon: PercentIcon
	},
	{
		href: '#',
		title: 'Regex',
		icon: RegexIcon
	},
	{
		href: '/jwt',
		title: 'JWT',
		icon: JwtIcon
	},
	{
		href: '#',
		title: 'QR Code',
		icon: QrCodeIcon
	}
];
