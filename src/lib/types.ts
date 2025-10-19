import type { Component } from 'svelte';

export type Tool<T> = {
	name: string;
	icon: Component;
	path: string;
	preview: Component;
	guess(input: string): T | undefined;
};

export type Preview<T> = {
	tool: Tool<T>;
	value: T;
};

export function isPreviewForTool<T>(
	preview: Preview<any> | undefined,
	tool: Tool<T>
): preview is Preview<T> {
	return preview?.tool === tool;
}
