import type { Component } from 'svelte';

export type PreviewConfig = {
	name: string;
	component: Component;
	parse(input: string): any;
};

export type Preview = {
	name: string;
	component: Component;
	value: any;
};
