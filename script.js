document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("vehicleForm");
    const tableBody = document.getElementById("tableBody");
    const searchInput = document.getElementById("search");

    // Ambil data dari localStorage (jika ada)
    let allData = JSON.parse(localStorage.getItem("vehicleData")) || [];

    // Tampilkan data di tabel
    function renderTable(data = allData) {
        tableBody.innerHTML = "";
        data.forEach((item, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.nama}</td>
                <td>${item.alamat}</td>
                <td>${item.platMobil}</td>
                <td>${item.jenisMobil}</td>
                <td>${item.warnaMobil}</td>
                <td><button class="delete-btn" data-index="${index}">Hapus</button></td>
            `;
            tableBody.appendChild(row);
        });

        // Event tombol hapus
        document.querySelectorAll(".delete-btn").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const index = e.target.dataset.index;
                allData.splice(index, 1);
                localStorage.setItem("vehicleData", JSON.stringify(allData));
                renderTable();
            });
        });
    }

    // Saat form disubmit
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const newData = {
            nama: document.getElementById("nama").value,
            alamat: document.getElementById("alamat").value,
            platMobil: document.getElementById("platMobil").value,
            jenisMobil: document.getElementById("jenisMobil").value,
            warnaMobil: document.getElementById("warnaMobil").value
        };

        allData.push(newData);
        localStorage.setItem("vehicleData", JSON.stringify(allData));
        renderTable();
        form.reset();
    });

    // Fitur pencarian
    searchInput.addEventListener("input", () => {
        const keyword = searchInput.value.toLowerCase();
        const filtered = allData.filter(item =>
            item.nama.toLowerCase().includes(keyword) ||
            item.alamat.toLowerCase().includes(keyword) ||
            item.platMobil.toLowerCase().includes(keyword)
        );
        renderTable(filtered);
    });

    // Tampilkan data saat halaman dibuka
    renderTable();
});
