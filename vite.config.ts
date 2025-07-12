import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  base: "/hanvinaweb",
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      global: 'globalthis' // ✅ fix lỗi "global is not defined"
    }
  },
  define: {
    global: 'globalThis' // ✅ fix cho môi trường browser
  }
});
