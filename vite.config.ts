import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Plugin Vite pour simuler localement les fonctions serverless Vercel de /api
function vercelApiDevPlugin() {
  return {
    name: 'vercel-api-dev',
    configureServer(server: any) {
      server.middlewares.use(async (req: any, res: any, next: any) => {
        if (!req.url?.startsWith('/api/')) {
          return next();
        }

        const url = new URL(req.url, 'http://localhost');
        const endpoint = url.pathname.replace('/api/', '').split('?')[0];

        // Méthodes d'émulation de res.status().json() pour Node standard
        res.status = (code: number) => {
          res.statusCode = code;
          return res;
        };
        res.json = (data: any) => {
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(data));
        };

        try {
          if (req.method === 'POST') {
            const buffers: any[] = [];
            for await (const chunk of req) {
              buffers.push(chunk);
            }
            const bodyStr = Buffer.concat(buffers).toString();
            try {
              req.body = JSON.parse(bodyStr);
            } catch {
              req.body = bodyStr;
            }
          }

          if (endpoint === 'health') {
            const healthHandler = (await import('./api/health')).default;
            return await healthHandler(req, res);
          } else if (endpoint === 'progress') {
            const progressHandler = (await import('./api/progress')).default;
            return await progressHandler(req, res);
          } else if (endpoint === 'paths') {
            const pathsHandler = (await import('./api/paths')).default;
            return await pathsHandler(req, res);
          } else if (endpoint === 'author') {
            const authorHandler = (await import('./api/author')).default;
            return await authorHandler(req, res);
          }
        } catch (err: any) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: err.message }));
          return;
        }

        next();
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), vercelApiDevPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    host: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          icons: ['lucide-react'],
        },
      },
    },
  },
});
