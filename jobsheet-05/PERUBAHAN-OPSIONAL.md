# Jobsheet 5 — Tugas Opsional (Ide Latihan Tambahan)

Berikut adalah 5 tugas opsional yang telah diimplementasikan:

## 1. ✅ Tambah Validasi Field ISBN

**File:** `buku/tambah.html` (sudah ada field), `assets/js/app.js`

**Perubahan:**
- Menambahkan fungsi `isValidISBN(isbn)` untuk validasi format ISBN
- ISBN diterima jika **kosong ATAU** memiliki **10 atau 13 digit**
- Pesan error: "ISBN harus 10 atau 13 digit (boleh kosong)."

**Contoh valid:**
```
978-3-16-148410-0  ✅ (13 digit dengan dash)
0-306-40615-2      ✅ (10 digit dengan dash)
9783161484100      ✅ (13 digit tanpa dash)
```

---

## 2. ✅ Tambah Animasi Sederhana pada Nav Toggle

**File:** `assets/css/style.css`

**Perubahan:**
- Menambahkan `transition: all 0.3s ease-in-out;` pada `header nav`
- Tombol hamburger: `transition: transform 0.3s ease;` + hover effect
- Efek: Menu membuka/menutup dengan smooth transition, tombol scale saat hover

---

## 3. ✅ Perluas initTableFilter

**File:** `assets/js/app.js`

**Perubahan:**
- Menambahkan **counter result** yang menampilkan jumlah data tersaring
- Format: "Ditemukan: 3 dari 10 data"
- Counter hanya muncul saat ada pencarian (keyword tidak kosong)
- Counter otomatis dibuat jika belum ada

---

## 4. ✅ Tambah Counter Jumlah Baris Tersisa

**File:** `assets/css/style.css`, `assets/js/app.js`

**Perubahan CSS:**
- Menambahkan class `.filter-counter` dengan styling:
  - Background: `#eef4fa` (biru muda)
  - Border-left: `3px solid #1d5b8a` (indikator visual)
  - Font: `0.9rem`, warna `#1d5b8a`, **bold**
  - Margin-top: `0.5rem`

---

## 5. ✅ Refactor Validasi dengan Array

**File:** `assets/js/app.js`

**Perubahan:**
- Mengubah `initValidasiForm()` menggunakan **array-based field definition**
- Setiap field dalam array punya:
  - `selector` — CSS selector untuk elemen input
  - `pesan` — pesan error jika validasi gagal
  - `validate()` — fungsi yang return `true/false`
  - `optional` — flag untuk field yang boleh kosong

**Keuntungan:**
- ✅ Lebih mudah menambah/menghapus field
- ✅ Logika validasi lebih jelas dan terpusat
- ✅ Mengurangi duplikasi kode
- ✅ Mudah di-maintain dan diperluas

**Struktur field validation:**
```javascript
const fieldsToValidate = [
    {
        selector: "[name='judul'], [name='nama']",
        pesan: "Field ini wajib diisi.",
        validate: (val) => val.trim() !== ""
    },
    {
        selector: "[name='isbn']",
        pesan: "ISBN harus 10 atau 13 digit (boleh kosong).",
        validate: (val) => val.trim() === "" || isValidISBN(val),
        optional: true
    },
    // ... field lainnya
];
```

---

## 📝 Testing Checklist

### Validasi ISBN
- [ ] Submit form dengan ISBN kosong → **Berhasil**
- [ ] Submit form dengan ISBN 10 digit → **Berhasil**
- [ ] Submit form dengan ISBN 13 digit → **Berhasil**
- [ ] Submit form dengan ISBN 5 digit → **Error**

### Animasi Nav
- [ ] Klik menu hamburger → menu membuka dengan **smooth transition**
- [ ] Hover tombol hamburger → tombol **scale up** dengan smooth
- [ ] Responsive di mobile → animasi tetap berfungsi

### Counter Filter
- [ ] Ketik di kolom cari → counter muncul dengan jumlah data
- [ ] Hapus semua teks pencarian → counter hilang
- [ ] Counter menampilkan format: "Ditemukan: X dari Y data"

### Refactor Validasi
- [ ] Semua validasi field tetap berfungsi seperti sebelumnya
- [ ] Pesan error tetap tampil inline
- [ ] Form tidak bisa submit jika ada error

---

## 📂 File yang Dimodifikasi

1. **`assets/js/app.js`** — Refactor validasi, tambah ISBN validation, tambah counter
2. **`assets/css/style.css`** — Tambah animasi, styling counter
3. **`buku/tambah.html`** — (Sudah punya field ISBN, tidak perlu perubahan)

---

## 🎯 Catatan Implementasi

- Validasi masih **client-side only** — Server-side validation ditambahkan di Jobsheet 7+
- Counter filter adalah **real-time** — update otomatis saat user mengetik
- Animasi menggunakan **CSS transition** — tidak perlu JS animation library
- Refactor validasi **backward compatible** — tidak mengubah behavior
- Semua tugas **optional** → tidak wajib untuk lulus, tapi bagus untuk portfolio 💼

