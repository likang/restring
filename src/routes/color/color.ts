import type { IParse } from '$lib/types';

export const guessColor: IParse = (input) => {
	try {
		const color = new Color(input);
		return {
			type: 'description',
			value: [
				{ label: 'Hex', value: color.toHex(true) },
				{ label: 'Rgb', value: color.toRgb() },
				{ label: 'Hsl', value: color.toHsl() },
				{ label: 'Hwb', value: color.toHwb() },
				{ label: 'Lch', value: color.toLch() },
				{ label: 'Cmyk', value: color.toCmyk() }
			]
		};
	} catch {
		return null;
	}
};

/**
 * Color class that supports parsing and formatting various color formats
 */
class Color {
	// RGB components (0-255)
	private r: number = 0;
	private g: number = 0;
	private b: number = 0;
	// Alpha component (0-1)
	private a: number = 1;
	// Original color format
	private originalFormat: ColorFormat = ColorFormat.RGB;
	// Original color values (specific to format)
	private originalValues: Record<string, number> = {};

	/**
	 * Create a new Color instance
	 * @param color Color string in any supported format
	 */
	constructor(color?: string) {
		if (color) {
			this.parse(color);
		}
	}

	/**
	 * Parse a color string into this Color instance
	 * @param color Color string in any supported format
	 */
	public parse(color: string): Color {
		const trimmed = color.trim();

		// Try each format parser
		if (this.parseHex(trimmed)) return this;
		if (this.parseRgb(trimmed)) return this;
		if (this.parseHsl(trimmed)) return this;
		if (this.parseHwb(trimmed)) return this;
		if (this.parseLch(trimmed)) return this;
		if (this.parseCmyk(trimmed)) return this;

		throw new Error(`Unsupported color format: ${color}`);
	}

	/**
	 * Parse a hex color string (#RGB, #RGBA, #RRGGBB, #RRGGBBAA)
	 */
	private parseHex(color: string): boolean {
		const hexRegex = /^#([A-Fa-f0-9]{3,4}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$/;
		if (!hexRegex.test(color)) return false;

		// Remove # prefix
		let hex = color.substring(1);

		// Convert shorthand hex to full form
		if (hex.length === 3 || hex.length === 4) {
			let expanded = '';
			for (let i = 0; i < hex.length; i++) {
				expanded += hex[i] + hex[i];
			}
			hex = expanded;
		}

		// Extract RGB components
		this.r = parseInt(hex.substring(0, 2), 16);
		this.g = parseInt(hex.substring(2, 4), 16);
		this.b = parseInt(hex.substring(4, 6), 16);

		// Extract alpha if present
		if (hex.length === 8) {
			this.a = parseInt(hex.substring(6, 8), 16) / 255;
		} else {
			this.a = 1;
		}

		this.originalFormat = ColorFormat.HEX;
		this.originalValues = { r: this.r, g: this.g, b: this.b, a: this.a };
		return true;
	}

	/**
	 * Parse RGB/RGBA color string
	 */
	private parseRgb(color: string): boolean {
		// Match both rgb() and rgba() formats with flexible whitespace
		const rgbRegex =
			/^rgba?\s*\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\s*(?:,\s*(\d*(?:\.\d+)?))?\s*\)$/i;
		const match = color.match(rgbRegex);

		if (!match) return false;

		this.r = Math.min(255, Math.max(0, parseFloat(match[1])));
		this.g = Math.min(255, Math.max(0, parseFloat(match[2])));
		this.b = Math.min(255, Math.max(0, parseFloat(match[3])));
		this.a = match[4] !== undefined ? Math.min(1, Math.max(0, parseFloat(match[4]))) : 1;

