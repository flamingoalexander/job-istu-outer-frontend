import { defineConfig } from '#q-app/wrappers';
export default defineConfig((/* ctx */) => {
  return {
    boot: ['init', 'error.handler'],
    css: ['app.scss'],
    extras: ['roboto-font', 'material-icons'],
    build: {
      publicPath: process.env.NODE_ENV === 'production' ? '/outer/' : '/',
      distDir: 'build',
      target: {
        browser: ['es2022', 'firefox115', 'chrome115', 'safari14'],
        node: 'node20',
      },
      typescript: {
        strict: true,
        vueShim: true,
      },
      vueRouterMode: 'history',
      vitePlugins: [
        [
          'vite-plugin-checker',
          {
            vueTsc: true,
            eslint: {
              lintCommand: 'eslint -c ./eslint.config.js "./src*/**/*.{ts,js,mjs,cjs,vue}"',
              useFlatConfig: true,
            },
          },
          { server: false },
        ],
      ],
    },
    devServer: {
      open: true,
      proxy: {
        '/api': {
          target: 'http://localhost:8000',
          changeOrigin: true,
        },
      },
    },
    framework: {
      config: {},
      plugins: ['Notify', 'Loading'],
    },
    prettierSkipFormatting: true,
  };
});
