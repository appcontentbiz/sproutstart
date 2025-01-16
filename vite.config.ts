import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.BASE_URL || '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  },
  server: {
    port: 4000,
    host: true,
    strictPort: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    rollupOptions: {
      external: [
        '@mui/icons-material/Eco',
        '@mui/icons-material/WaterDrop',
        '@mui/icons-material/Agriculture',
        '@mui/icons-material/Home',
        '@mui/icons-material/CheckCircle',
        '@mui/icons-material/Warning',
        '@mui/icons-material/Info'
      ],
      output: {
        manualChunks: {
          vendor: [
            'react',
            'react-dom',
            'react-router-dom',
            '@mui/material',
            '@emotion/react',
            '@emotion/styled'
          ]
        },
        globals: {
          '@mui/icons-material/Eco': 'MaterialIcons.Eco',
          '@mui/icons-material/WaterDrop': 'MaterialIcons.WaterDrop',
          '@mui/icons-material/Agriculture': 'MaterialIcons.Agriculture',
          '@mui/icons-material/Home': 'MaterialIcons.Home',
          '@mui/icons-material/CheckCircle': 'MaterialIcons.CheckCircle',
          '@mui/icons-material/Warning': 'MaterialIcons.Warning',
          '@mui/icons-material/Info': 'MaterialIcons.Info'
        }
      }
    }
  },
  define: {
    'process.env.NODE_ENV': '"production"',
    'process.env.BASE_URL': JSON.stringify(process.env.BASE_URL || '/')
  }
});
