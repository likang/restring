<script lang="ts">
	import Datetime from './Datetime.svelte';
	import { states } from './state.svelte';
	import { onDestroy } from 'svelte';
	import { afterNavigate } from '$app/navigation';

	let intervalId: number | undefined = undefined;

	function onInput(event: Event) {
		if (states.inputTrimmed.length === 0) {
			states.date = undefined;
		} else {
			let date = new Date(states.inputTrimmed);

			if (isNaN(date.getTime())) {
				const numInput = Number(states.inputTrimmed);
				if (!isNaN(numInput)) {
					if (numInput >= 9999999999) {
						date = new Date(numInput);
					} else {
						date = new Date(numInput * 1000);
					}
				}
			}
			states.date = isNaN(date.getTime()) ? undefined : date;
		}
		clearNowInterval();
	}

	function onClickNow() {
		clearNowInterval();

		states.setNow();

		intervalId = setInterval(() => {
			states.setNow();
		}, 1000);
	}

	function clearNowInterval() {
		if (intervalId) {
			clearInterval(intervalId);
			intervalId = undefined;
		}
	}

	afterNavigate(() => {
		onClickNow();
	});

	onDestroy(() => {
		clearNowInterval();
	});
</script>

<svelte:head>
	<title>restring - Date &amp; Time Converter</title>
	<meta
		name="description"
		content="Convert between Unix epoch, ISO 8601, UTC, email/RSS, and HTTP header date/time formats online."
	/>
	<meta
		name="keywords"
		content="datetime, date converter, time converter, ISO 8601, UTC, timezone, Unix epoch, timestamp, email date, RSS date, http header date, date online tool, restring"
	/>
</svelte:head>

<div class="m-auto max-w-2xl px-6 pt-6">
	<div class="mb-6 flex flex-row gap-2">
		<input
			type="text"
			class="input flex-1"
			bind:value={states.inputText}
			oninput={onInput}
			aria-invalid={states.inputError}
			placeholder="Datetime string"
		/>

		<button class="btn-outline" onclick={onClickNow}>Now</button>
	</div>
	<Datetime />
</div>
