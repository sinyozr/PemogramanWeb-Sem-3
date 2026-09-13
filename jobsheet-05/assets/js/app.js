// ===== Hamburger menu (JS-driven, menggantikan checkbox hack) =====
function initNavToggle() {
  const toggleBtn = document.getElementById("nav-toggle-btn");
  const nav = document.querySelector("header nav");
  if (!toggleBtn || !nav) return;

  toggleBtn.addEventListener("click", function () {
    nav.classList.toggle("nav-open");
  });
}

// ===== Konfirmasi hapus (front-end only, belum ke server) =====
function initHapusConfirm() {
  document.querySelectorAll(".btn-hapus").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const row = btn.closest("tr");
      const nama = row ? row.querySelector("td")?.textContent : "data ini";
      const yakin = confirm('Yakin ingin menghapus "' + nama + '"?');
      if (yakin && row) {
        row.remove();
      }
    });
  });
}

// ===== Filter/pencarian tabel real-time =====
function initTableFilter() {
  const input = document.getElementById("search-input");
  const table = document.querySelector(".table-responsive table");
  if (!input || !table) return;

  input.addEventListener("keyup", function () {
    const keyword = input.value.toLowerCase();
    const rows = table.querySelectorAll("tbody tr");

    rows.forEach(function (row) {
      const selJudul = row.querySelector("td");
      if (selJudul) {
        const teks = selJudul.textContent.toLowerCase();
        row.style.display = teks.includes(keyword) ? "" : "none";
      }
    });
    function updateCounter() {
      const baris = document.querySelectorAll(".table-responsive tbody tr");
      const teksCounter = document.getElementById("teks-counter");
      if (!teksCounter) return;

      let sisa = 0;
      baris.forEach(function (row) {
        if (row.style.display !== "none") sisa++;
      });

      teksCounter.textContent = `Menampilkan ${sisa} dari ${baris.length} buku`;
    }

    updateCounter();
  });
}

// ===== Validasi form (client-side) =====
function tampilkanError(input, pesan) {
  hapusError(input);
  const span = document.createElement("span");
  span.className = "error";
  span.textContent = pesan;
  input.insertAdjacentElement("afterend", span);
}

function hapusError(input) {
  const next = input.nextElementSibling;
  if (next && next.classList.contains("error")) {
    next.remove();
  }
}

function initValidasiForm() {
  const form = document.getElementById("form-tambah");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    let valid = true;

    const aturanValidasi = [
      {
        namaField: "judul",
        syarat: (nilai) => nilai.trim() !== "",
        pesanError: "Field ini wajib diisi.",
      },
      {
        namaField: "pengarang",
        syarat: (nilai) => nilai.trim() !== "",
        pesanError: "Pengarang wajib diisi.",
      },
      {
        namaField: "tahun",
        syarat: (nilai) =>
          !isNaN(parseInt(nilai)) &&
          parseInt(nilai) >= 1900 &&
          parseInt(nilai) <= 2026,
        pesanError: "Tahun harus di antara 1900-2026.",
      },
      {
        namaField: "stok",
        syarat: (nilai) => !isNaN(parseInt(nilai)) && parseInt(nilai) >= 0,
        pesanError: "Stok tidak boleh negatif.",
      },
      {
        namaField: "isbn",
        syarat: (nilai) => nilai.trim() === "" || /^[0-9-]+$/.test(nilai),
        pesanError: "ISBN hanya boleh berisi angka dan tanda hubung.",
      },
    ];

    aturanValidasi.forEach(function (aturan) {
      const input = form.querySelector(`[name='${aturan.namaField}']`);

      if (input) {
        const lolosValidasi = aturan.syarat(input.value);

        if (!lolosValidasi) {
          tampilkanError(input, aturan.pesanError);
          valid = false;
        } else {
          hapusError(input);
        }
      }
    });

    if (!valid) {
      e.preventDefault();
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  initNavToggle();
  initHapusConfirm();
  initTableFilter();
  initValidasiForm();
});