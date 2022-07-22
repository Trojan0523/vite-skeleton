import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { rollupConfig } from './build/config'

export default defineConfig({
  plugins: [vue(), vueJsx()],
  server: {
    cors: {
      'origin': '*',
      'methods': 'GET,POST,OPTIONS,PUT,DELETE',
      'allowedHeaders': '*',
      'credentials': true,
    },
    middlewareMode: 'html',
    // fs: {
    //   strict: true,
    // },
  },
  build: {
    minify: 'esbuild',
    reportCompressedSize: false,
    chunkSizeWarningLimit: 500,
    assetsInlineLimit: 8 * 1024,
    rollupOptions: rollupConfig,
  },
})
