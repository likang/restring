<script lang="ts">
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
	import SearchIcon from '$lib/icons/Search.svelte';

	const allTools = [
		{
			href: '#',
			title: 'JSON Viewer',
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
	let search = $state('');
	let tools = $derived(
		search.length === 0
			? allTools
			: allTools.filter((tool) => tool.title.toLowerCase().includes(search.toLowerCase()))
	);
</script>

<div class="mb-6 flex items-end">
	<h3 class="flex-1">Advanced Tools</h3>
	<div>
		<label class="input input-sm">
			<SearchIcon class="h-[1em] opacity-50" />
			<input type="search" class="grow" placeholder="Search" bind:value={search} />
			<kbd class="kbd kbd-sm">⌘</kbd>
			<kbd class="kbd kbd-sm">K</kbd>
		</label>
	</div>
</div>

<ul class="grid grid-flow-row grid-cols-1 gap-2 sm:grid-cols-3">
	{#each tools as tool (tool.title)}
		<li class="list-none">
			<a
				href={tool.href}
				class="inline-flex w-full items-center rounded-xs p-2 text-white/60 transition-colors hover:bg-white/10"
			>
				<tool.icon class="size-4 fill-none stroke-current" />
				<span class="ps-2">{tool.title}</span>
			</a>
		</li>
	{/each}
</ul>
