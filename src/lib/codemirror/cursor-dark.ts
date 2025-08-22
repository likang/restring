import { EditorView } from '@codemirror/view';
import type { Extension } from '@codemirror/state';
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { tags as t } from '@lezer/highlight';

// Using https://github.com/one-dark/vscode-one-dark-theme/ as reference for the colors

const chalky = '#e5c07b',
	coral = '#e06c75',
	cyan = '#56b6c2',
	invalid = '#ffffff',
	ivory = '#abb2bf',
	stone = '#7d8799', // Brightened compared to original to increase contrast
	malibu = '#61afef',
	sage = '#98c379',
	whiskey = '#d19a66',
	violet = '#c678dd',
	background = '#1a1a1a', // cursor dark
	selection = '#3E4451',
	cursor = '#ffffff'; // cursor dark

const mtk1 = '#d4d4d4',
	mtk2 = '#1a1a1a',
	mtk3 = '#a8cc7c',
	mtk4 = '#6a9955',
	mtk5 = '#d6d6dd',
	mtk6 = '#d1d1d1',
	mtk7 = '#83d6c5',
	mtk8 = '#898989',
	mtk9 = '#f8c762',
	mtk10 = '#efb080',
	mtk11 = '#aaa0fa',
	mtk12 = '#aa9bf5',
	mtk13 = '#808080',
	mtk14 = 'rgba(255, 255, 255, 0.36)',
	mtk15 = '#94c1fa',
	mtk16 = '#4ec9b0',
	mtk17 = '#c1808a',
	mtk18 = '#87c3ff',
	mtk19 = '#fad075',
	mtk20 = '#af9cff',
	mtk21 = '#f44747',
	mtk22 = '#e3c893',
	mtk23 = '#efefef',
	mtk24 = '#cc7c8a';
const bracketHighlight0 = '#ffd700';

/// The editor theme styles for One Dark.
export const oneDarkTheme = EditorView.theme(
	{
		'&': {
			color: mtk16,
			backgroundColor: background
		},

		'.cm-content': {
			caretColor: cursor
		},

		'.cm-cursor, .cm-dropCursor': {
			borderLeftColor: cursor,
			borderLeftWidth: '2px'
		},
		'&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection':
			{ backgroundColor: selection },

		'.cm-searchMatch': {
			backgroundColor: '#72a1ff59',
			outline: '1px solid #457dff'
		},
		'.cm-searchMatch.cm-searchMatch-selected': {
			backgroundColor: '#6199ff2f'
		},

		'.cm-activeLine': { backgroundColor: '#6699ff0b' },
		'.cm-selectionMatch': { backgroundColor: '#aafe661a' },

		'&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket': {
			backgroundColor: '#bad0f847'
		},

		'.cm-gutters': {
			backgroundColor: background,
			color: '#505050',
			border: 'none'
		},

		'.cm-activeLineGutter': {
			color: '#ffffff'
		},
		'.cm-gutterElement > span': {
			// folding controls
			color: '#c5c5c5'
		},

		'.cm-foldPlaceholder': {
			backgroundColor: 'transparent',
			border: 'none',
			color: '#ddd'
		}
	},
	{ dark: true }
);

/// The highlighting style for code in the One Dark theme.
export const oneDarkHighlightStyle = HighlightStyle.define([
	{ tag: t.keyword, color: violet, class: 'cm-keyword' },
	{
		tag: [t.name, t.deleted, t.character, t.propertyName, t.macroName],
		class: 'cm-name'
	},
	{ tag: [t.function(t.variableName), t.labelName], color: malibu, class: 'cm-function' },
	{ tag: [t.color, t.constant(t.name), t.standard(t.name)], color: whiskey, class: 'cm-constant' },
	{ tag: [t.definition(t.name), t.separator], color: ivory, class: 'cm-definition' },
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
		color: chalky,
		class: 'cm-type'
	},
	{
		tag: [t.operator, t.operatorKeyword, t.url, t.escape, t.regexp, t.link, t.special(t.string)],
		color: cyan,
		class: 'cm-operator'
	},
	{ tag: [t.meta, t.comment], color: stone, class: 'cm-comment' },
	{ tag: t.strong, fontWeight: 'bold', class: 'cm-strong' },
	{ tag: t.emphasis, fontStyle: 'italic', class: 'cm-emphasis' },
	{ tag: t.strikethrough, textDecoration: 'line-through', class: 'cm-strikethrough' },
	{ tag: t.link, color: stone, textDecoration: 'underline', class: 'cm-link' },
	{ tag: t.heading, fontWeight: 'bold', color: coral, class: 'cm-heading' },
	{ tag: [t.atom, t.bool, t.special(t.variableName)], color: whiskey, class: 'cm-atom' },
	{ tag: [t.processingInstruction, t.string, t.inserted], color: sage, class: 'cm-string' },
	{ tag: t.invalid, color: invalid, class: 'cm-invalid' }
]);

