import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import vueJsx from '@vitejs/plugin-vue-jsx'

import commonjsExternals from 'vite-plugin-commonjs-externals'

const externals = ['path', /^electron(\/.+)?$/]

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      imports: ['vue', 'pinia', 'vue-router'],
      dts: './src/auto-imports.d.ts',
    }),
    commonjsExternals({ externals }),
  ],

  // base: 'file:///' + path.resolve(__dirname, './dist/'),
  server: {
    port: 8888,
    cors: true,
    hmr: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/assets/scss/_common.scss";',
      },
    },
  },
})
