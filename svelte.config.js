import { vitePreprocess } from '@sveltejs/kit/vite';
import adapter from '@sveltejs/adapter-node';

const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({
			// default options are shown
			out: 'build',
			precompress: false,
			envPrefix: '',
			polyfill: true
		})
	}
};

export default config;