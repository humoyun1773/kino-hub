# 🎬 KinoHub — Filmlar va Seriallar Platformasi

Zamonaviy kinolar, seriallar, rasmiy treylerlar va janrlar katalogini taqdim etuvchi interaktiv veb-platforma.

---

## ✨ Asosiy Imkoniyatlar (Features)

- 🔒 **Haqiqiy Autentifikatsiya (Real Auth)**:
  - Kirish (Login) va yangi hisob yaratish (Sign Up) tizimi.
  - `localStorage` asosida foydalanuvchilar bazasi va sessiya xavfsizligi.
  - Bir bosishda tezkor kirish uchun test hisobi (`user@kino.uz` / `123`).
  - Profil menyusi va tizimdan chiqish (Logout) funksiyasi.

- 📱 **Ochilib-Yopiladigan Zamonaviy Sidebar (Collapsible Sidebar)**:
  - Aynan yon panel uchun moʻljallangan **Sidebar (`[| ]`)** ikonkasi bilan boshqaruv.
  - Sidebar ichidagi maxsus tugma orqali yopish, sidebar yopilganda esa Navbarʼdan qayta ochish.
  - Janrlar boʻyicha hisoblagichlar (har bir janrda nechta film borligi).
  - Saralash: Reyting boʻyicha (eng yuqoridan pastga) va Yil boʻyicha (2024 yangiliklari).

- 🌟 **3D Cinema Showcase & Ambient Lighting**:
  - Yuqori sifatli 3D interaktiv video treyler kartasi va karusel.
  - Kinoteatr muhitini beruvchi qizil va koʻk neon ambient yorugʻliklari.
  - Jonli tomoshabinlar soni indikatori va trenddagi filmlar lentasi.

- 🎲 **"Tasodifiy Film" (Surprise Me)**:
  - Kechqurun nima koʻrishni bilmayotganlar uchun animatsiyali tasodifiy film generatori.

- 🎥 **Rasmiy Treylerlar Pleyeri**:
  - YouTube iframe integratsiyasi orqali filmlarning toʻliq HD rasmiy treylerlarini tomosha qilish.
  - Film rejissyori, aktyorlar tarkibi va oʻxshash filmlar tavsiyasi.

- 📲 **Toʻliq Responsive Dizayn (Full Media Queries)**:
  - Kichik smartfonlar (<=480px)
  - Katta telefonlar va fabletlar (481px - 768px)
  - Planshetlar (769px - 1024px)
  - Noutbuk va ishchi kompyuterlar (1025px - 1440px)
  - 4K va keng formatli monitorlar (>1440px)

---

## 🛠️ Texnologiyalar Steki

- **Frontend**: React 19, Vite 6
- **Ikonkalar**: Lucide React
- **Uslublar**: Vanilla CSS (CSS Grid, Flexbox, Glassmorphism, CSS Variables, Full @media queries)
- **API**: TMDB (The Movie Database) API integratsiyasi

---

## 🚀 Oʻrnatish va Ishga Tushirish

1. Repozitoriyani klonlang:
   ```bash
   git clone https://github.com/humoyun1773/kino-hub.git
   cd kino-hub
   ```

2. Paketlarni oʻrnating:
   ```bash
   npm install
   ```

3. Dasturchi serverini ishga tushiring:
   ```bash
   npm run dev
   ```

4. Brauzerda oching:
   ```
   http://localhost:3000/
   ```

5. Loyihani ishlab chiqarishga (Production) yigʻish:
   ```bash
   npm run build
   ```

---

## 👤 Muallif
- GitHub: [@humoyun1773](https://github.com/humoyun1773)
