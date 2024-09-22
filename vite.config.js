import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		proxy: {
			'/v1beta': {
				target: 'https://generativelanguage.googleapis.com',
				changeOrigin: true,
				secure: false
			}
		}
	}
});
