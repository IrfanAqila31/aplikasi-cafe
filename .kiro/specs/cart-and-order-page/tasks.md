# Implementation Plan: Cart and Order Page

## Overview

Implementasi fitur cart berbasis `CartItem[]` untuk Palora Cafe. Refactor state management di `App.tsx`, tambahkan `QuantityCounter` di `ProductSection`, hubungkan `FloatingCart` ke React Router, dan implementasi `CheckoutPage` lengkap dengan quantity control dan konfirmasi pesanan. Stack: React + TypeScript + Vite + Tailwind CSS + Framer Motion.

## Tasks

- [x] 1. Setup testing framework dan tipe data CartItem
  - [x] 1.1 Install dependensi testing
    - Jalankan `npm install --save-dev vitest @testing-library/react @testing-library/user-event jsdom fast-check @vitest/coverage-v8`
    - Tambahkan konfigurasi `test` ke `vite.config.ts`: `environment: 'jsdom'`, `globals: true`, `setupFiles: './src/test/setup.ts'`
    - Buat file `src/test/setup.ts` dengan import `@testing-library/jest-dom`
    - Tambahkan script `"test": "vitest --run"` ke `package.json`
    - _Requirements: —_

  - [x] 1.2 Buat tipe `CartItem` di `src/types/cart.ts`
    - Definisikan interface `CartItem` dengan properti: `id: number`, `name: string`, `price: number`, `quantity: number`, `image: string`, `category: string`
    - Export interface tersebut
    - _Requirements: 1.6_

- [x] 2. Implementasi fungsi mutasi cart sebagai pure functions yang dapat diuji
  - [x] 2.1 Buat `src/utils/cartUtils.ts` dengan fungsi `addItem`, `removeItem`, `updateQuantity`, `getTotalItem`, `getTotalHarga`
    - `addItem(prev: CartItem[], product: Product): CartItem[]` — tambah quantity 1 jika sudah ada, atau tambah item baru dengan quantity 1
    - `removeItem(prev: CartItem[], productId: number): CartItem[]` — kurangi quantity 1, hapus jika quantity mencapai 0
    - `updateQuantity(prev: CartItem[], productId: number, quantity: number): CartItem[]` — set quantity, hapus jika quantity ≤ 0
    - `getTotalItem(cartItems: CartItem[]): number` — jumlah seluruh quantity
    - `getTotalHarga(cartItems: CartItem[]): number` — jumlah seluruh subtotal
    - _Requirements: 1.2, 1.3, 1.4, 1.5_

  - [x] 2.2 Tulis unit test untuk `cartUtils.ts` di `src/utils/cartUtils.test.ts`
    - `addItem` pada cart kosong → CartItem baru dengan quantity 1
    - `addItem` pada produk yang sudah ada → quantity bertambah 1
    - `removeItem` pada quantity 1 → item dihapus dari array
    - `removeItem` pada quantity > 1 → quantity berkurang 1
    - `updateQuantity` dengan nilai 0 → item dihapus
    - `getTotalItem` dan `getTotalHarga` pada cart kosong → keduanya 0
    - _Requirements: 1.2, 1.3, 1.4, 1.5_

  - [x] 2.3 Tulis property test untuk logika cart di `src/utils/cartLogic.property.test.ts`
    - **Property 1: addItem menambah quantity atau membuat item baru**
    - **Validates: Requirements 1.2**
    - **Property 2: removeItem mengurangi quantity atau menghapus item**
    - **Validates: Requirements 1.3**
    - **Property 3: updateQuantity mengatur quantity atau menghapus item**
    - **Validates: Requirements 1.4**
    - **Property 4: totalItem dan totalHarga adalah derived yang akurat**
    - **Validates: Requirements 1.5**
    - Setiap property dikonfigurasi dengan `numRuns: 100`

- [x] 3. Refactor `App.tsx` — migrasi CartState ke `CartItem[]`
  - [x] 3.1 Ganti state `totalItem` dan `totalHarga` dengan `cartItems: CartItem[]` di `App.tsx`
    - Import `CartItem` dari `src/types/cart.ts` dan fungsi dari `src/utils/cartUtils.ts`
    - Definisikan `const [cartItems, setCartItems] = useState<CartItem[]>([])`
    - Hitung `totalItem` dan `totalHarga` menggunakan `useMemo` dari `cartItems`
    - Implementasi handler `handleAddItem(product: Product)`, `handleRemoveItem(productId: number)`, `handleUpdateQuantity(productId: number, quantity: number)` menggunakan fungsi dari `cartUtils.ts`
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_

  - [x] 3.2 Perbarui props yang diteruskan ke `HomePage` dan `CheckoutPage` di `App.tsx`
    - `HomePage` menerima: `cartItems`, `onAddItem`, `onRemoveItem`, `totalItem`, `totalHarga`
    - `CheckoutPage` menerima: `cartItems`, `onAddItem`, `onRemoveItem`
    - Hapus prop `onAddToCart` lama
    - _Requirements: 1.1_

