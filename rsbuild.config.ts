import { defineConfig } from '@rsbuild/core';
import { pluginVue } from '@rsbuild/plugin-vue';

export default defineConfig({
  resolve: {
    alias: {
      '@': './src'
    }
  },
  plugins: [pluginVue()],
});
