self.addEventListener('install', event => {
  console.log('Service Worker: Installed');
});

self.addEventListener('activate', event => {
  console.log('Service Worker: Activated');
});

self.addEventListener('fetch', event => {
  // オフライン対応を入れたい場合はここに書く
});