- [x] 4. Refactor `ProductSection.tsx` dan `ProductCard` — tambahkan QuantityCounter
  - [x] 4.1 Perbarui interface `ProductSectionProps` dan logika di `ProductSection.tsx`
    - Ganti prop `onAddToCart` dengan `cartItems: CartItem[]`, `onAddItem: (product: Product) => void`, `onRemoveItem: (productId: number) => void`
    - Untuk setiap `ProductCard`, hitung `quantity` dari `cartItems.find(i => i.id === item.id)?.quantity ?? 0`
    - _Requirements: 2.1, 2.5_

  - [x] 4.2 Ganti tombol "Pesan" dengan `QuantityCounter` di dalam `ProductCard` (inline di `ProductSection`)
    - Tampilkan tiga elemen: tombol `−`, angka quantity, tombol `+`
    - Tombol `−` memiliki atribut `disabled` dan styling visual berbeda (opacity rendah, `cursor-not-allowed`) saat `quantity === 0`
    - Tombol `+` selalu aktif, memanggil `onAddItem(item)`
    - Tombol `−` aktif saat `quantity > 0`, memanggil `onRemoveItem(item.id)`
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.6_

  - [x] 4.3 Tulis property test untuk `ProductCard` di `src/components/productCard.property.test.tsx`
    - **Property 5: Quantity yang ditampilkan di ProductCard sinkron dengan CartState**
    - **Validates: Requirements 2.5**
    - **Property 6: Tombol minus di ProductCard disabled saat quantity 0**
    - **Validates: Requirements 2.4**

  - [x] 4.4 Tulis unit test untuk `ProductSection` di `src/components/ProductSection.test.tsx`
    - Tombol `−` disabled saat quantity = 0
    - Tombol `−` aktif saat quantity > 0
    - Klik `+` memanggil `onAddItem` dengan produk yang benar
    - Klik `−` memanggil `onRemoveItem` dengan `productId` yang benar
    - _Requirements: 2.2, 2.3, 2.4_

- [x] 5. Refactor `HomePage.tsx` — sesuaikan props baru
  - [x] 5.1 Perbarui interface `HomeProps` dan teruskan props ke `ProductSection` dan `FloatingCart`
    - Ganti `onAddToCart` dengan `cartItems`, `onAddItem`, `onRemoveItem`
    - Teruskan `cartItems`, `onAddItem`, `onRemoveItem` ke `ProductSection`
    - Teruskan `totalItem`, `totalHarga` ke `FloatingCart`
    - _Requirements: 2.1, 3.1, 3.2, 3.3_

- [x] 6. Refactor `FloatingCart.tsx` — tambahkan navigasi ke `/checkout`
  - [x] 6.1 Tambahkan `useNavigate` dari React Router dan format tampilan di `FloatingCart.tsx`
    - Import `useNavigate` dari `react-router`
    - Tambahkan `onClick` pada tombol "Pesan" yang memanggil `navigate('/checkout')`
    - Format `totalItem` sebagai `"{totalItem} item"`
    - Format `totalHarga` sebagai `"Rp {totalHarga.toLocaleString('id-ID')}"`
    - Pertahankan kondisi `if (totalItem === 0) return null`
    - _Requirements: 3.1, 3.2, 3.3, 3.4_

  - [x] 6.2 Tulis property test untuk `FloatingCart` di `src/components/floatingCart.property.test.tsx`
    - **Property 7: Visibilitas FloatingCart bergantung pada totalItem**
    - **Validates: Requirements 3.1, 3.2**
    - **Property 8: Format harga Rupiah konsisten di seluruh tampilan**
    - **Validates: Requirements 3.3**

  - [x] 6.3 Tulis unit test untuk `FloatingCart` di `src/components/FloatingCart.test.tsx`
    - Tidak dirender saat `totalItem = 0`
    - Dirender saat `totalItem > 0`
    - Klik "Pesan" memicu navigasi ke `/checkout`
    - _Requirements: 3.1, 3.2, 3.4_

- [x] 7. Checkpoint — Pastikan semua tes lulus
  - Pastikan semua tes lulus, tanyakan kepada user jika ada pertanyaan.

