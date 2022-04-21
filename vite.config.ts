/*
 * @Descripttion: VITE 设置
 * @version: 1.0.0
 * @Author: Zhou
 * @Date: 2022-04-06 14:22:34
 * @LastEditors: Zhou
 * @LastEditTime: 2022-04-21 10:49:52
 */
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'
import path from 'path'
//@ts-ignore
import viteCompression from 'vite-plugin-compression'
//auto import vue https://www.npmjs.com/package/unplugin-auto-import
import AutoImport from 'unplugin-auto-import/vite'
import styleImport, { VantResolve } from 'vite-plugin-style-import'
//inject title
import { createHtmlPlugin } from 'vite-plugin-html'
import setting from './src/settings'

const { svgBuilder } = require('./src/icons/index.js')
// https://vitejs.dev/config/
export default ({ command, mode }) => {
  const processEnv = loadEnv(mode, process.cwd())

  return {
    base: './', //打包路径
    plugins: [
      vue(),
      legacy({
        targets: ['ie >= 11'],
        additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
      }),
      // gzip压缩 生产环境生成 .gz 文件
      viteCompression({
        verbose: true,
        disable: false,
        threshold: 10240,
        algorithm: 'gzip',
        ext: '.gz',
      }),
      styleImport({
        resolves: [VantResolve()],
      }),
      svgBuilder('./src/icons/svg/'),
      AutoImport({
        imports: [
          'vue',
          'vue-router',
          {
            '@/hooks/global/useCommon': ['useCommon'],
            '@/hooks/global/useVant': ['useVant'],
            '@/hooks/global/useVueRouter': ['useVueRouter'],
            '@/service/http': ['axiosReq'],
          },
        ],
        eslintrc: {
          enabled: true, // Default `false`
          filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
          globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
        },
        dts: true, //auto generation auto-imports.d.ts file
      }),
      createHtmlPlugin({
        inject: {
          // Inject data into ejs template
          data: {
            title: setting.title,
          },
        },
      }),
    ],
    // 配置别名
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          charset: false,
          additionalData: '@import "@/styles/variables.scss";',
        },
      },
    },
    //启动服务配置
    server: {
      //设置 server.hmr.overlay 为 false 可以禁用开发服务器错误的屏蔽。
      hmr: { overlay: false },
      host: '0.0.0.0',
      port: 8000,
      open: true,
      https: false,
      proxy: {
        [processEnv.VITE_APP_BASE_API]: {
          target: processEnv.VITE_APP_BASE_URL,
          // target: `http://edu.jiuweiedu.com:81`,
          changeOrigin: true,
          rewrite: (path: string) =>
            path.replace(new RegExp(processEnv.VITE_APP_BASE_API + '/', 'g'), ''),
        },
      },
    },
    // 生产环境打包配置
    //去除 console debugger
    build: {
      minify: 'terser', //默认modules
      brotliSize: false,
      // 消除打包大小超过500kb警告
      chunkSizeWarningLimit: 5000,
      //remote console.log in prod
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
      //build assets Separate
      assetsDir: 'static/assets',
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
        },
      },
    },
  }
}
