# TA6PPW - WeatherGuard

WeatherGuard adalah aplikasi cuaca berbasis web yang modern, responsif, dan interaktif. Aplikasi ini dibangun untuk memberikan informasi cuaca yang akurat secara real-time serta prakiraan cuaca untuk 5 hari ke depan.

## Tampilan Aplikasi

### Light Mode
![Light Mode](https://github.com/user-attachments/assets/8c1ffa26-5bbf-4362-80d9-10778786be71)

### Dark Mode
![Dark Mode](https://github.com/user-attachments/assets/dba976f6-5e81-461a-94fc-9d25fa863947)

### Suggest Search
![Suggest Search](https://github.com/user-attachments/assets/facc93dc-11fd-4e07-aa1b-f84d78da8e9a)

## Fitur Utama

### 1. Tampilan Cuaca Saat Ini (Current Weather)
* **Informasi Lengkap:** Menampilkan suhu, kelembaban, dan kecepatan angin.
* **Kondisi Visual:** Ikon cuaca dinamis dan deskripsi kondisi langit.
* **Lokasi & Waktu:** Menampilkan nama lokasi dan penanda waktu (timestamp).
* **Real-time Updates:** Data diperbarui secara otomatis setiap 5 menit tanpa perlu refresh halaman manual.

### 2. Ramalan Cuaca 5 Hari (5-Day Forecast)
* **Prediksi Harian:** Kartu informasi cuaca untuk 5 hari ke depan.
* **Suhu Min/Max:** Estimasi suhu terendah dan tertinggi setiap harinya.
* **Visualisasi:** Dilengkapi ikon cuaca visual dan deskripsi singkat.

### 3. Fungsionalitas Pencarian (Search)
* **Pencarian Kota:** Mencari data cuaca berdasarkan nama kota di seluruh dunia.
* **Auto-complete:** Saran nama kota muncul otomatis saat mengetik untuk meningkatkan akurasi pencarian.
* **Favorit:** Simpan kota-kota penting ke dalam daftar favorit untuk akses cepat (tersimpan aman di Local Storage browser).

### 4. Fitur Interaktif & UI
* **Tema Gelap/Terang:** Toggle tema (Dark/Light Mode) yang nyaman di mata.
* **Konversi Satuan:** Kemudahan beralih satuan suhu antara Celcius dan Fahrenheit.
* **Manual Refresh:** Tombol khusus untuk memperbarui data seketika.
* **Loading Indicators:** Indikator visual saat data sedang diproses atau jika terjadi kesalahan jaringan.

---

## Teknologi yang Digunakan

**Frontend:**
* HTML
* JavaScript (Vanilla)
* Tailwind CSS

**Backend:**
* PHP (API Wrapper/Proxy)

**Data Source:**
* OpenWeatherMap API

---

## Cara Menjalankan

Ikuti langkah-langkah berikut untuk menjalankan proyek di komputer lokal (Localhost):

1. **Clone atau Download**
   Unduh repositori ini atau lakukan clone menggunakan Git.

2. **Pindahkan ke Root Server**
   Pindahkan folder proyek ke dalam direktori root web server Anda.
   (Contoh untuk XAMPP: `C:\xampp\htdocs\nama-folder`)

3. **Konfigurasi API Key**
   * Buka file `weather.php`.
   * Cari variabel `$apiKey`.
   * Masukkan API Key OpenWeatherMap Anda pada variabel tersebut.

4. **Jalankan Server**
   * Buka XAMPP Control Panel.
   * Klik Start pada modul Apache.

5. **Akses Aplikasi**
   * Buka browser dan kunjungi alamat: `http://localhost/nama-folder/`

---

## Troubleshooting

Jika data cuaca tidak muncul (loading terus-menerus), pastikan ekstensi cURL sudah aktif di konfigurasi PHP Anda:

1. Buka file konfigurasi `php.ini`.
2. Cari baris `;extension=curl`.
3. Hapus tanda titik koma (;) di depan baris tersebut agar menjadi `extension=curl`.
4. Simpan file dan restart Apache pada XAMPP.
