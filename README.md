# Setlog

Fitness ağırlık ve tekrar takip uygulaması. Tek sayfa web uygulaması; giriş, veritabanı ve canlı senkronizasyon Supabase üzerinden çalışır.

- `index.html` — uygulamanın tamamı
- `supabase.js` — @supabase/supabase-js 2.119.0 UMD paketi (CDN bağımlılığı olmasın diye repoda)
- `icon.png` — ana ekrana eklenince görünen ikon

Kayıt yalnızca davet koduyla açılır; veritabanı satır düzeyinde güvenlik (RLS) ile korunur. Sayfada yalnızca herkese açık (publishable) anahtar bulunur.

Önizleme modu (veriler kaydedilmez): sayfanın sonuna `#demo` ekleyin.
