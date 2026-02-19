import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // 加载本地 .env 文件 (用于本地开发)
  const env = loadEnv(mode, process.cwd(), '');
  
  // 关键修改：优先使用 process.env (Vercel 环境)，后备使用 env (本地文件)
  const apiKey = process.env.VITE_GEMINI_API_KEY || env.VITE_GEMINI_API_KEY;

  return {
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    plugins: [react()],
    define: {
      // 这样可以确保无论在 Vercel 还是本地，都能拿到值
      'process.env.API_KEY': JSON.stringify(apiKey),
      'process.env.GEMINI_API_KEY': JSON.stringify(apiKey)
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    }
  };
});
