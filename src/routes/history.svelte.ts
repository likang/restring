import { browser } from '$app/environment';

const historyStr = browser ? localStorage.getItem('restring_history') : null;
export const history = $state<string[]>(historyStr ? JSON.parse(historyStr) : []);

export function addHistory(text: string) {
	if (text.length === 0) {
		return;
	}
	if (history.length > 0 && history[0] === text) {
		return;
	}
	const index = history.indexOf(text);
	if (index !== -1) {
		history.splice(index, 1);
	}
	history.unshift(text);
	if (history.length > 10) {
		history.pop();
	}
	localStorage.setItem('restring_history', JSON.stringify(history));
}
