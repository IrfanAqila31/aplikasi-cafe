# Design Document — Cart and Order Page

## Overview

Fitur ini mengubah sistem keranjang belanja Palora Cafe dari state agregat sederhana (`totalItem`, `totalHarga`) menjadi state berbasis array `CartItem[]` yang dapat melacak setiap produk secara individual. Perubahan ini memungkinkan tampilan quantity counter per produk di `ProductSection`, halaman checkout (`/checkout`) yang menampilkan ringkasan pesanan lengkap, serta kemampuan mengubah quantity langsung dari halaman checkout.

Pendekatan yang dipilih adalah **prop drilling** dari `App.tsx` ke komponen yang membutuhkan, konsisten dengan pola yang sudah ada di codebase. State tetap dikelola di `App.tsx` sebagai single source of truth, diteruskan ke `HomePage` dan `CheckoutPage` melalui props.

### Tujuan Utama

- Refactor `CartState` dari dua variabel agregat menjadi `CartItem[]`
- Tambahkan `QuantityCounter` pada setiap `ProductCard` di `ProductSection`
- Hubungkan `FloatingCart` ke React Router untuk navigasi ke `/checkout`
- Implementasi `CheckoutPage` dengan daftar pesanan, quantity control, dan konfirmasi pesanan

---

## Architecture

```mermaid
graph TD
    A[App.tsx\nCartState: CartItem[]\naddItem / removeItem / updateQuantity] --> B[HomePage]
    A --> C[CheckoutPage]
    B --> D[ProductSection\nonAddItem / onRemoveItem]
    B --> E[FloatingCart\ntotalItem / totalHarga]
    D --> F[ProductCard × N\nquantity dari CartState]
    C --> G[OrderItemRow × N\naddItem / removeItem]
    C --> H[OrderSummary\ntotalHarga]
    C --> I[ConfirmButton]
    E -->|useNavigate /checkout| C
```

**Alur data:**

1. `App.tsx` menyimpan `cartItems: CartItem[]` dan mengekspos tiga fungsi mutasi.
2. `totalItem` dan `totalHarga` dihitung sebagai derived value menggunakan `useMemo`.
3. `HomePage` menerima `cartItems`, `addItem`, `removeItem`, `totalItem`, `totalHarga` dan meneruskannya ke `ProductSection` dan `FloatingCart`.
4. `CheckoutPage` menerima `cartItems`, `addItem`, `removeItem` langsung dari `App.tsx`.
5. Navigasi dari `FloatingCart` ke `/checkout` menggunakan `useNavigate` dari React Router.

---

## Components and Interfaces

### 1. `App.tsx` — State Management

Komponen root yang menjadi single source of truth untuk `CartState`.

**State:**

```typescript
const [cartItems, setCartItems] = useState<CartItem[]>([]);
```

**Derived values (useMemo):**

```typescript
const totalItem = useMemo(
  () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
  [cartItems],
);
const totalHarga = useMemo(
  () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
  [cartItems],
);
```

**Fungsi yang diekspor ke props:**

- `addItem(product: Product): void`
- `removeItem(productId: number): void`
- `updateQuantity(productId: number, quantity: number): void`

**Route `/checkout`** menerima `cartItems`, `addItem`, `removeItem` sebagai props.

---

### 2. `ProductSection.tsx` — Refactor Props

**Props baru:**

```typescript
interface ProductSectionProps {
  cartItems: CartItem[];
  onAddItem: (product: Product) => void;
  onRemoveItem: (productId: number) => void;
}
```

Setiap `ProductCard` menerima `quantity` yang diambil dari `cartItems.find(i => i.id === item.id)?.quantity ?? 0`.

---

### 3. `ProductCard` (inline di `ProductSection`) — QuantityCounter

Menggantikan tombol "Pesan" tunggal dengan `QuantityCounter`:

```
[ − ]  [ 2 ]  [ + ]
```

- Tombol `−` disabled jika `quantity === 0`
- Tombol `+` selalu aktif
- Angka quantity selalu sinkron dengan `cartItems`

---

### 4. `FloatingCart.tsx` — Navigasi

**Props baru:**

```typescript
interface FloatingCartProps {
  totalItem: number;
  totalHarga: number;
}
```

Menggunakan `useNavigate` dari React Router untuk navigasi ke `/checkout` saat tombol "Pesan" ditekan. Format tampilan:

- `totalItem`: `"{n} item"`
- `totalHarga`: `"Rp {toLocaleString('id-ID')}"`

---

