import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Split stable vendors so they can be cached independently of route code.
          amplify: ['aws-amplify', '@aws-amplify/ui-react'],
          react: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    // Backend Lambda tests opt into the node environment via a per-file
    // `// @vitest-environment node` pragma.
    include: ['src/**/*.{test,spec}.{ts,tsx}', 'infra/**/*.{test,spec}.mjs'],
    css: false,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['src/lib/**', 'src/hooks/**', 'infra/functions/**/index.mjs'],
      thresholds: { lines: 75, functions: 75, branches: 75, statements: 75 },
    },
  },
})
