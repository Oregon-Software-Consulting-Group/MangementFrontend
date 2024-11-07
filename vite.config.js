import { resolve } from 'path'
import { defineConfig } from "vite"

export default defineConfig({
    root: './src',
    build: {
        outDir: '../dist',
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'src/index.html'),
                product: resolve(__dirname, 'src/product.html'),
            },
        },
    },
    server: {
        host: '127.0.0.1',
    },
})