### 5. `CheckoutPage.tsx` — Halaman Checkout

**Props baru:**

```typescript
interface CheckoutPageProps {
  cartItems: CartItem[];
  onAddItem: (product: Product) => void;
  onRemoveItem: (productId: number) => void;
}
```

**Sub-sections:**

- **Daftar pesanan**: Iterasi `cartItems`, tampilkan `OrderItemRow` per item
- **Total**: Tampilkan `totalHarga` yang dihitung dari `cartItems`
- **Empty state**: Tampilkan pesan + link ke `/` jika `cartItems.length === 0`
- **Tombol konfirmasi**: Aktif jika `cartItems.length > 0`, tampilkan toast/alert saat diklik

---

### 6. `OrderItemRow` (inline di `CheckoutPage`)

Menampilkan satu baris CartItem:

- Gambar produk (thumbnail)
- Nama produk
- Harga satuan: `"Rp {price.toLocaleString('id-ID')}"`
- QuantityCounter: tombol `−`, angka quantity, tombol `+`
  - Tombol `−` selalu aktif (menekan saat quantity=1 menghapus item)
- Subtotal: `"Rp {(price * quantity).toLocaleString('id-ID')}"`

---

## Data Models

### `CartItem`

```typescript
// src/types/cart.ts (file baru)
export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
}
```

`CartItem` dibuat dari `Product` dengan menambahkan field `quantity`. Semua field `Product` yang relevan disalin saat `addItem` dipanggil.

### `CartState`

```typescript
// Tidak ada tipe terpisah, cukup CartItem[]
type CartState = CartItem[];
```

### Fungsi Mutasi

```typescript
// addItem: tambah quantity 1 jika sudah ada, atau tambah item baru dengan quantity 1
function addItem(product: Product): void {
  setCartItems((prev) => {
    const existing = prev.find((i) => i.id === product.id);
    if (existing) {
      return prev.map((i) =>
        i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i,
      );
    }
    return [...prev, { ...product, quantity: 1 }];
  });
}

// removeItem: kurangi quantity 1, hapus jika quantity mencapai 0
function removeItem(productId: number): void {
  setCartItems((prev) =>
    prev
      .map((i) => (i.id === productId ? { ...i, quantity: i.quantity - 1 } : i))
      .filter((i) => i.quantity > 0),
  );
}

// updateQuantity: set quantity ke nilai tertentu, hapus jika quantity = 0
function updateQuantity(productId: number, quantity: number): void {
  if (quantity <= 0) {
    setCartItems((prev) => prev.filter((i) => i.id !== productId));
  } else {
    setCartItems((prev) =>
      prev.map((i) => (i.id === productId ? { ...i, quantity } : i)),
    );
  }
}
```

### Derived Values

```typescript
// totalItem: jumlah seluruh quantity
const totalItem = cartItems.reduce((sum, item) => sum + item.quantity, 0);

// totalHarga: jumlah seluruh subtotal
const totalHarga = cartItems.reduce(
  (sum, item) => sum + item.price * item.quantity,
  0,
);
```

---

## Correctness Properties

_A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees._

Fitur ini melibatkan logika bisnis murni (cart state management) yang sangat cocok untuk property-based testing: fungsi `addItem`, `removeItem`, `updateQuantity`, dan derived computations `totalItem`/`totalHarga` adalah pure functions yang perilakunya harus berlaku untuk semua input yang valid.

