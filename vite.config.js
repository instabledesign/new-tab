import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import { viteStaticCopy } from 'vite-plugin-static-copy';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        viteStaticCopy({
            targets: [
                {
                    src: [
                        'node_modules/php-wasm/php-web.mjs.wasm',
                        'node_modules/php-wasm/libxml2.so'
                    ],
                    dest: 'assets',
                },
            ],
        }),
        {
            name: 'set-wasm-mime',
            configureServer(server) {
                server.middlewares.use((req, res, next) => {
                    if (req.url.endsWith('.wasm')) {
                        res.setHeader('Content-Type', 'application/wasm');
                    }
                    next();
                });
            },
        },
    ],
})
