import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import rollupConfig from './build/config'

const _resolve = (targetDiv: string): string => {
  return resolve(__dirname, targetDiv)
}

export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': _resolve('./src'),
      '@components': _resolve('./src/components'),
      '@store': _resolve('./src/store'),
      '@style': _resolve('./src/style'),
      '@utils': _resolve('./src/utils'),
      '@views': _resolve('./src/views'),
    },
  },
  server: {
    cors: {
      'origin': '*',
      'methods': 'GET,POST,OPTIONS,PUT,DELETE',
      'allowedHeaders': '*',
      'credentials': true,
    },
    // middlewareMode: 'html',
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
