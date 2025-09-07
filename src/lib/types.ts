import type { Colord } from 'colord';

export type DescriptionItem = {
	label: string;
	value?: string;
};

export type JsonPreview = { type: 'json'; value: any; raw: string };
export type TextPreview = { type: 'text'; value: string };
export type DescriptionPreview = { type: 'description'; value: DescriptionItem[] };
export type ImagePreview = { type: 'image'; value: string };
export type ColorPreview = { type: 'color'; value: Colord };

// Define discriminated union type for previews
export type Preview = JsonPreview | TextPreview | DescriptionPreview | ImagePreview | ColorPreview;

export interface IParse {
	(input: string): Preview | null;
}
