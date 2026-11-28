/* Setlog service worker: web push bildirimleri */
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('push',e=>{
  let d={};try{d=e.data?e.data.json():{}}catch{d={body:e.data&&e.data.text()}}
  const title=d.title||'Setlog';
  const ios=/iP(hone|ad|od)|Macintosh/.test(self.navigator.userAgent);
  e.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(cs=>{
    // Uygulama açıkken uygulama içi bildirim gösterilir; iOS her push'ta bildirim istediği için orada sunucu tarafı engeller.
    if(!ios&&cs.some(c=>c.visibilityState==='visible'))return;
    return self.registration.showNotification(title,{body:d.body||'',tag:d.tag||undefined,renotify:!!d.tag,icon:'icon.png',badge:'icon.png',data:{url:d.url||'./'}});
  }));
});
self.addEventListener('notificationclick',e=>{
  e.notification.close();
  const url=new URL(e.notification.data&&e.notification.data.url||'./',self.registration.scope).href;
  e.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(cs=>{
    for(const c of cs){if(c.url.startsWith(self.registration.scope)){c.postMessage({type:'open',url});return c.focus()}}
    return self.clients.openWindow(url);
  }));
});
