const CACHE_NAME = 'spt-learn-v2';
const assets = [
  './',
  './index.html',
  './manifest.json',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;900&display=swap'
];

// تثبيت ملفات التطبيق في ذاكرة الهاتف
self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('تم حفظ ملفات التطبيق في الذاكرة ✅');
      return cache.addAll(assets);
    })
  );
});

// جلب البيانات من الذاكرة عند انقطاع الإنترنت
self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      return cacheRes || fetch(evt.request);
    }).catch(() => {
        // هنا يتم منع رسالة الخطأ البيضاء وعرض صفحة index من الذاكرة
        return caches.match('./index.html');
    })
  );
});
