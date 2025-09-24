// svelte.config.js

import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import adapter from '@sveltejs/adapter-static';

const dev = process.argv.includes('dev');

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: vitePreprocess(),

    kit: {
        // --- MODIFY THE ADAPTER CONFIGURATION ---
        adapter: adapter({
            // This is the crucial line to add
            trailingSlash: 'always'
        }),
        paths: {
            base: dev ? '' : '/police_story_ds'
        }
    }
};

export default config;