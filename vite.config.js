import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
// import crxMV3 from "vite-plugin-crx-mv3";
import manifest from './public/manifest.json';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        // crxMV3({manifest}),
    ],
    // build: {
    //     rollupOptions: {
    //         input: {
                // popup: 'index.html', // Entry for popup UI
                // options: 'src/components/Options.jsx', // Options page
                // content: 'src/content/contentScript.js', // Content scripts
                // background: 'src/background/background.js', // Background script
            // },
        // },
    // },
})
