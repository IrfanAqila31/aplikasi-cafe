# Requirements Document

## Introduction

Fitur ini menambahkan fungsionalitas keranjang belanja (cart) yang lengkap pada aplikasi Palora Cafe. Saat ini aplikasi hanya menyimpan total item dan total harga secara agregat. Fitur ini mengubah state management menjadi berbasis array cart items sehingga setiap produk dapat dilacak secara individual, menampilkan quantity counter di setiap card produk, dan menyediakan halaman checkout (`/checkout`) yang menampilkan ringkasan pesanan lengkap beserta kemampuan mengubah quantity dari halaman tersebut.

## Glossary

- **Cart**: Keranjang belanja virtual yang menyimpan daftar produk beserta jumlah yang dipesan.
- **CartItem**: Satu entri dalam Cart yang merepresentasikan satu produk beserta quantity-nya. Memiliki properti: `id`, `name`, `price`, `quantity`, `image`, `category`.
- **CartState**: State global yang menyimpan array of CartItem, dikelola di `App.tsx` dan diteruskan ke komponen yang membutuhkan.
- **ProductSection**: Komponen yang menampilkan daftar produk dari `menuData` dalam bentuk grid card.
- **ProductCard**: Satu card produk di dalam ProductSection yang menampilkan informasi produk dan kontrol quantity.
- **QuantityCounter**: Elemen UI pada ProductCard yang menampilkan jumlah item yang dipilih beserta tombol `+` dan `-`.
- **FloatingCart**: Komponen floating button yang muncul di bagian bawah layar ketika Cart tidak kosong, menampilkan total item dan total harga.
- **CheckoutPage**: Halaman di route `/checkout` yang menampilkan ringkasan pesanan lengkap.
- **Subtotal**: Hasil perkalian `price × quantity` untuk satu CartItem.
- **Total**: Jumlah keseluruhan dari semua Subtotal dalam Cart.
- **Product**: Interface data produk dari `src/data/Menu.ts` dengan properti `id`, `name`, `description`, `price`, `image`, `category`.

---

## Requirements

### Requirement 1: Refactor Cart State Management

**User Story:** Sebagai developer, saya ingin mengubah state Cart dari agregat sederhana menjadi array of CartItem, agar setiap produk dapat dilacak secara individual dengan quantity masing-masing.

#### Acceptance Criteria

1. THE `App` SHALL menyimpan CartState sebagai array of CartItem (bukan hanya `totalItem` dan `totalHarga`).
2. THE `App` SHALL menyediakan fungsi `addItem(product: Product)` yang menambah quantity CartItem sebesar 1 jika produk sudah ada di Cart, atau menambahkan CartItem baru dengan quantity 1 jika belum ada.
3. THE `App` SHALL menyediakan fungsi `removeItem(productId: number)` yang mengurangi quantity CartItem sebesar 1, dan menghapus CartItem dari array jika quantity mencapai 0.
4. THE `App` SHALL menyediakan fungsi `updateQuantity(productId: number, quantity: number)` yang mengatur quantity CartItem ke nilai tertentu, dan menghapus CartItem dari array jika quantity yang diberikan adalah 0.
5. WHEN CartState berubah, THE `App` SHALL menghitung ulang `totalItem` (jumlah seluruh quantity) dan `totalHarga` (jumlah seluruh Subtotal) secara derived dari CartState.
6. THE `CartItem` SHALL memiliki properti: `id: number`, `name: string`, `price: number`, `quantity: number`, `image: string`, `category: string`.

---

### Requirement 2: Quantity Counter pada ProductCard

**User Story:** Sebagai pelanggan, saya ingin melihat dan mengubah jumlah item yang ingin saya pesan langsung dari card produk, agar saya dapat mengatur pesanan dengan mudah sebelum checkout.

#### Acceptance Criteria

1. THE `ProductCard` SHALL menampilkan QuantityCounter yang terdiri dari tombol `-`, angka quantity saat ini, dan tombol `+`.
2. WHEN tombol `+` pada ProductCard ditekan, THE `ProductSection` SHALL memanggil `addItem` dengan data produk yang sesuai sehingga quantity CartItem bertambah 1.
3. WHEN tombol `-` pada ProductCard ditekan dan quantity produk tersebut lebih dari 0, THE `ProductSection` SHALL memanggil `removeItem` dengan `productId` yang sesuai sehingga quantity CartItem berkurang 1.
4. WHILE quantity produk pada CartState adalah 0, THE `ProductCard` SHALL menampilkan tombol `-` dalam kondisi disabled (tidak dapat diklik dan memiliki tampilan visual yang berbeda).
5. THE `ProductCard` SHALL menampilkan angka quantity yang selalu sinkron dengan CartState untuk produk yang bersangkutan.
6. WHEN quantity produk pada CartState adalah 0, THE `ProductCard` SHALL menampilkan angka `0` pada QuantityCounter.

---

