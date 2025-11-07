<script lang="ts">
	import { states } from './state.svelte';
	import CopyButton from '$lib/components/CopyButton.svelte';
	import DownIcon from '@lucide/svelte/icons/chevron-down';
	import { afterNavigate } from '$app/navigation';

	let txtInput: HTMLTextAreaElement;
	let encodedInput: HTMLTextAreaElement;
	const vPopoverId = 'encoding-type-v-popover';

	const typeOptions: Map<typeof states.type, string> = new Map([
		['uri', 'As URI'],
		['uri-component', 'As URI Component']
	]);

	function onTxtInput(event: Event) {
		const txt = (event.target as HTMLTextAreaElement).value;
		states.from = 'txt';
		let encoded: string | undefined;
		try {
			if (states.type === 'uri') {
				encoded = encodeURI(txt);
			} else {
				encoded = encodeURIComponent(txt);
			}
		} catch {
			encoded = undefined;
		}
		if (encoded === undefined) {
			states.txtError = true;
			return;
		}

		states.encoded = encoded;
		states.encodedError = false;
	}

	function onEncodedInput(event: Event) {
		const encoded = (event.target as HTMLTextAreaElement).value;
		states.from = 'encoded';
		let txt: string | undefined;
		try {
			if (states.type === 'uri') {
				txt = decodeURI(encoded);
			} else {
				txt = decodeURIComponent(encoded);
			}
		} catch {
			txt = undefined;
		}
		if (txt === undefined) {
			states.encodedError = true;
			return;
		}
		states.encodedError = false;
		states.txt = txt;
		states.txtError = false;
	}

	function onTypeChange() {
		const event = new Event('input', {
			bubbles: true
		});

		if (states.from === 'txt') {
			txtInput.dispatchEvent(event);
		} else {
			encodedInput.dispatchEvent(event);
		}
	}

	afterNavigate(() => {
		if (states.txt.length > 0 || states.encoded.length > 0) {
			if (states.from === 'txt') {
				txtInput.focus();
			} else {
				encodedInput.focus();
			}
		}
	});
</script>

<div class="mb-6">
	<div class="flex items-center py-1">
		<h2 class="text-lg font-semibold">Text</h2>
		<div class="flex-1"></div>
		<CopyButton text={() => states.txt} />
	</div>
	<textarea
		bind:this={txtInput}
		bind:value={states.txt}
		aria-invalid={states.txtError}
		oninput={onTxtInput}
		placeholder=""
		class="textarea h-32"
	></textarea>

	<div class="flex items-center py-1">
		<h2 class="text-lg font-semibold">URL Encoded</h2>

		<div class="flex-1"></div>

		<div id={vPopoverId} class="dropdown-menu">
			<button
				type="button"
				id={vPopoverId + '-trigger'}
				aria-haspopup="menu"
				aria-controls={vPopoverId + '-menu'}
				aria-expanded="false"
				class="btn-ghost"
			>
				{typeOptions.get(states.type)}
				<DownIcon class="text-muted-foreground" />
			</button>
			<div
				id={vPopoverId + '-popover'}
				data-popover
				data-align="end"
				aria-hidden="true"
				class="min-w-16"
			>
				<div role="menu" id={vPopoverId + '-menu'} aria-labelledby={vPopoverId + '-trigger'}>
					{#each typeOptions as [t, name]}
						{#if t !== states.type}
							<button
								role="menuitem"
								onclick={() => {
									states.type = t;
									onTypeChange();
								}}>{name}</button
							>
						{/if}
					{/each}
				</div>
			</div>
		</div>

		<CopyButton text={() => states.encoded} />
	</div>
	<textarea
		bind:this={encodedInput}
		bind:value={states.encoded}
		aria-invalid={states.encodedError}
		oninput={onEncodedInput}
		placeholder=""
		class="textarea h-32"
	></textarea>
</div>
