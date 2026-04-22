import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useNavigate } from "react-router";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/kasir");
    } catch (err: unknown) {
      console.error(err);
      setError("Email atau Password salah!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#2b1408] bg-grain flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-dots opacity-10 pointer-events-none" />
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-amber-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 -left-20 w-72 h-72 bg-orange-700/10 rounded-full blur-[90px] pointer-events-none" />

      <div className="bg-[#3d1d0c]/80 backdrop-blur-md rounded-2xl border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.5)] p-8 sm:p-10 w-full max-w-md relative z-10">
        <h1 className="text-3xl font-bold text-amber-50 text-center mb-2">Login Kasir</h1>
        <p className="text-stone-400 text-center mb-8 text-sm">Masuk untuk mengelola pesanan restoran</p>

        {error && (
          <div className="bg-red-500/20 text-red-200 p-3 rounded-lg text-sm mb-6 border border-red-500/30 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-amber-100 mb-1.5" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-amber-50 focus:outline-none focus:border-amber-500 transition-colors"
              placeholder="kasir@cafe.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-amber-100 mb-1.5" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-amber-50 focus:outline-none focus:border-amber-500 transition-colors"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-600 text-amber-50 font-bold py-3.5 rounded-xl hover:bg-amber-500 transition-colors shadow-[0_0_15px_rgba(217,119,6,0.3)] border border-amber-500/50 mt-4 disabled:opacity-50"
          >
            {loading ? "Memproses..." : "Masuk"}
          </button>
        </form>
      </div>
    </div>
  );
}
