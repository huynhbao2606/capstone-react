import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  resolve: {
      alias: {
          "@": path.resolve(__dirname, './src'),
          "@components": path.resolve(__dirname, './src/components'),
          "@pages": path.resolve(__dirname, './src/pages'),
          "@routes": path.resolve(__dirname, './src/routes'),
          "@store": path.resolve(__dirname, './src/store'),
          "@assets": path.resolve(__dirname, './src/assets'),
          "@api": path.resolve(__dirname, './src/api'),
          "@services": path.resolve(__dirname, './src/services'),
          "@types": path.resolve(__dirname, './src/types'),
          "@redux": path.resolve(__dirname, './src/redux'),
          "@styles": path.resolve(__dirname, './src/styles'),
      }
  },
    server: {
        proxy: {
            "/api": {
                target: "https://movienew.cybersoft.edu.vn",
                changeOrigin: true,
                secure: false,
            },
        },
    },

})
