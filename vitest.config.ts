import { fileURLToPath, URL } from 'node:url';
// import react from '@vitejs/plugin-react-swc';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';
import AutoImport from 'unplugin-auto-import/vite';
import { configAutoImport } from './auto-imports.config';

export default defineConfig({
  resolve: {
    alias: {
      '#': fileURLToPath(new URL('./src', import.meta.url)),
      '~': fileURLToPath(new URL('./node_modules', import.meta.url))
    },
    extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx']
  },

  plugins: [
    {
      name: 'vitest-plugin-beforeall',
      config: () => ({
        test: {
          setupFiles: [fileURLToPath(new URL('./vitest/before-all.ts', import.meta.url))]
        }
      })
    },
    react(),
    AutoImport(configAutoImport)
  ],

  test: {
    coverage: {
      all: true,
      provider: 'c8',
      src: ['.'],
      include: ['components', 'utils'],
      lines: 10,
      functions: 10,
      branches: 10,
      statements: 10
    },
    globals: true,
    globalSetup: [fileURLToPath(new URL('./vitest/setup.ts', import.meta.url))],
    environment: 'happy-dom'
  }
});
