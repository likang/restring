const MAX_HISTORY_LENGTH = 10;
const HISTORY_KEY = 'history';

export function getHistory(key: string = HISTORY_KEY) {
	const historyStr = localStorage.getItem(key);
	return historyStr ? JSON.parse(historyStr) : [];
}

export function unshiftHistory(text: string, key: string = HISTORY_KEY) {
	if (text.length === 0) {
		return;
	}

	const history = getHistory(key);

	if (history.length > 0 && history[0] === text) {
		return;
	}
	const index = history.indexOf(text);
	if (index !== -1) {
		history.splice(index, 1);
	}
	history.unshift(text);
	while (history.length > MAX_HISTORY_LENGTH) {
		history.pop();
	}
	localStorage.setItem(key, JSON.stringify(history));
}
