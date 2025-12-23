import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Já que você baixou o 'terser', vamos usar! Ele compacta melhor o código.
    minify: 'terser', 
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log para deixar mais rápido
        drop_debugger: true,
      },
    },
    // Aumenta o limite de aviso para o terminal não ficar reclamando de tamanho
    chunkSizeWarningLimit: 1000,
    
    // IMPORTANTE: Removemos o 'manualChunks' que estava causando a TELA BRANCA.
    // Deixe o Vite dividir os arquivos automaticamente de forma segura.
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
});