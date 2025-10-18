import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	resolve: {
		alias: {
			'basecoat-css/basecoat': path.resolve(__dirname, './node_modules/basecoat-css/dist/js/basecoat.js')
		}
	}
});
