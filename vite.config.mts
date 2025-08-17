import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';

export default defineConfig({
  base: './',
  root: 'src/ui', // you can enable if you want
  define: {
    'process.env': {},
  },
  plugins: [
    react(),
    viteSingleFile(), // add the viteSingleFile plugin here
  ],
  build: {
    outDir: './dist',
    emptyOutDir: true,
    lib: {
      entry: resolve(__dirname, 'src/ui/index.tsx'),
      formats: ['iife'], // <- important: single bundle as IIFE
      name: 'PluginUI', // global variable name for your bundle
      fileName: 'ui', // output file name without extension
    },
    rollupOptions: {
      input: {
        ui: resolve(__dirname, 'src/ui/index.html'),
      },
      output: {
        dir: 'dist',
        inlineDynamicImports: true,
      },
    },
    assetsDir: '.',
  },
});
