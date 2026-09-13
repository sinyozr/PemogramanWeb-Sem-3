async function muatDataGenerik(urlJSON, daftarKunci) {
  const tbody = document.querySelector(".table-responsive table tbody");
  const loading = document.getElementById("loading-indicator");
  if (!tbody) return;

  if (loading) loading.style.display = "block";
  tbody.innerHTML = "";

  try {
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const res = await fetch(urlJSON);
    if (!res.ok) {
      throw new Error("Gagal mengambil data (status " + res.status + ")");
    }
    const dataArray = await res.json();

    dataArray.forEach(function (item) {
      const tr = document.createElement("tr");
      let selHTML = "";

      daftarKunci.forEach(function (kunci) {
        selHTML += `<td>${item[kunci]}</td>`;
      });

      selHTML += `<td>
                            <button type="button">Edit</button> 
                            <button type="button" class="btn-hapus">Hapus</button>
                        </td>`;

      tr.innerHTML = selHTML;
      tbody.appendChild(tr);
    });
  } catch (err) {
    tbody.innerHTML = `<tr><td colspan="${daftarKunci.length + 1}">Gagal memuat data: ${err.message}</td></tr>`;
  } finally {
    if (loading) loading.style.display = "none";
  }
}