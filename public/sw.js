// Service Worker for Self-Contained Operation - Enhanced Version
const CACHE_NAME = 'supportcall-v6-clean';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/offline.html',
  '/src/main.tsx',
  '/src/index.css',
  '/assets/hero-tech.jpg',
  '/assets/services-icon.jpg',
  '/logo.png',
  '/og-image.jpg',
  'https://www.supportcall.com.au/images/logo.png',
  'https://www.supportcall.com.au/images/favicon.ico',
  '/lovable-uploads/84165b4e-46a6-4065-8ddd-eb8da8017502.png',
  '/lovable-uploads/441f7345-44a4-41ba-9969-e5fac509eb15.png',
  '/lovable-uploads/a84e9f8f-93ab-49b9-9f77-1034f28fc11d.png',
  '/lovable-uploads/bc9dcfce-d292-4a2c-9a46-cba5e88f2e9d.png',
  '/lovable-uploads/8c78cbd6-de56-4bf6-b7a6-4a516e83f453.png',
  '/lovable-uploads/13172be0-eeb7-4520-9876-55636c539d57.png'
];

// Network-first strategy for dynamic content
const NETWORK_FIRST = [
  '/services/',
  '/pages/',
  '/surveys/'
];

// Cache-first strategy for static assets
const CACHE_FIRST = [
  '/assets/',
  '/lovable-uploads/',
  '.js',
  '.css',
  '.png',
  '.jpg',
  '.jpeg',
  '.svg',
  '.woff',
  '.woff2'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches and force immediate control
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        // Delete ALL old caches to ensure fresh content
        return Promise.all(
          cacheNames
            .filter(cacheName => cacheName !== CACHE_NAME)
            .map(cacheName => {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            })
        );
      })
      .then(() => {
        // Force immediate control of all clients
        return self.clients.claim();
      })
      .then(() => {
        // Notify all clients to reload for fresh content
        return self.clients.matchAll().then(clients => {
          clients.forEach(client => {
            client.postMessage({ type: 'CACHE_UPDATED', cacheName: CACHE_NAME });
          });
        });
      })
  );
});

// Fetch event - intelligent caching strategy
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  
  const url = new URL(event.request.url);
  
  // Always fetch index.html and root from network first to avoid stale content
  if (url.pathname === '/' || url.pathname === '/index.html' || url.pathname.includes('/index.html')) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          if (response && response.status === 200) {
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => cache.put(event.request, responseToCache));
          }
          return response;
        })
        .catch(() => {
          return caches.match(event.request)
            .then(response => response || caches.match('/offline.html'));
        })
    );
    return;
  }
  
  // Handle different caching strategies
  if (CACHE_FIRST.some(pattern => url.pathname.includes(pattern))) {
    // Cache-first for static assets
    event.respondWith(
      caches.match(event.request)
        .then(response => {
          if (response) return response;
          
          return fetch(event.request)
            .then(response => {
              if (response && response.status === 200) {
                const responseToCache = response.clone();
                caches.open(CACHE_NAME)
                  .then(cache => cache.put(event.request, responseToCache));
              }
              return response;
            });
        })
        .catch(() => {
          // Return offline page for navigation requests
          if (event.request.destination === 'document') {
            return caches.match('/offline.html');
          }
        })
    );
  } else if (NETWORK_FIRST.some(pattern => url.pathname.includes(pattern))) {
    // Network-first for dynamic content
    event.respondWith(
      fetch(event.request)
        .then(response => {
          if (response && response.status === 200) {
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => cache.put(event.request, responseToCache));
          }
          return response;
        })
        .catch(() => {
          return caches.match(event.request)
            .then(response => {
              return response || caches.match('/offline.html');
            });
        })
    );
  } else {
    // Default strategy: cache with network fallback
    event.respondWith(
      caches.match(event.request)
        .then(response => {
          if (response) return response;
          
          return fetch(event.request)
            .then(response => {
              if (!response || response.status !== 200 || response.type !== 'basic') {
                return response;
              }

              const responseToCache = response.clone();
              caches.open(CACHE_NAME)
                .then(cache => cache.put(event.request, responseToCache));

              return response;
            });
        })
        .catch(() => {
          if (event.request.destination === 'document') {
            return caches.match('/offline.html');
          }
        })
    );
  }
});