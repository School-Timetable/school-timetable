import { vitePreprocess } from '@sveltejs/kit/vite';
import adapter from '@sveltejs/adapter-node';
import path from 'path';

const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({
			// default options are shown
			out: 'build',
			precompress: false,
			envPrefix: '',
			polyfill: true
		}),
		
        alias: {
			$model: path.resolve('./src/model'),
			$lib: path.resolve('./src/lib'),
		}
		
	}
};

export default config;