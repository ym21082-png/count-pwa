self.addEventListener('install', event => {
  console.log('Service Worker: Installed');
});

self.addEventListener('activate', event => {
  console.log('Service Worker: Activated');
});

self.addEventListener('fetch', event => {
  // 必須ではないが、fetch を書くと PWA 判定が安定する
});

