import type { Component } from 'svelte';

export type Tool = {
	name: string;
	icon: Component;
	path: string;
	preview: Component;
	guess(input: string): any;
};

export type Preview = {
	name: string;
	component: Component;
	value: any;
};