		this.originalFormat = ColorFormat.RGB;
		this.originalValues = { r: this.r, g: this.g, b: this.b, a: this.a };
		return true;
	}

	/**
	 * Parse HSL/HSLA color string
	 */
	private parseHsl(color: string): boolean {
		const hslRegex =
			/^hsla?\s*\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)%\s*,\s*(\d+(?:\.\d+)?)%\s*(?:,\s*(\d*(?:\.\d+)?))?\s*\)$/i;
		const match = color.match(hslRegex);

		if (!match) return false;

		const h = parseFloat(match[1]) % 360;
		const s = Math.min(100, Math.max(0, parseFloat(match[2]))) / 100;
		const l = Math.min(100, Math.max(0, parseFloat(match[3]))) / 100;
		this.a = match[4] !== undefined ? Math.min(1, Math.max(0, parseFloat(match[4]))) : 1;

		// Store original HSL values
		this.originalFormat = ColorFormat.HSL;
		this.originalValues = { h, s, l, a: this.a };

		// Convert HSL to RGB
		this.hslToRgb(h, s, l);
		return true;
	}

	/**
	 * Parse HWB color string
	 */
	private parseHwb(color: string): boolean {
		const hwbRegex =
			/^hwb\s*\(\s*(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)%\s+(\d+(?:\.\d+)?)%\s*(?:\/\s*(\d*(?:\.\d+)?))?\s*\)$/i;
		const match = color.match(hwbRegex);

		if (!match) return false;

		const h = parseFloat(match[1]) % 360;
		const w = Math.min(100, Math.max(0, parseFloat(match[2]))) / 100;
		const b = Math.min(100, Math.max(0, parseFloat(match[3]))) / 100;
		this.a = match[4] !== undefined ? Math.min(1, Math.max(0, parseFloat(match[4]))) : 1;

		// Store original HWB values
		this.originalFormat = ColorFormat.HWB;
		this.originalValues = { h, w, b, a: this.a };

		// Convert HWB to RGB
		this.hwbToRgb(h, w, b);
		return true;
	}

	/**
	 * Parse LCH color string
	 */
	private parseLch(color: string): boolean {
		const lchRegex =
			/^lch\s*\(\s*(\d+(?:\.\d+)?)%\s+(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)\s*(?:\/\s*(\d*(?:\.\d+)?))?\s*\)$/i;
		const match = color.match(lchRegex);

		if (!match) return false;

		const l = (Math.min(100, Math.max(0, parseFloat(match[1]))) / 100) * 100;
		const c = parseFloat(match[2]);
		const h = parseFloat(match[3]);
		this.a = match[4] !== undefined ? Math.min(1, Math.max(0, parseFloat(match[4]))) : 1;

		// Store original LCH values
		this.originalFormat = ColorFormat.LCH;
		this.originalValues = { l, c, h, a: this.a };

		// Convert LCH to RGB (simplified approximation)
		this.lchToRgb(l, c, h);
		return true;
	}

	/**
	 * Parse CMYK color string
	 */
	private parseCmyk(color: string): boolean {
		const cmykRegex =
			/^device-cmyk\s*\(\s*(\d+(?:\.\d+)?)%\s*,\s*(\d+(?:\.\d+)?)%\s*,\s*(\d+(?:\.\d+)?)%\s*,\s*(\d+(?:\.\d+)?)%\s*(?:,\s*(\d*(?:\.\d+)?))?\s*\)$/i;
		const match = color.match(cmykRegex);

		if (!match) return false;

		const c = Math.min(100, Math.max(0, parseFloat(match[1]))) / 100;
		const m = Math.min(100, Math.max(0, parseFloat(match[2]))) / 100;
		const y = Math.min(100, Math.max(0, parseFloat(match[3]))) / 100;
		const k = Math.min(100, Math.max(0, parseFloat(match[4]))) / 100;
		this.a = match[5] !== undefined ? Math.min(1, Math.max(0, parseFloat(match[5]))) : 1;

		// Store original CMYK values
		this.originalFormat = ColorFormat.CMYK;
		this.originalValues = { c, m, y, k, a: this.a };

		// Convert CMYK to RGB
		this.cmykToRgb(c, m, y, k);
		return true;
	}

	/**
	 * Convert HSL to RGB
	 */
	private hslToRgb(h: number, s: number, l: number): void {
		if (s === 0) {
			// Achromatic (gray)
			this.r = this.g = this.b = Math.round(l * 255);
			return;
		}

		const hue2rgb = (p: number, q: number, t: number): number => {
			if (t < 0) t += 1;
			if (t > 1) t -= 1;
			if (t < 1 / 6) return p + (q - p) * 6 * t;
			if (t < 1 / 2) return q;
			if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
			return p;
		};

		const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
		const p = 2 * l - q;

		this.r = Math.round(hue2rgb(p, q, h / 360 + 1 / 3) * 255);
		this.g = Math.round(hue2rgb(p, q, h / 360) * 255);
		this.b = Math.round(hue2rgb(p, q, h / 360 - 1 / 3) * 255);
	}

	/**
	 * Convert HWB to RGB
	 */
	private hwbToRgb(h: number, w: number, b: number): void {
		// First convert HWB to HSV
		const v = 1 - b;
		const s = v === 0 ? 0 : 1 - w / v;

		// Then convert HSV to RGB
		const i = Math.floor(h / 60);
		const f = h / 60 - i;
		const p = v * (1 - s);
		const q = v * (1 - s * f);
		const t = v * (1 - s * (1 - f));

		let r = 0,
			g = 0,
			b_val = 0;

		switch (i % 6) {
			case 0:
				r = v;
				g = t;
				b_val = p;
				break;
			case 1:
				r = q;
				g = v;
				b_val = p;
				break;
			case 2:
				r = p;
				g = v;
				b_val = t;
				break;
			case 3:
				r = p;
				g = q;
				b_val = v;
				break;
			case 4:
				r = t;
				g = p;
				b_val = v;
				break;
			case 5:
				r = v;
				g = p;
				b_val = q;
				break;
		}

		this.r = Math.round(r * 255);
		this.g = Math.round(g * 255);
		this.b = Math.round(b_val * 255);
	}

	/**
	 * Convert LCH to RGB (simplified approximation)
	 * Note: Accurate LCH to RGB conversion requires a full color space transformation
	 * This is a simplified approximation
	 */
	private lchToRgb(l: number, c: number, h: number): void {
		// For simplicity, we'll convert LCH to HSL (approximation)
		// This is not accurate but gives a reasonable approximation
		const hue = h;
		const saturation = Math.min(1, c / 100);
		const lightness = l / 100;

		// Convert approximated HSL to RGB
		this.hslToRgb(hue, saturation, lightness);
	}

	/**
	 * Convert CMYK to RGB
	 */
	private cmykToRgb(c: number, m: number, y: number, k: number): void {
		const r = Math.round(255 * (1 - c) * (1 - k));
		const g = Math.round(255 * (1 - m) * (1 - k));
		const b = Math.round(255 * (1 - y) * (1 - k));

		this.r = r;
		this.g = g;
		this.b = b;
	}

	/**
	 * Convert RGB to HSL
	 */
	private rgbToHsl(): { h: number; s: number; l: number } {
		const r = this.r / 255;
		const g = this.g / 255;
		const b = this.b / 255;

		const max = Math.max(r, g, b);
		const min = Math.min(r, g, b);
		let h = 0;
		let s = 0;
		const l = (max + min) / 2;

		if (max !== min) {
			const d = max - min;
			s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

			switch (max) {
				case r:
					h = (g - b) / d + (g < b ? 6 : 0);
					break;
				case g:
					h = (b - r) / d + 2;
					break;
				case b:
					h = (r - g) / d + 4;
					break;
			}

			h *= 60;
		}

		return { h, s, l };
	}

	/**
	 * Convert RGB to HWB
	 */
	private rgbToHwb(): { h: number; w: number; b: number } {
		const { h, s, l } = this.rgbToHsl();
		const r = this.r / 255;
		const g = this.g / 255;
		const b = this.b / 255;

		const w = Math.min(r, g, b);
		const black = 1 - Math.max(r, g, b);

		return { h, w, b: black };
	}

	/**
	 * Convert RGB to CMYK
	 */
	private rgbToCmyk(): { c: number; m: number; y: number; k: number } {
		if (this.r === 0 && this.g === 0 && this.b === 0) {
			return { c: 0, m: 0, y: 0, k: 1 };
		}

		const r = this.r / 255;
		const g = this.g / 255;
		const b = this.b / 255;

		const k = 1 - Math.max(r, g, b);
		const c = (1 - r - k) / (1 - k) || 0;
		const m = (1 - g - k) / (1 - k) || 0;
		const y = (1 - b - k) / (1 - k) || 0;

		return { c, m, y, k };
	}

	/**
	 * Get the color as a hex string
	 */
	public toHex(includeAlpha: boolean = false): string {
		const componentToHex = (c: number): string => {
			const hex = Math.round(c).toString(16);
			return hex.length === 1 ? '0' + hex : hex;
		};

		let result = '#' + componentToHex(this.r) + componentToHex(this.g) + componentToHex(this.b);

		if (includeAlpha && this.a < 1) {
			result += componentToHex(Math.round(this.a * 255));
		}

		return result;
	}

	/**
	 * Get the color as an RGB string
	 */
	public toRgb(): string {
		if (this.a < 1) {
			return `rgba(${Math.round(this.r)}, ${Math.round(this.g)}, ${Math.round(this.b)}, ${this.a.toFixed(2)})`;
		}
		return `rgb(${Math.round(this.r)}, ${Math.round(this.g)}, ${Math.round(this.b)})`;
	}

	/**
	 * Get the color as an HSL string
	 */
	public toHsl(): string {
		const { h, s, l } = this.rgbToHsl();

		if (this.a < 1) {
			return `hsla(${Math.round(h)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%, ${this.a.toFixed(2)})`;
		}
		return `hsl(${Math.round(h)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
	}

	/**
	 * Get the color as an HWB string
	 */
	public toHwb(): string {
		const { h, w, b } = this.rgbToHwb();

		if (this.a < 1) {
			return `hwb(${Math.round(h)} ${Math.round(w * 100)}% ${Math.round(b * 100)}% / ${this.a.toFixed(2)})`;
		}
		return `hwb(${Math.round(h)} ${Math.round(w * 100)}% ${Math.round(b * 100)}%)`;
	}

	/**
	 * Get the color as an LCH string (approximation)
	 */
	public toLch(): string {
		// If we originally parsed an LCH color, use those values
		if (this.originalFormat === ColorFormat.LCH) {
			const { l, c, h } = this.originalValues;
			if (this.a < 1) {
				return `lch(${l.toFixed(2)}% ${c.toFixed(2)} ${h.toFixed(2)} / ${this.a.toFixed(2)})`;
			}
			return `lch(${l.toFixed(2)}% ${c.toFixed(2)} ${h.toFixed(2)})`;
		}

		// Otherwise approximate from RGB (very simplified)
		const { h, s, l } = this.rgbToHsl();
		// Rough approximation for demonstration
		const lchL = l * 100;
		const lchC = s * 100;
		const lchH = h;

		if (this.a < 1) {
			return `lch(${lchL.toFixed(2)}% ${lchC.toFixed(2)} ${lchH.toFixed(2)} / ${this.a.toFixed(2)})`;
		}
		return `lch(${lchL.toFixed(2)}% ${lchC.toFixed(2)} ${lchH.toFixed(2)})`;
	}

	/**
	 * Get the color as a CMYK string
	 */
	public toCmyk(): string {
		const { c, m, y, k } = this.rgbToCmyk();

		if (this.a < 1) {
			return `device-cmyk(${Math.round(c * 100)}%, ${Math.round(m * 100)}%, ${Math.round(y * 100)}%, ${Math.round(k * 100)}%, ${this.a.toFixed(2)})`;
		}
		return `device-cmyk(${Math.round(c * 100)}%, ${Math.round(m * 100)}%, ${Math.round(y * 100)}%, ${Math.round(k * 100)}%)`;
	}

	/**
	 * Get the color in the original format it was parsed as
	 */
	public toString(): string {
		switch (this.originalFormat) {
			case ColorFormat.HEX:
				return this.toHex(this.a < 1);
			case ColorFormat.RGB:
				return this.toRgb();
			case ColorFormat.HSL:
				return this.toHsl();
			case ColorFormat.HWB:
				return this.toHwb();
			case ColorFormat.LCH:
				return this.toLch();
			case ColorFormat.CMYK:
				return this.toCmyk();
			default:
				return this.toRgb();
		}
	}

	/**
	 * Get the RGB components
	 */
	public getRgb(): { r: number; g: number; b: number; a: number } {
		return { r: this.r, g: this.g, b: this.b, a: this.a };
	}

	/**
	 * Set RGB components
	 */
	public setRgb(r: number, g: number, b: number, a: number = 1): Color {
		this.r = Math.min(255, Math.max(0, r));
		this.g = Math.min(255, Math.max(0, g));
		this.b = Math.min(255, Math.max(0, b));
		this.a = Math.min(1, Math.max(0, a));

		this.originalFormat = ColorFormat.RGB;
		this.originalValues = { r: this.r, g: this.g, b: this.b, a: this.a };

		return this;
	}

	/**
	 * Get the original format the color was parsed as
	 */
	public getOriginalFormat(): ColorFormat {
		return this.originalFormat;
	}
}

/**
 * Enum for color formats
 */
enum ColorFormat {
	HEX = 'hex',
	RGB = 'rgb',
	HSL = 'hsl',
	HWB = 'hwb',
	LCH = 'lch',
	CMYK = 'cmyk'
}

// Export the Color class and ColorFormat enum
export { Color, ColorFormat };
