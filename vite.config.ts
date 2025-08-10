import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";


// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) => {
  const plugins = [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean);

  if (mode === 'production') {
    const { default: vitePrerender } = await import('vite-plugin-prerender');
    plugins.push(
      vitePrerender({
        staticDir: path.join(__dirname, 'dist'),
        routes: [
          '/',
          '/services/rmm',
          '/services/wsystem',
          '/services/seniors',
          '/services/hire-us',
          '/feedback-insights',
          '/point-of-presence',
          '/remote-support',
          '/IndustryLeadersChooseSupportCALL'
        ],
      })
    );
  }

  return ({
    server: {
      host: "::",
      port: 8080,
    },
    plugins,
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      // Performance optimizations
      rollupOptions: {
        output: {
          manualChunks: {
            // Vendor chunks for better caching
            'react-vendor': ['react', 'react-dom'],
            'ui-vendor': ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', '@radix-ui/react-toast'],
            'utils-vendor': ['clsx', 'tailwind-merge', 'class-variance-authority'],
            'icons-vendor': ['lucide-react'],
            'router-vendor': ['react-router-dom'],
            'query-vendor': ['@tanstack/react-query']
          }
        }
      },
      // Enable source maps for debugging in production
      sourcemap: false,
      // Optimize chunk size
      chunkSizeWarningLimit: 1000,
      // Enable minification (using default esbuild instead of terser)
      minify: true
    },
    // Optimize dependencies  
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-router-dom',
        '@tanstack/react-query',
        'lucide-react'
      ]
    }
  });
});