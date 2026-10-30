# Design System Master File

> **LOGIC:** Saat membangun halaman tertentu, cek dulu `design-system/nyu-portfolio/pages/[page-name].md`.
> Jika ada, aturannya **menimpa** file Master ini. Jika tidak, ikuti aturan di bawah.

---

**Project:** Nyu Portfolio
**Owner:** Nyu, freelance web developer
**Audience:** calon klien (perorangan, UMKM, klinik)
**Style:** Dark, navy, cyberpunk minimalis (satu aksen cyan)
**Revised:** 2026-10-28 (menggantikan output mentah skill; lihat "Penyimpangan dari skill")

Konten (nama, bio, proyek, kontak) belum ada. Pakai placeholder seperti `[Nama]`, `[Deskripsi proyek]`. Jangan mengarang data.

---

## Global Rules

### Color Palette (tema gelap sebagai bawaan, tidak ada mode terang)

| Role | Hex | CSS Variable | Catatan |
|------|-----|--------------|---------|
| Background | `#0A1224` | `--color-background` | Navy gelap, dasar halaman |
| Card / surface | `#0F1B33` | `--color-card` | Permukaan kartu |
| Muted surface | `#15244A` | `--color-muted` | Input, chip, area sekunder |
| Foreground | `#E6EDF7` | `--color-foreground` | Teks utama |
| Muted foreground | `#8FA3C2` | `--color-muted-foreground` | Teks sekunder, placeholder |
| Accent | `#22D3EE` | `--color-accent` | SATU-satunya aksen (cyan neon) |
| Accent hover | `#67E8F9` | `--color-accent-hover` | Hover tombol primer |
| On accent | `#04101F` | `--color-on-accent` | Teks di atas aksen |
| Border (decorative) | `#2A4170` | `--color-border` | Garis kartu, pemisah. BUKAN untuk input |
| Border (control) | `#5A80C5` | `--color-border-control` | Input dan elemen interaktif |
| Destructive | `#F87171` | `--color-destructive` | Pesan error |
| Ring | `#22D3EE` | `--color-ring` | Focus ring |

Aturan: tanpa hijau. Navy (`#0A1224`, `#0F1B33`, `#15244A`, dan navy `#0B1B3A`) hanya untuk latar dan permukaan, tidak untuk teks atau aksen di atas latar gelap.

**Kontras terhitung (WCAG)**

| Pasangan | Rasio | Syarat |
|---|---|---|
| Foreground / background | 15.84 | 4.5 OK |
| Foreground / card | 14.55 | 4.5 OK |
| Muted fg / background | 7.28 | 4.5 OK |
| Muted fg / card | 6.68 | 4.5 OK |
| Muted fg / muted surface | 5.92 | 4.5 OK |
| Accent / background | 10.33 | 4.5 OK |
| Accent / card | 9.49 | 4.5 OK |
| On accent / accent | 10.57 | 4.5 OK |
| On accent / accent hover | 13.18 | 4.5 OK |
| Accent hover / background | 12.88 | 4.5 OK |
| Destructive / card | 6.20 | 4.5 OK |
| Control border / background | 4.74 | 3.0 OK |
| Control border / card | 4.35 | 3.0 OK |
| Control border / muted surface | 3.85 | 3.0 OK |
| Decorative border / background | 1.86 | dekoratif, tidak disyaratkan |

### Typography (tanpa font baru: Geist yang sudah dimuat di `app/layout.tsx`)

- **Mono (`--font-geist-mono`):** label, nav, judul kecil, tombol (huruf kapital, `letter-spacing: 0.08em`), metadata.
- **Sans (`--font-geist-sans`):** judul besar (hero, section) dan teks isi.
- Isi teks minimal 16px, line-height 1.6, lebar baris maks 65ch.
- Skala: hero `clamp(2.5rem, 6vw, 4.5rem)`, h2 `clamp(1.75rem, 3vw, 2.5rem)`, label `0.75rem` mono.