- [x] 8. Implementasi `CheckoutPage.tsx` — tampilan ringkasan pesanan
  - [x] 8.1 Perbarui interface `CheckoutPageProps` dan tambahkan empty state di `CheckoutPage.tsx`
    - Definisikan `CheckoutPageProps`: `cartItems: CartItem[]`, `onAddItem: (product: Product) => void`, `onRemoveItem: (productId: number) => void`
    - Hitung `totalHarga` lokal dari `cartItems` menggunakan `useMemo`
    - Tampilkan empty state dengan pesan "Keranjang belanja kamu masih kosong" dan `<Link to="/">` kembali ke halaman utama jika `cartItems.length === 0`
    - _Requirements: 4.4, 5.6_

  - [x] 8.2 Implementasi `OrderItemRow` (inline di `CheckoutPage`) untuk setiap CartItem
    - Tampilkan: gambar produk (thumbnail), nama produk, harga satuan `"Rp {price.toLocaleString('id-ID')}"`, QuantityCounter (tombol `−`, angka quantity, tombol `+`), subtotal `"Rp {(price * quantity).toLocaleString('id-ID')}"`
    - Tombol `−` selalu aktif (menekan saat quantity=1 menghapus item via `onRemoveItem`)
    - Tombol `+` memanggil `onAddItem` dengan data produk yang sesuai
    - _Requirements: 4.1, 4.2, 5.1, 5.2, 5.3, 5.4, 5.5_

  - [x] 8.3 Tambahkan section Total dan tombol "Konfirmasi Pesanan" di `CheckoutPage.tsx`
    - Tampilkan Total keseluruhan: `"Rp {totalHarga.toLocaleString('id-ID')}"`
    - Tombol "Konfirmasi Pesanan" aktif saat `cartItems.length > 0`
    - Tombol "Konfirmasi Pesanan" disembunyikan atau disabled saat `cartItems.length === 0`
    - Klik tombol menampilkan notifikasi konfirmasi menggunakan `window.alert()` atau state lokal toast
    - _Requirements: 4.3, 4.5, 6.1, 6.2, 6.3, 6.4_

  - [x] 8.4 Tulis property test untuk `CheckoutPage` di `src/pages/checkoutPage.property.test.tsx`
    - **Property 9: CheckoutPage menampilkan semua CartItem**
    - **Validates: Requirements 4.1, 4.2**
    - **Property 10: Total di CheckoutPage sama dengan totalHarga**
    - **Validates: Requirements 4.3**
    - **Property 11: Tombol Konfirmasi aktif jika dan hanya jika CartState tidak kosong**
    - **Validates: Requirements 6.2, 6.3**

  - [x] 8.5 Tulis unit test untuk `CheckoutPage` di `src/pages/CheckoutPage.test.tsx`
    - Empty state ditampilkan saat `cartItems = []`
    - Tombol "Konfirmasi Pesanan" tidak ada/disabled saat cart kosong
    - Klik "Konfirmasi Pesanan" menampilkan notifikasi
    - Semua CartItem dirender dengan nama, harga, dan quantity yang benar
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 6.1, 6.2, 6.3, 6.4_

- [x] 9. Sambungkan `CheckoutPage` ke `App.tsx` dan verifikasi routing
  - [x] 9.1 Perbarui route `/checkout` di `App.tsx` untuk meneruskan props baru
    - Teruskan `cartItems`, `onAddItem`, `onRemoveItem` ke `<CheckoutPage />`
    - Pastikan `CheckoutPage` menerima props dengan benar (tidak ada TypeScript error)
    - _Requirements: 4.1, 5.1_

- [x] 10. Final checkpoint — Pastikan semua tes lulus dan aplikasi berjalan
  - Jalankan `npm run build` untuk memastikan tidak ada TypeScript error
  - Jalankan `npm test` untuk memastikan semua tes lulus
  - Pastikan semua tes lulus, tanyakan kepada user jika ada pertanyaan.

## Notes

- Task bertanda `*` bersifat opsional dan dapat dilewati untuk MVP yang lebih cepat
- Setiap task mereferensikan requirements spesifik untuk keterlacakan
- Fungsi mutasi cart diekstrak ke `cartUtils.ts` agar dapat diuji secara terpisah dari React
- Property tests menggunakan **fast-check** dengan minimum 100 iterasi per property
- Unit tests menggunakan **Vitest** + **@testing-library/react**
- Checkpoint memastikan validasi inkremental sebelum melanjutkan ke tahap berikutnya
