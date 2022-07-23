/**
 * @type { import('vite').buildOptions }
 */

export const rollupConfig = {
  output: {
    // output generate hook execute
    chunkFileNames: 'static/js/[name]-[hash].js',
    // build hook execute
    entryFileNames: 'static/js/[name]-[hash].js',
    assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
    manualChunks: {
    },
  },
}

export default rollupConfig
