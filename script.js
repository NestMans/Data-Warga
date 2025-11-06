document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("vehicleForm");
    const tableBody = document.getElementById("tableBody");
    const searchInput = document.getElementById("search");

    // Ambil data dari localStorage (jika ada)
    let allData = JSON.parse(localStorage.getItem("vehicleData")) || [];

    // Fungsi untuk menyimpan ke localStorage
    function saveToLocalStorage() {
        localStorage.setItem("vehicleData", JSON.stringify(allData));
    }

    // Tampilkan data di tabel
    function renderTable(dataToRender = allData) {
        tableBody.innerHTML = "";
        
        dataToRender.forEach((item, index) => {
            const row = document.createElement("tr");
            
            // Mencari indeks asli dari item di array allData
            // Ini PENTING untuk memastikan tombol Hapus bekerja dengan benar saat ada filter
            const originalIndex = allData.findIndex(d => 
                d.nama === item.nama && 
                d.platMobil === item.platMobil
                // Asumsi Nama dan Plat Mobil cukup unik
            );

            row.innerHTML = `
                <td>${item.nama}</td>
                <td>${item.alamat}</td>
                <td>${item.platMobil}</td>
                <td>${item.jenisMobil}</td>
                <td>${item.warnaMobil}</td>
                <td>
                    <button class="delete-btn" data-index="${originalIndex}">Hapus</button>
                </td>
            `;
            tableBody.appendChild(row);
        });

        // Event tombol hapus
        document.querySelectorAll(".delete-btn").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const indexToRemove = parseInt(e.target.dataset.index);
                
                // Hapus dari array allData menggunakan indeks asli
                allData.splice(indexToRemove, 1);
                
                // Simpan perubahan dan render ulang tabel (dengan atau tanpa filter)
                saveToLocalStorage();
                
                // Panggil renderTable dengan filter jika sedang ada keyword pencarian
                const keyword = searchInput.value.toLowerCase();
                if (keyword) {
                    const filtered = allData.filter(item =>
                        item.nama.toLowerCase().includes(keyword) ||
                        item.alamat.toLowerCase().includes(keyword) ||
                        item.platMobil.toLowerCase().includes(keyword)
                    );
                    renderTable(filtered);
                } else {
                    renderTable();
                }
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
        saveToLocalStorage();
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