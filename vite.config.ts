import { fileURLToPath, URL } from 'node:url';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig, type UserConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import AutoImport from 'unplugin-auto-import/vite';
import { configAutoImport } from './auto-imports.config';

export default defineConfig(async ({ command, mode }): Promise<UserConfig> => {
  process.env = {
    ...process.env,
    ...loadEnv(mode, process.cwd())
  };

  const config: UserConfig = {
    base: '/',
    plugins: [
      react(),
      AutoImport(configAutoImport)
    ],
    resolve: {
      alias: {
        '#': fileURLToPath(new URL('./src', import.meta.url)),
        '~': fileURLToPath(new URL('./node_modules', import.meta.url))
      },
      extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx']
    },
    build: {
      target: 'esnext',
      minify: 'esbuild',
      rollupOptions: {
        // @ts-ignore
        output: {
          manualChunks: {
            //: Split external library from transpiled code.
            react: ['react', 'react-dom', 'react-router-dom', 'react-icons'],
            axios: ['axios'],
            mobx: ['mobx', 'mobx-react-lite'],
            graphql: ['graphql', 'graphql-request'],
            emotion: [
              '@emotion/core',
              '@emotion/css',
              '@emotion/react',
              '@emotion/styled'
            ],
            'ui-kit': [ 'antd'],
            helpers: ['classnames', 'dayjs', 'uuid']
          },
          plugins: [
            mode === 'analyze'
              ? visualizer({
                  open: true,
                  filename: 'dist/stats.html'
                })
              : undefined
          ]
        }
      }
    },
    esbuild: {
      drop: command === 'serve' ? [] : ['console']
    }
  };

  return config;
});