export const oneDarkHighlightStyle2 = HighlightStyle.define([
	{ tag: t.comment, class: 'cm-comment' },
	{ tag: t.lineComment, class: 'cm-lineComment' },
	{ tag: t.blockComment, class: 'cm-blockComment' },
	{ tag: t.docComment, class: 'cm-docComment' },
	{ tag: t.name, class: 'cm-name' },
	{ tag: t.variableName, class: 'cm-variableName' },
	{ tag: t.typeName, class: 'cm-typeName' },
	{ tag: t.tagName, class: 'cm-tagName' },
	{ tag: t.propertyName, color: '#fa9bfa' },
	{ tag: t.attributeName, class: 'cm-attributeName' },
	{ tag: t.className, class: 'cm-className' },
	{ tag: t.labelName, class: 'cm-labelName' },
	{ tag: t.namespace, class: 'cm-namespace' },
	{ tag: t.macroName, class: 'cm-macroName' },
	{ tag: t.literal, class: 'cm-literal' },
	{ tag: t.string, color: '#73dc8c' },
	{ tag: t.special(t.string), color: 'red' },
	{ tag: t.docString, class: 'cm-docString' },
	{ tag: t.character, class: 'cm-character' },
	{ tag: t.attributeValue, class: 'cm-attributeValue' },
	{ tag: t.number, class: 'cm-number' },
	{ tag: t.integer, class: 'cm-integer' },
	{ tag: t.float, class: 'cm-float' },
	{ tag: t.bool, color: mtk1 },
	{ tag: t.regexp, class: 'cm-regexp' },
	{ tag: t.escape, class: 'cm-escape' },
	{ tag: t.color, class: 'cm-color' },
	{ tag: t.url, class: 'cm-url' },
	{ tag: t.keyword, class: 'cm-keyword' },
	{ tag: t.self, class: 'cm-self' },
	{ tag: t.null, class: 'cm-null' },
	{ tag: t.atom, class: 'cm-atom' },
	{ tag: t.unit, class: 'cm-unit' },
	{ tag: t.modifier, class: 'cm-modifier' },
	{ tag: t.operatorKeyword, class: 'cm-operatorKeyword' },
	{ tag: t.controlKeyword, class: 'cm-controlKeyword' },
	{ tag: t.definitionKeyword, class: 'cm-definitionKeyword' },
	{ tag: t.moduleKeyword, class: 'cm-moduleKeyword' },
	{ tag: t.operator, class: 'cm-operator' },
	{ tag: t.derefOperator, class: 'cm-derefOperator' },
	{ tag: t.arithmeticOperator, class: 'cm-arithmeticOperator' },
	{ tag: t.logicOperator, class: 'cm-logicOperator' },
	{ tag: t.bitwiseOperator, class: 'cm-bitwiseOperator' },
	{ tag: t.compareOperator, class: 'cm-compareOperator' },
	{ tag: t.updateOperator, class: 'cm-updateOperator' },
	{ tag: t.definitionOperator, class: 'cm-definitionOperator' },
	{ tag: t.typeOperator, class: 'cm-typeOperator' },
	{ tag: t.controlOperator, class: 'cm-controlOperator' },
	{ tag: t.punctuation, class: 'cm-punctuation' },
	{ tag: t.separator, color: mtk1 },
	{ tag: t.bracket, class: 'cm-bracket' },
	{ tag: t.angleBracket, class: 'cm-angleBracket' },
	{ tag: t.squareBracket, class: 'cm-squareBracket' },
	{ tag: t.paren, class: 'cm-paren' },
	{ tag: t.brace, color: '#da70d6' },
	{ tag: t.content, class: 'cm-content' },
	{ tag: t.heading, class: 'cm-heading' },
	{ tag: t.heading1, class: 'cm-heading1' },
	{ tag: t.heading2, class: 'cm-heading2' },
	{ tag: t.heading3, class: 'cm-heading3' },
	{ tag: t.heading4, class: 'cm-heading4' },
	{ tag: t.heading5, class: 'cm-heading5' },
	{ tag: t.heading6, class: 'cm-heading6' },
	{ tag: t.contentSeparator, class: 'cm-contentSeparator' },
	{ tag: t.list, class: 'cm-list' },
	{ tag: t.quote, class: 'cm-quote' },
	{ tag: t.emphasis, class: 'cm-emphasis' },
	{ tag: t.strong, class: 'cm-strong' },
	{ tag: t.link, class: 'cm-link' },
	{ tag: t.monospace, class: 'cm-monospace' },
	{ tag: t.strikethrough, class: 'cm-strikethrough' },
	{ tag: t.inserted, class: 'cm-inserted' },
	{ tag: t.deleted, class: 'cm-deleted' },
	{ tag: t.changed, class: 'cm-changed' },
	{ tag: t.invalid, class: 'cm-invalid' },
	{ tag: t.meta, class: 'cm-meta' },
	{ tag: t.documentMeta, class: 'cm-documentMeta' },
	{ tag: t.annotation, class: 'cm-annotation' },
	{ tag: t.processingInstruction, class: 'cm-processingInstruction' }
]);

/// Extension to enable the One Dark theme (both the editor theme and
/// the highlight style).
export const cursorDarkJson: Extension = [oneDarkTheme, syntaxHighlighting(oneDarkHighlightStyle2)];
