import type { Attachment } from 'svelte/attachments';

export function clickOutside(callback: (element: Element) => void): Attachment {
	return (element) => {
		const handleClick = (event: MouseEvent) => {
			if (element && !element.contains(event.target as Node) && !event.defaultPrevented) {
				callback(element);
			}
		};
		document.addEventListener('click', handleClick, true);

		return () => {
			document.removeEventListener('click', handleClick, true);
		};
	};
}

export const clickOutsideDropdown = clickOutside((element) => {
	element.removeAttribute('open');
});
