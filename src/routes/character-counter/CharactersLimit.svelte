<script lang="ts">
	import { states } from './state.svelte';
	import { tick } from 'svelte';

	let editing = $state(false);
	let invalid = $state(false);
	let element: HTMLSpanElement;

	function onClick(event: Event) {
		if (editing) {
			return;
		}
		editing = true;
		invalid = false;

		if (states.charsLimit <= 0) {
			element.textContent = '0';
		}

		tick().then(() => {
			element.focus();
			try {
				const range = document.createRange();
				range.selectNodeContents(element);

				const selection = window.getSelection();
				selection?.removeAllRanges();
				selection?.addRange(range);
			} catch (e) {}
		});
	}

	function onKeyDown(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			event.preventDefault();
			event.stopPropagation();
			if (editing) {
				endEdit();
			} else {
				element.click();
			}
		} else if (event.key === 'Escape') {
			element.textContent = states.charsLimit <= 0 ? '∞' : `${states.charsLimit}`;
			element.blur();
		}
	}

	function onInput(event: Event) {
		const txt = element.textContent.trim();
		const limit = Number(txt);
		invalid = isNaN(limit) || limit < 0;
	}

	function endEdit() {
		if (!editing) {
			return;
		}
		editing = false;
		const txt = element.textContent.trim();
		const limit = Number(txt);
		if (isNaN(limit) || limit < 0) {
			invalid = true;
		} else {
			invalid = false;
			states.charsLimit = limit;
		}
		element.textContent = states.charsLimit <= 0 ? '∞' : `${states.charsLimit}`;
	}
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<span
	bind:this={element}
	class="hover:bg-muted rounded-sm px-2 py-1"
	contenteditable={editing}
	class:cursor-pointer={!editing}
	class:outline-2={editing}
	class:outline-red-500={invalid && editing}
	title="Click to edit character limit."
	role="textbox"
	tabindex="0"
	onblur={endEdit}
	onkeydown={onKeyDown}
	oninput={onInput}
	onclick={onClick}>{states.charsLimit > 0 ? states.charsLimit : '∞'}</span
>
