export type DescriptionItem = {
	label: string;
	value?: string;
};

export type JsonPreview = { type: 'json'; value: string };
export type TextPreview = { type: 'text'; value: string };
export type DescriptionPreview = { type: 'description'; value: DescriptionItem[] };
export type ImagePreview = { type: 'image'; value: string };

// Define discriminated union type for previews
export type Preview = JsonPreview | TextPreview | DescriptionPreview | ImagePreview;

export interface IParse {
	(input: string): Preview | null;
}