Library yang digunakan: **[fast-check](https://fast-check.io/)** — library PBT untuk TypeScript/JavaScript.

---

### Property 1: addItem menambah quantity atau membuat item baru

_For any_ produk yang valid, memanggil `addItem` pada CartState yang sudah mengandung produk tersebut harus meningkatkan quantity CartItem sebesar tepat 1. Jika produk belum ada di CartState, CartItem baru harus ditambahkan dengan quantity 1.

**Validates: Requirements 1.2**

---

### Property 2: removeItem mengurangi quantity atau menghapus item

_For any_ CartState yang mengandung CartItem dengan quantity ≥ 1, memanggil `removeItem` dengan `productId` yang sesuai harus menghasilkan CartState di mana quantity CartItem tersebut berkurang 1, atau CartItem tersebut tidak ada lagi jika quantity sebelumnya adalah 1.

**Validates: Requirements 1.3**

---

### Property 3: updateQuantity mengatur quantity atau menghapus item

_For any_ CartState dan nilai quantity target ≥ 0, memanggil `updateQuantity(productId, quantity)` harus menghasilkan CartState di mana CartItem dengan `productId` tersebut memiliki quantity yang sama dengan nilai target, atau CartItem tersebut tidak ada lagi jika nilai target adalah 0.

**Validates: Requirements 1.4**

---

### Property 4: totalItem dan totalHarga adalah derived yang akurat

_For any_ array CartItem yang valid, `totalItem` harus selalu sama dengan jumlah semua `quantity`, dan `totalHarga` harus selalu sama dengan jumlah semua `price × quantity` untuk setiap CartItem dalam array.

**Validates: Requirements 1.5**

---

### Property 5: Quantity yang ditampilkan di ProductCard sinkron dengan CartState

_For any_ produk dan CartState yang valid, angka quantity yang ditampilkan pada `ProductCard` harus selalu sama dengan `cartItems.find(i => i.id === product.id)?.quantity ?? 0`.

**Validates: Requirements 2.5**

---

### Property 6: Tombol minus di ProductCard disabled saat quantity 0

_For any_ produk dengan quantity 0 dalam CartState, tombol `−` pada `ProductCard` harus berada dalam kondisi disabled (atribut `disabled` bernilai `true` dan tidak dapat diklik).

**Validates: Requirements 2.4**

---

### Property 7: Visibilitas FloatingCart bergantung pada totalItem

_For any_ nilai `totalItem`, `FloatingCart` harus ditampilkan jika dan hanya jika `totalItem > 0`. Jika `totalItem = 0`, komponen tidak boleh dirender.

**Validates: Requirements 3.1, 3.2**

---

### Property 8: Format harga Rupiah konsisten di seluruh tampilan

_For any_ nilai harga numerik yang valid, format yang ditampilkan harus menggunakan `toLocaleString("id-ID")` sehingga menghasilkan string dengan pemisah ribuan titik (contoh: `15000` → `"15.000"`). Property ini berlaku untuk harga satuan, subtotal, total, dan totalHarga di FloatingCart.

**Validates: Requirements 3.3, 4.5**

---

### Property 9: CheckoutPage menampilkan semua CartItem

_For any_ CartState yang tidak kosong, `CheckoutPage` harus merender tepat sebanyak `cartItems.length` baris item, dan setiap baris harus menampilkan nama, gambar, harga satuan, quantity, dan subtotal dari CartItem yang sesuai.

**Validates: Requirements 4.1, 4.2**

---

### Property 10: Total di CheckoutPage sama dengan totalHarga

_For any_ CartState yang valid, nilai Total yang ditampilkan di `CheckoutPage` harus sama dengan `cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)`.

**Validates: Requirements 4.3**

---

### Property 11: Tombol Konfirmasi aktif jika dan hanya jika CartState tidak kosong

_For any_ CartState, tombol "Konfirmasi Pesanan" di `CheckoutPage` harus aktif (dapat diklik) jika `cartItems.length > 0`, dan harus disembunyikan atau disabled jika `cartItems.length === 0`.

**Validates: Requirements 6.2, 6.3**

---

## Error Handling

### Empty Cart State

- `FloatingCart`: Mengembalikan `null` (tidak dirender) jika `totalItem === 0`.
- `CheckoutPage`: Menampilkan empty state UI dengan pesan "Keranjang belanja kamu masih kosong" dan tombol/link kembali ke `/` jika `cartItems.length === 0`.
- Tombol "Konfirmasi Pesanan" disembunyikan atau disabled saat cart kosong.

### Navigasi Langsung ke `/checkout`

Jika pengguna mengakses `/checkout` secara langsung dengan cart kosong, `CheckoutPage` menampilkan empty state yang sama dengan link kembali ke halaman utama. Tidak ada redirect otomatis untuk menghindari UX yang mengejutkan.

### Tombol Minus di ProductCard (quantity = 0)

Tombol `−` dirender dengan atribut `disabled` dan styling visual berbeda (opacity rendah, cursor not-allowed) untuk mencegah interaksi yang tidak valid.

### Tombol Minus di CheckoutPage (quantity = 1)

Berbeda dengan `ProductCard`, tombol `−` di `CheckoutPage` selalu aktif saat quantity ≥ 1. Menekannya saat quantity = 1 akan menghapus item dari cart (memanggil `removeItem` yang memfilter item dengan quantity 0).

### Konfirmasi Pesanan

Saat tombol "Konfirmasi Pesanan" ditekan, ditampilkan notifikasi sederhana menggunakan `window.alert()` atau toast message (menggunakan state lokal). Implementasi awal menggunakan `alert()` untuk kesederhanaan, dapat diupgrade ke toast library di iterasi berikutnya.

---

## Testing Strategy

### Pendekatan Dual Testing

Fitur ini menggunakan dua lapisan pengujian yang saling melengkapi:

1. **Unit tests (example-based)**: Memverifikasi skenario spesifik, edge case, dan perilaku UI konkret.
2. **Property tests (fast-check)**: Memverifikasi properti universal yang harus berlaku untuk semua input valid.

### Setup Testing

Proyek ini belum memiliki test framework. Rekomendasi setup:

```bash
npm install --save-dev vitest @testing-library/react @testing-library/user-event jsdom fast-check
```

Konfigurasi `vite.config.ts`:

```typescript
test: {
  environment: 'jsdom',
  globals: true,
  setupFiles: './src/test/setup.ts',
}
```

### Unit Tests (Example-Based)

Fokus pada skenario konkret dan edge case:

- **`cartUtils.test.ts`**:
  - `addItem` pada cart kosong → CartItem baru dengan quantity 1
  - `addItem` pada produk yang sudah ada → quantity bertambah 1
  - `removeItem` pada quantity 1 → item dihapus dari array
  - `updateQuantity` dengan nilai 0 → item dihapus
  - `totalItem` dan `totalHarga` pada cart kosong → keduanya 0

- **`ProductCard.test.tsx`**:
  - Tombol `−` disabled saat quantity = 0
  - Tombol `−` aktif saat quantity > 0
  - Klik `+` memanggil `onAddItem` dengan produk yang benar

- **`FloatingCart.test.tsx`**:
  - Tidak dirender saat `totalItem = 0`
  - Dirender saat `totalItem > 0`
  - Klik "Pesan" memicu navigasi ke `/checkout`

- **`CheckoutPage.test.tsx`**:
  - Empty state ditampilkan saat `cartItems = []`
  - Tombol "Konfirmasi Pesanan" tidak ada/disabled saat cart kosong
  - Klik "Konfirmasi Pesanan" menampilkan notifikasi

### Property Tests (fast-check)

Setiap property test dikonfigurasi dengan minimum **100 iterasi**. Setiap test diberi tag komentar yang mereferensikan property di design document.

```typescript
// Feature: cart-and-order-page, Property 1: addItem menambah quantity atau membuat item baru
fc.assert(fc.property(fc.record({...}), (product) => { ... }), { numRuns: 100 });
```

**`cartLogic.property.test.ts`**:

| Property   | Deskripsi                                            | fast-check Arbitraries                                |
| ---------- | ---------------------------------------------------- | ----------------------------------------------------- |
| Property 1 | addItem menambah quantity atau membuat item baru     | `fc.record` untuk Product, `fc.array` untuk CartState |
| Property 2 | removeItem mengurangi quantity atau menghapus item   | `fc.array` CartItem dengan quantity ≥ 1               |
| Property 3 | updateQuantity mengatur quantity atau menghapus item | CartState + `fc.nat` untuk quantity target            |
| Property 4 | totalItem dan totalHarga akurat                      | `fc.array` CartItem dengan quantity dan price positif |

**`productCard.property.test.tsx`**:

| Property   | Deskripsi                             | fast-check Arbitraries                  |
| ---------- | ------------------------------------- | --------------------------------------- |
| Property 5 | Quantity sinkron dengan CartState     | `fc.record` Product + `fc.nat` quantity |
| Property 6 | Tombol minus disabled saat quantity 0 | `fc.record` Product dengan quantity = 0 |

**`floatingCart.property.test.tsx`**:

| Property   | Deskripsi                             | fast-check Arbitraries     |
| ---------- | ------------------------------------- | -------------------------- |
| Property 7 | Visibilitas bergantung pada totalItem | `fc.nat` untuk totalItem   |
| Property 8 | Format harga Rupiah konsisten         | `fc.nat` untuk nilai harga |

**`checkoutPage.property.test.tsx`**:

| Property    | Deskripsi                                        | fast-check Arbitraries                                |
| ----------- | ------------------------------------------------ | ----------------------------------------------------- |
| Property 9  | Semua CartItem ditampilkan                       | `fc.array` CartItem non-kosong                        |
| Property 10 | Total sama dengan totalHarga                     | `fc.array` CartItem dengan price dan quantity positif |
| Property 11 | Tombol Konfirmasi aktif ↔ CartState tidak kosong | `fc.array` CartItem (termasuk array kosong)           |
