const CheckoutPage = () => {
  return (
    <main className="min-h-screen bg-orange-50 pt-24 pb-12 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-8">
        <h1 className="text-3xl font-bold text-stone-900 mb-8 border-b pb-4">
          Ringkasan Pesanan
        </h1>
        
        {/* Nanti di sinilah kita akan meletakkan daftar kopi beserta tombol + dan - */}
        <div className="text-center text-stone-500 py-10">
          <p>Area daftar pesanan sedang disiapkan...</p>
        </div>

      </div>
    </main>
  );
};

export default CheckoutPage;