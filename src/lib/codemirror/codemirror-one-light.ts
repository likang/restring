import { EditorView } from '@codemirror/view';
import type { Extension } from '@codemirror/state';
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { tags as t } from '@lezer/highlight';

// Using https://github.com/shikijs/textmate-grammars-themes/blob/main/packages/tm-themes/themes/one-light.json as reference for the colors

const chalky = '#C18401', //entity.name.class & entity.name.type
	coral = '#E45649', // variable markup.heading
	cyan = '#0184BC', // support.function  & constant.other.symbol
	invalid = '#000000',
	ivory = '#383A42', // editor.foreground
	stone = '#a0a1a7', // Brightened compared to original to increase contrast.  comment & punctuation.definition.comment
	malibu = '#4078F2', //entity.name.function
	sage = '#50A14F', // string
	whiskey = '#986801', // constant & constant.numeric
	violet = '#A626A4', // keyword.operator.word
	darkBackground = '#eaeaeb', //editorWidget.background
	highlightBackground = '#dbdbdc', // activeSelectionBackground
	background = '#fafafa', // editor.background
	tooltipBackground = '#eaeaeb', // editorHoverWidget.background
	selection = '#e5e5e6', // editor.selectionBackground ? not sure
	cursor = '#526fff'; // editorCursor.foreground

/// The colors used in the theme, as CSS color strings.
export const color = {
	chalky,
	coral,
	cyan,
	invalid,
	ivory,
	stone,
	malibu,
	sage,
	whiskey,
	violet,
	darkBackground,
	highlightBackground,
	background,
	tooltipBackground,
	selection,
	cursor
};

/// The editor theme styles for One Light.
export const oneLightTheme = EditorView.theme(
	{
		'&': {
			color: ivory,
			backgroundColor: background
		},
		'&.cm-focused': {
			outline: 'none'
		},
		'.cm-content': {
			caretColor: cursor
		},

		'.cm-cursor, .cm-dropCursor': { borderLeftColor: cursor },
		'&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection':
			{ backgroundColor: selection },

		'.cm-panels': {
			backgroundColor: darkBackground,
			border: 'none',
			color: ivory,
			boxShadow: '0 0 8px 2px rgba(0, 0, 0, 0.16)'
		},

		'.cm-searchMatch': {
			backgroundColor: '#72a1ff59'
		},
		'.cm-searchMatch.cm-searchMatch-selected': {
			backgroundColor: '#526FFF33',
			outline: '1px solid #457dff'
		},

		'.cm-activeLine': { backgroundColor: '#383A420C' },
		'.cm-selectionMatch': { backgroundColor: '#c4fcb180' },

		'&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket': {
			backgroundColor: '#bad0f847'
		},

		'.cm-gutters': {
			backgroundColor: background,
			color: '#9D9D9F',
			border: 'none'
		},

		'.cm-activeLineGutter': {
			backgroundColor: 'transparent'
		},
		'&.cm-focused .cm-activeLineGutter': {
			color: '#383A42'
		},

		'.cm-foldPlaceholder': {
			backgroundColor: 'transparent',
			border: 'none',
			color: ivory
		},

		'.cm-tooltip': {
			border: 'none',
			backgroundColor: tooltipBackground
		},
		'.cm-tooltip .cm-tooltip-arrow:before': {
			borderTopColor: 'transparent',
			borderBottomColor: 'transparent'
		},
		'.cm-tooltip .cm-tooltip-arrow:after': {
			borderTopColor: tooltipBackground,
			borderBottomColor: tooltipBackground
		},
		'.cm-tooltip-autocomplete': {
			'& > ul > li[aria-selected]': {
				backgroundColor: highlightBackground,
				color: ivory
			}
		}
	},
	{ dark: false }
);

/// The highlighting style for code in the One Light theme.
export const oneLightHighlightStyle = HighlightStyle.define([
	{ tag: t.keyword, color: violet },
	{ tag: [t.name, t.deleted, t.character, t.propertyName, t.macroName], color: coral },
	{ tag: [t.function(t.variableName), t.labelName], color: malibu },
	{ tag: [t.color, t.constant(t.name), t.standard(t.name)], color: whiskey },
	{ tag: [t.definition(t.name), t.separator], color: ivory },
	{
		tag: [
			t.typeName,
			t.className,
			t.number,
			t.changed,
			t.annotation,
			t.modifier,
			t.self,
			t.namespace
		],
		color: chalky
	},
	{
		tag: [t.operator, t.operatorKeyword, t.url, t.escape, t.regexp, t.link, t.special(t.string)],
		color: cyan
	},
	{ tag: [t.meta, t.comment], color: stone },
	{ tag: t.strong, fontWeight: 'bold' },
	{ tag: t.emphasis, fontStyle: 'italic' },
	{ tag: t.strikethrough, textDecoration: 'line-through' },
	{ tag: t.link, color: stone, textDecoration: 'underline' },
	{ tag: t.heading, fontWeight: 'bold', color: coral },
	{ tag: [t.atom, t.bool, t.special(t.variableName)], color: whiskey },
	{ tag: [t.processingInstruction, t.string, t.inserted], color: sage },
	{ tag: t.invalid, color: invalid }
]);

/// Extension to enable the One Light theme (both the editor theme and
/// the highlight style).
export const oneLight: Extension = [oneLightTheme, syntaxHighlighting(oneLightHighlightStyle)];
