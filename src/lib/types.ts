import type { Component } from 'svelte';

export type ToolConfig = {
	name: string;
	icon: Component;
	path: string;
	component: Component;
	parse(input: string): any;
};

export type Preview = {
	name: string;
	component: Component;
	value: any;
};
