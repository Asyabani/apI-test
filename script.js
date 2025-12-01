// URL API cuaca Jakarta
const API_URL =
  'https://api.open-meteo.com/v1/forecast?latitude=-6.2&longitude=106.8&hourly=temperature_2m';

const statusEl = document.getElementById('status');
const tbody = document.getElementById('weather-body');

// Fungsi untuk format waktu jadi lebih enak dibaca (lokal Indonesia)
function formatWaktu(isoString) {
  const date = new Date(isoString);
  return date.toLocaleString('id-ID', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

// Ambil data dari API ketika halaman selesai dimuat
document.addEventListener('DOMContentLoaded', function () {
  fetch(API_URL)
    .then(response => {
      if (!response.ok) {
        throw new Error('Gagal mengambil data. Status: ' + response.status);
      }
      return response.json();
    })
    .then(data => {
      // Pastikan struktur data sesuai
      const times = data.hourly.time;
      const temps = data.hourly.temperature_2m;

      // Tentukan berapa banyak data yang mau ditampilkan
      const jumlahData = Math.min(10, times.length);

      // Hapus teks "Memuat..." karena data sudah siap
      statusEl.textContent =
        'Berhasil memuat data. Menampilkan ' + jumlahData + ' data pertama.';

      // Loop dan buat baris tabel
      for (let i = 0; i < jumlahData; i++) {
        const tr = document.createElement('tr');

        const tdNo = document.createElement('td');
        tdNo.textContent = i + 1;

        const tdTime = document.createElement('td');
        tdTime.textContent = formatWaktu(times[i]);

        const tdTemp = document.createElement('td');
        tdTemp.textContent = temps[i].toFixed(1) + ' °C';

        tr.appendChild(tdNo);
        tr.appendChild(tdTime);
        tr.appendChild(tdTemp);

        tbody.appendChild(tr);
      }
    })
    .catch(error => {
      console.error(error);
      statusEl.textContent = 'Terjadi kesalahan saat memuat data cuaca.';
      statusEl.classList.remove('loading');
      statusEl.classList.add('error');
    });
});
