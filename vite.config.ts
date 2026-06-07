import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    base: '/',
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'adibuz-non-blocking-css',
        transformIndexHtml(html) {
          return html.replace(
            /<link rel="stylesheet" crossorigin href="([^"]+\.css)">/g,
            `<link rel="preload" as="style" crossorigin href="$1" onload="this.onload=null;this.rel='stylesheet'"><noscript><link rel="stylesheet" crossorigin href="$1"></noscript>`
          );
        },
      },
    ],
    // SECURITY: Do NOT expose secret API keys via `define`. Vite bakes
    // `define` values directly into the JS output where anyone can read
    // them in DevTools. Server-side keys (Gemini, etc.) must be called
    // through a Supabase Edge Function or Vercel API Route instead.
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      // CSS loads via <link> in HTML, parallel with JS, not chained behind it.
      cssCodeSplit: true,
      modulePreload: {
        resolveDependencies(_filename, deps) {
          return deps.filter((dep) => !/vendor-(three|supabase|gsap)/.test(dep));
        },
      },
      minify: 'esbuild',
      target: 'es2020',
      sourcemap: false,
      assetsInlineLimit: 2048,
      cssMinify: true,
      reportCompressedSize: false,
      // vendor-three is large but loaded only through the deferred globe path.
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (
              id.includes('node_modules/three') ||
              id.includes('@react-three/fiber') ||
              id.includes('@react-three/drei')
            ) {
              return 'vendor-three';
            }
            if (id.includes('node_modules/gsap') || id.includes('@gsap/react')) {
              return 'vendor-gsap';
            }
            if (id.includes('node_modules/motion') || id.includes('node_modules/framer-motion')) {
              return 'vendor-motion';
            }
            if (
              id.includes('node_modules/react/') ||
              id.includes('node_modules/react-dom/') ||
              id.includes('node_modules/react-router-dom/')
            ) {
              return 'vendor-react';
            }
            if (id.includes('@supabase/supabase-js') || id.includes('node_modules/@supabase')) {
              return 'vendor-supabase';
            }
            if (id.includes('node_modules/react-icons')) {
              return 'vendor-icons';
            }
          },
        },
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
