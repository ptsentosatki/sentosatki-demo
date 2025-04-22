import eslint from 'vite-plugin-eslint';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import compression from 'vite-plugin-compression';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  build: {
    assetsInlineLimit: 0,
  },
  plugins: [
    react(), 
    compression(), 
    visualizer(),
    eslint({
      failOnWarning: false,
      failOnError: true,
    })
  ],
})