### Spacing

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | `4px` | Celah rapat |
| `--space-sm` | `8px` | Celah ikon, inline |
| `--space-md` | `16px` | Padding standar |
| `--space-lg` | `24px` | Padding kartu |
| `--space-xl` | `32px` | Celah besar |
| `--space-2xl` | `48px` | Margin antar blok |
| `--space-3xl` | `64px` | Padding section di mobile |
| `--space-section` | `96px` (tablet) / `128px` (desktop) | Padding vertikal section; banyak ruang kosong |

Gutter halaman 16px (360px), 32px (768px), konten maks `1200px` di tengah.

### Radius & Shadow

- Radius: `0` untuk kartu, tombol, input (siku). Maks `2px` bila perlu melunakkan.
- Hiasan siku kartu: garis aksen 12px x 1px di empat sudut (pseudo-element, tanpa gambar).
- Tidak ada shadow gelap tebal. Pemisahan lewat garis tepi.
- Glow: SATU tempat saja (judul hero atau tombol primer), `text-shadow/box-shadow: 0 0 12px rgba(34,211,238,0.35)`. Tidak di kartu.

---

## Component Specs (semua gelap)

### Buttons

```css
.btn-primary {
  background: #22D3EE;
  color: #04101F;
  font-family: var(--font-geist-mono);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-weight: 600;
  padding: 12px 24px;
  min-height: 44px;
  border-radius: 0;
  cursor: pointer;
  transition: opacity 200ms ease, transform 200ms ease;
}
.btn-primary:hover { background: #67E8F9; transform: translateY(-1px); }

.btn-secondary {
  background: transparent;
  color: #22D3EE;
  border: 1px solid #22D3EE;
  /* tipografi, padding, min-height sama dengan primer */
  border-radius: 0;
  cursor: pointer;
}
.btn-secondary:hover { background: rgba(34,211,238,0.08); }

.btn-primary:focus-visible,
.btn-secondary:focus-visible {
  outline: 2px solid #22D3EE;
  outline-offset: 3px;
}
```

### Cards (proyek)

```css
.card {
  position: relative;
  background: #0F1B33;
  border: 1px solid #2A4170;
  border-radius: 0;
  padding: 24px;
  transition: transform 200ms ease, border-color 200ms ease;
}
.card:hover { transform: translateY(-2px); border-color: #22D3EE; }
/* Siku: ::before/::after, 12px, 1px #22D3EE di sudut */

.card img {
  filter: grayscale(1);
  transition: filter 300ms ease;
}
.card:hover img,
.card:focus-within img { filter: grayscale(0); }
```

Kartu yang bisa diklik memakai satu `<a>` dengan `focus-visible` ring cyan.

### Inputs (form kontak)

```css
.input {
  background: #15244A;
  color: #E6EDF7;
  border: 1px solid #5A80C5;   /* >= 3:1 */
  border-radius: 0;
  padding: 12px 16px;
  min-height: 44px;
  font-size: 16px;
  transition: border-color 200ms ease;
}
.input::placeholder { color: #8FA3C2; }
.input:focus-visible {
  border-color: #22D3EE;
  outline: 2px solid #22D3EE;
  outline-offset: 2px;
}
.input[aria-invalid="true"] { border-color: #F87171; }
```

Setiap input punya `<label>` terlihat. Pesan error memakai teks `#F87171` plus ikon SVG, bukan warna saja.

### Modals (bila diperlukan)

```css
.modal-overlay { background: rgba(4,16,31,0.8); }
.modal {
  background: #0F1B33;
  border: 1px solid #2A4170;
  border-radius: 0;
  padding: 32px;
  max-width: 500px;
  width: 90%;
}
```

### Ikon

SVG inline buatan sendiri (stroke 1.5, `currentColor`). Tanpa emoji, tanpa library ikon baru.

---

## Page Pattern: Satu halaman portofolio

Urutan: **Hero > Tentang > Skill > Sertifikat > Mulai proyek > Pertanyaan umum (FAQ) > Kontak**. Tanpa blog. (Section "Proyek" diganti "Sertifikat"; kartu tetap bergaya sama.)

