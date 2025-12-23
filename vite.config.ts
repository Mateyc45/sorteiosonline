import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // 1. Minificar ao máximo
    minify: 'terser', 
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log em produção
        drop_debugger: true,
      },
    },
    // 2. Dividir os pedaços (Chunks) manualmente
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Separa bibliotecas do React em um arquivo próprio
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom') || id.includes('node_modules/react-router-dom')) {
            return 'vendor-react';
          }
          // Separa os ícones (Lucide) em outro arquivo, pois são muitos
          if (id.includes('node_modules/lucide-react')) {
            return 'vendor-icons';
          }
          // O resto das bibliotecas vai para um arquivo genérico
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
  },
});