### Requirement 3: FloatingCart dengan Navigasi ke Checkout

**User Story:** Sebagai pelanggan, saya ingin menekan tombol "Pesan" pada FloatingCart untuk diarahkan ke halaman pesanan, agar saya dapat melihat dan mengkonfirmasi ringkasan pesanan saya.

#### Acceptance Criteria

1. WHILE CartState tidak kosong (totalItem > 0), THE `FloatingCart` SHALL ditampilkan di bagian bawah layar.
2. WHILE CartState kosong (totalItem = 0), THE `FloatingCart` SHALL disembunyikan dari tampilan.
3. THE `FloatingCart` SHALL menampilkan `totalItem` dalam format "[n] item" dan `totalHarga` dalam format "Rp [harga]" dengan pemisah ribuan menggunakan `toLocaleString("id-ID")`.
4. WHEN tombol "Pesan" pada `FloatingCart` ditekan, THE `FloatingCart` SHALL mengarahkan pengguna ke halaman `/checkout` menggunakan React Router navigation.

---

### Requirement 4: Halaman Checkout — Tampilan Ringkasan Pesanan

**User Story:** Sebagai pelanggan, saya ingin melihat daftar lengkap item yang saya pesan beserta detail harga di halaman checkout, agar saya dapat memverifikasi pesanan sebelum mengkonfirmasi.

#### Acceptance Criteria

1. THE `CheckoutPage` SHALL menampilkan daftar semua CartItem yang ada di CartState.
2. THE `CheckoutPage` SHALL menampilkan informasi berikut untuk setiap CartItem: nama produk, gambar produk, harga satuan dalam format "Rp [harga]", quantity saat ini, dan Subtotal dalam format "Rp [subtotal]".
3. THE `CheckoutPage` SHALL menampilkan Total keseluruhan pesanan dalam format "Rp [total]" di bagian bawah daftar.
4. WHEN CartState kosong dan pengguna mengakses `/checkout`, THE `CheckoutPage` SHALL menampilkan pesan "Keranjang belanja kamu masih kosong" beserta tautan atau tombol untuk kembali ke halaman utama.
5. THE `CheckoutPage` SHALL menampilkan semua nilai harga menggunakan format Rupiah dengan `toLocaleString("id-ID")`.

---

### Requirement 5: Quantity Control pada Halaman Checkout

**User Story:** Sebagai pelanggan, saya ingin mengubah quantity item langsung dari halaman checkout, agar saya dapat menyesuaikan pesanan tanpa harus kembali ke halaman utama.

#### Acceptance Criteria

1. THE `CheckoutPage` SHALL menampilkan tombol `+` dan `-` untuk setiap CartItem dalam daftar pesanan.
2. WHEN tombol `+` pada CartItem di `CheckoutPage` ditekan, THE `CheckoutPage` SHALL memanggil `addItem` sehingga quantity CartItem bertambah 1 dan tampilan diperbarui secara langsung.
3. WHEN tombol `-` pada CartItem di `CheckoutPage` ditekan dan quantity CartItem lebih dari 1, THE `CheckoutPage` SHALL memanggil `removeItem` sehingga quantity CartItem berkurang 1 dan tampilan diperbarui secara langsung.
4. WHEN tombol `-` pada CartItem di `CheckoutPage` ditekan dan quantity CartItem adalah 1, THE `CheckoutPage` SHALL menghapus CartItem tersebut dari daftar pesanan (quantity menjadi 0, item dihapus dari CartState).
5. WHILE quantity CartItem adalah 1, THE `CheckoutPage` SHALL menampilkan tombol `-` dalam kondisi aktif (dapat diklik) karena menekannya akan menghapus item.
6. WHEN semua CartItem dihapus dari `CheckoutPage`, THE `CheckoutPage` SHALL menampilkan pesan "Keranjang belanja kamu masih kosong" beserta tautan atau tombol untuk kembali ke halaman utama.

---

### Requirement 6: Konfirmasi Pesanan

**User Story:** Sebagai pelanggan, saya ingin menekan tombol konfirmasi di halaman checkout untuk melanjutkan proses pemesanan, agar saya dapat menyelesaikan transaksi.

#### Acceptance Criteria

1. THE `CheckoutPage` SHALL menampilkan tombol "Konfirmasi Pesanan" di bagian bawah ringkasan pesanan.
2. WHILE CartState tidak kosong, THE `CheckoutPage` SHALL menampilkan tombol "Konfirmasi Pesanan" dalam kondisi aktif (dapat diklik).
3. WHILE CartState kosong, THE `CheckoutPage` SHALL menyembunyikan atau menonaktifkan tombol "Konfirmasi Pesanan".
4. WHEN tombol "Konfirmasi Pesanan" ditekan, THE `CheckoutPage` SHALL menampilkan notifikasi atau pesan konfirmasi kepada pengguna (misalnya alert atau toast message) yang menyatakan pesanan berhasil dikonfirmasi.
