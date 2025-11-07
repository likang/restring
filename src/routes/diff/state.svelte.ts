import { diffChars, diffWords, diffLines, diffJson } from 'diff';
import type { ChangeObject } from 'diff';

export const diffModes = ['Chars', 'Words', 'Lines', 'JSON'] as const;

class States {
	originalText: string = $state('');
	modifiedText: string = $state('');
	diffMode: (typeof diffModes)[number] = $state('Chars');

	diffResult: ChangeObject<string>[] = $derived.by(() => {
		switch (this.diffMode) {
			case 'Chars':
				return diffChars(this.originalText, this.modifiedText);
			case 'Words':
				return diffWords(this.originalText, this.modifiedText);
			case 'Lines':
				return diffLines(this.originalText, this.modifiedText);
			case 'JSON':
				return diffJson(this.originalText, this.modifiedText);
		}
		return [];
	});

	addedCount: number = $derived.by(() => {
		return this.diffResult.filter((diff) => diff.added).length;
	});

	removedCount: number = $derived.by(() => {
		return this.diffResult.filter((diff) => diff.removed).length;
	});
}

export const states = new States();
