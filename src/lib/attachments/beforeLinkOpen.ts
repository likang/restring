import type { Attachment } from 'svelte/attachments';

export function beforeLinkOpen(callback: (element: Element) => void): Attachment {
	return (element) => {
		const handleClick = (event: Event) => {
			callback(element);
		};

		const handleKeydown = (event: Event) => {
			if ((event as KeyboardEvent).key === 'Enter') {
				callback(element);
			}
		};

		element.addEventListener('click', handleClick);
		element.addEventListener('keydown', handleKeydown);

		return () => {
			element.removeEventListener('click', handleClick);
			element.removeEventListener('keydown', handleKeydown);
		};
	};
}
