
// app/admin/login/page.jsx
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FiMail, FiLock, FiLogIn } from "react-icons/fi";
import adminAPI from "@/services/adminApi";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("adminToken")) {
      router.push("/admin/dashboard");
    }
  }, [router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await adminAPI.login(email, password);
      if (response.success) {
        localStorage.setItem("adminToken", response.token);
        localStorage.setItem("adminEmail", email);
        router.push("/admin/dashboard");
        setEmail("");
        setPassword("");
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f0e8] flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white border border-[#d4c8b4] shadow-lg">
        <div className="bg-[#1e2d4a] p-6 text-center border-b-4 border-[#b8974a]">
          <h1 className="font-playfair font-black text-2xl text-[#f5f0e8]">Journalism Society</h1>
          <p className="font-mono-dm text-xs text-[#8a9bb8] mt-1">Admin Access</p>
        </div>

        <form onSubmit={handleLogin} className="p-8" autoComplete="off">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded">
              <p className="font-garamond text-sm text-red-600">{error}</p>
            </div>
          )}

          <div className="mb-5">
            <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-2">
              Email Address
            </label>
            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9a8870]" size={16} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="new-password"
                className="w-full pl-10 pr-3 py-2 border border-[#d4c8b4] text-gray-800 font-garamond focus:outline-none focus:border-[#1e2d4a]"
                placeholder="admin@gmail.com"
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="font-mono-dm text-xs uppercase text-[#9a8870] block mb-2">
              Password
            </label>
            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9a8870]" size={16} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                className="w-full pl-10 pr-3 py-2 border border-[#d4c8b4] font-garamond text-gray-800 focus:outline-none focus:border-[#1e2d4a]"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1e2d4a] text-[#f5f0e8] py-3 font-mono-dm text-xs uppercase tracking-wider hover:bg-[#2a3f6a] transition-colors disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
          >
            <FiLogIn size={14} />
            {loading ? "Logging in..." : "Login to Admin"}
          </button>
        </form>
      </div>
    </div>
  );
}