import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

// Import the new adapter
import adapter from '@sveltejs/adapter-auto';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		// Use the new adapter. It will automatically handle everything for Vercel.
		adapter: adapter(),

		// KEEP YOUR BASE PATH! This is still needed.
		paths: {
			base: '/suv'
		}
	}
};

export default config;