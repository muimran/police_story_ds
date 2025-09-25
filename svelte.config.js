// svelte.config.js

import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import adapter from '@sveltejs/adapter-static';

const dev = process.argv.includes('dev'); // so local preview works

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: vitePreprocess(),

    kit: {
        adapter: adapter(),
        paths: {
            base: dev ? '' : '/police_story_ds'  // must match repo name
        }
    }
};

export default config;
