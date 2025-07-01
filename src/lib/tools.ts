import JsonIcon from '$lib/icons/Json.svelte';
import TimeIcon from '$lib/icons/Time.svelte';
import ColorIcon from '$lib/icons/Color.svelte';
import Base64Icon from '$lib/icons/Base64.svelte';
import NumberBaseIcon from '$lib/icons/NumberBase.svelte';
import UnicodeIcon from '$lib/icons/Unicode.svelte';
import UrlIcon from '$lib/icons/Url.svelte';
import RegexIcon from '$lib/icons/Regex.svelte';
import HtmlIcon from '$lib/icons/Html.svelte';
import JwtIcon from '$lib/icons/Jwt.svelte';
import QrCodeIcon from '$lib/icons/QrCode.svelte';
import CronIcon from '$lib/icons/Cron.svelte';

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
		title: 'Number Bases',
		icon: NumberBaseIcon
	},
	{
		href: '#',
		title: 'Unicode',
		icon: UnicodeIcon
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
		title: 'HTML',
		icon: HtmlIcon
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
	},
	{
		href: '#',
		title: 'Cron Job',
		icon: CronIcon
	}
];
