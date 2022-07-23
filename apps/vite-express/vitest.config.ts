import { defineConfig, configDefaults } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    transformMode: {
      web: [/\.(j|t)sx?$/],
    },
    includeSource: [],
    exclude: [...configDefaults.exclude],
  }
})
