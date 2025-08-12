// svelte.config.js

import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

// CHANGE 1: Import adapter-static instead of adapter-auto
import adapter from '@sveltejs/adapter-static'; 

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: vitePreprocess(),

    kit: {
        // CHANGE 2: Use the static adapter
        adapter: adapter(), 

        // KEEP THIS! Your base path is correct for hosting in a subfolder.
        paths: {
            base: '/suv'
        }
    }
};

export default config;