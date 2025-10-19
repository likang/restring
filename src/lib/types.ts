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
