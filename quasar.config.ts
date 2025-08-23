import { defineConfig } from '#q-app/wrappers';

export default defineConfig((/* ctx */) => {
  return {
    boot: ['axios'],
    css: ['app.scss'],
    extras: [
      'roboto-font',
      'material-icons',
    ],
    build: {
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
    viteOptions: {
      base: process.env.NODE_ENV === 'production' ? '/out/' : '/',
    },
    devServer: {
      open: true,
    },
    framework: {
      config: {},
      plugins: [],
    },
    prettierSkipFormatting: true,
  };
});
