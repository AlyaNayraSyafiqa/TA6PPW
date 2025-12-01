# TA6PPW

WeatherGuard adalah aplikasi cuaca berbasis web yang modern, responsif, dan interaktif. Aplikasi ini dibangun untuk memberikan informasi cuaca yang akurat secara real-time serta prakiraan cuaca untuk 5 hari ke depan.

##Light Mode 
<img width="1076" height="833" alt="image" src="https://github.com/user-attachments/assets/8c1ffa26-5bbf-4362-80d9-10778786be71" />

##Dark Mode
<img width="909" height="732" alt="image" src="https://github.com/user-attachments/assets/dba976f6-5e81-461a-94fc-9d25fa863947" />

##Suggest Search 
<img width="1063" height="832" alt="image" src="https://github.com/user-attachments/assets/facc93dc-11fd-4e07-aa1b-f84d78da8e9a" />


## Fitur Utama

### 1. Tampilan Cuaca Saat Ini (Current Weather)
 Informasi Lengkap: Menampilkan suhu, kelembaban, dan kecepatan angin.
 Kondisi Visual: Ikon cuaca dinamis dan deskripsi kondisi langit.
 Lokasi & Waktu: Menampilkan lokasi dan penanda waktu (timestamp).
 Real-time Updates: Data diperbarui secara otomatis setiap 5 menit tanpa perlu refresh halaman manual.

### 2. Ramalan Cuaca 5 Hari (5-Day Forecast)
 Prediksi Harian: Kartu informasi untuk 5 hari ke depan.
 Suhu Min/Max: Estimasi suhu terendah dan tertinggi setiap harinya.
 Visualisasi: Dilengkapi ikon cuaca dan deskripsi singkat.

### 3. Fungsionalitas Pencarian (Search)
 Pencarian Kota: Mencari data cuaca berdasarkan nama kota di seluruh dunia.
 Auto-complete: Saran nama kota muncul otomatis saat mengetik untuk akurasi pencarian.
 Favorit: Simpan kota-kota penting ke dalam daftar favorit untuk akses cepat (tersimpan di Local Storage browser).

### 4. Fitur Interaktif & UI
 Tema Gelap/Terang: Toggle tema (Dark/Light Mode) yang nyaman di mata.
 Konversi Satuan: Kemudahan beralih antara Celcius dan Fahrenheit.
 Manual Refresh: Tombol khusus untuk memperbarui data seketika.
 Loading Indicators: Indikator visual saat data sedang diproses atau jika terjadi kesalahan.

---

## Teknologi yang Digunakan
 Frontend:
     HTML
     JavaScript
     Tailwind CSS 
 Backend:
     PHP 
 Data Source:
     OpenWeatherMap API

## Cara Menjalankan
1. Clone atau Download repositori ini.
2. Pindahkan folder proyek ke dalam direktori root web server.
   (Contoh XAMPP: C:\xampp\htdocs\nama-folder)
3. Konfigurasi API Key:
   - Buka file weather.php.
   - Cari variabel $apiKey.
   - Masukkan API Key OpenWeatherMap (boleh kalau mau pakai punya saya)
4. Jalankan Server:
   - Buka XAMPP Control Panel dan nyalakan module Apache.
5. Akses Aplikasi:
   - Buka browser dan kunjungi: http://localhost/nama-folder/
