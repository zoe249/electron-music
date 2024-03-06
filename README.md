## electron + vite + vue3

#### vite不支持使用 path 全局变量，所以electron内部的require会报错
#### 解决
   - ``` yarn add vite-plugin-commonjs-externals ```
   - 在vite.config.ts 中使用
   ```ts
      import commonjsExternals from 'vite-plugin-commonjs-externals'
      const externals = ['path', /^electron(\/.+)?$/]

      export default defineConfig({
         plugins: [
            commonjsExternals({ externals }),
         ],
      })
   ```
