import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    rollupOptions: {
      external: [
        '@mui/icons-material/Eco'
      ],
      output: {
        manualChunks: {
          vendor: [
            'react', 
            'react-dom', 
            'react-router-dom',
            '@mui/material',
            '@mui/icons-material'
          ],
        },
        globals: {
          '@mui/icons-material/Eco': 'MaterialIcons.Eco'
        }
      },
    },
  },
  optimizeDeps: {
    include: [
      '@mui/material',
      '@mui/icons-material',
      '@mui/icons-material/Eco'
    ],
    esbuildOptions: {
      target: 'es2020'
    }
  },
  server: {
    port: 3000,
    open: true,
  },
})
