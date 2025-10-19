import type { Component } from 'svelte';

export type Tool<T> = {
	name: string;
	icon: Component;
	path: string;
	preview: Component;
	guess(input: string): T | undefined;
};

export type Preview = {
	name: string;
	component: Component;
	value: any;
};