| Section | Isi | CTA |
|---|---|---|
| Hero | `[Nama]`, peran (freelance web developer), satu kalimat nilai `[Deskripsi singkat]` | Primer: "Lihat proyek"; sekunder: "Hubungi" |
| Proyek | Grid kartu `[Nama proyek]`, `[Deskripsi proyek]`, tag teknologi, gambar abu-abu jadi berwarna saat hover | Tautan per proyek `[URL]` |
| Skill | Kelompok keahlian `[Skill]` (label mono, daftar rapi); fokus layanan untuk perorangan, UMKM, klinik | – |
| Kontak | Form (nama, email, pesan) atau tautan `[Email]`, `[WhatsApp]`, `[GitHub]` | Primer: kirim / hubungi |

Navigasi: header tipis dengan tautan jangkar ke tiap section, label mono. Di 360px menjadi menu ringkas yang bisa dioperasikan keyboard.

---

## Responsive Rules

- Uji di **360, 768, 1440 px**. Mobile-first.
- Tanpa horizontal scroll (`overflow-x` tidak boleh dipakai untuk menyembunyikan masalah; periksa `scrollWidth <= clientWidth`).
- Grid proyek: 1 kolom (360), 2 kolom (768), 3 kolom (1440).
- Target sentuh minimal 44x44px.
- Tautan "Lewati ke konten" di awal halaman; urutan tab mengikuti urutan visual; `focus-visible` selalu terlihat.
- Tidak ada konten tertutup header yang fixed (beri `scroll-margin-top`).

## Motion Rules (Motion for React; tanpa GSAP)

- Hanya animasi `transform` dan `opacity`. Tidak menganimasikan width/height/top/left.
- Satu pola masuk untuk semua section: fade + naik 12px, durasi 300-400ms, ease-out, sekali saat masuk viewport (`whileInView`, `once: true`).
- Stagger (60-80ms) hanya untuk daftar kartu proyek dan skill. Tidak semua elemen bergerak sekaligus.
- Hover/fokus: transisi 150-300ms.
- `prefers-reduced-motion: reduce`: tanpa gerakan transform; tersisa fade singkat atau tanpa animasi (pakai `useReducedMotion` atau `MotionConfig reducedMotion="user"`).
- Jangan memakai opsi `--motion` milik skill (menyisipkan GSAP).

---

## Anti-Patterns (Jangan dipakai)

- Hijau di mana pun; lebih dari satu warna aksen
- Navy sebagai warna teks/aksen di atas latar gelap
- Mode terang sebagai bawaan
- Emoji sebagai ikon
- Glow di banyak elemen; efek berlebihan; tampilan template generik
- Hover yang menggeser layout (scale besar)
- Garis tepi input di bawah 3:1
- Perubahan state instan tanpa transisi
- Fokus tidak terlihat
- Mengarang data (nama, proyek, testimoni, kontak)

## Pre-Delivery Checklist

- [ ] Teks memenuhi kontras 4.5:1; garis input/kontrol 3:1
- [ ] Hanya satu aksen (cyan `#22D3EE`), tanpa hijau
- [ ] Tanpa emoji sebagai ikon; ikon SVG konsisten
- [ ] `cursor-pointer` pada elemen yang bisa diklik
- [ ] Hover 150-300ms; `focus-visible` terlihat di semua elemen interaktif
- [ ] Animasi hanya transform/opacity; satu pola masuk; `prefers-reduced-motion` dihormati
- [ ] Responsif di 360, 768, 1440 px tanpa horizontal scroll
- [ ] Bisa dipakai penuh dengan keyboard
- [ ] Tidak ada dependency, font, atau ikon baru
- [ ] `next.config.ts` tidak diubah

---

## Penyimpangan dari output skill (catatan)

Output mentah `--design-system` diganti karena: aksen hijau `#22C55E` (dilarang), primary slate bukan navy, pola "FAQ/Documentation Landing" tidak sesuai, font JetBrains Mono + IBM Plex Sans (font baru), dan contoh komponen bergaya terang. Jenis style "Dark Mode (OLED)" dari skill tetap dipakai sebagai acuan umum.
