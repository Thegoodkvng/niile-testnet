// frontend/src/app/register/page.tsx

"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { registerAgent, saveToken } from "@/lib/auth";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("renter"); // NEW
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function getRedirectPath(res: any): string {
    const apiRole =
      (res?.user?.role || res?.user?.user_type || userType || "").toString().toLowerCase();

    if (["agent", "landlord", "investor"].includes(apiRole)) {
      return "/dashboard";
    }

    if (["renter", "buyer"].includes(apiRole)) {
      return "/properties";
    }

    // Fallback
    return "/properties";
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res: any = await registerAgent({
        email,
        password,
        full_name: fullName,
        phone_number: phone,
        // If your backend accepts this, it will set the correct user type/role:
        user_type: userType,
      } as any);

      // Save token as before
      saveToken(res.token);

      // Save user object for dashboard/profile usage (if provided by API)
      if (typeof window !== "undefined" && res?.user) {
        window.localStorage.setItem("niile_user", JSON.stringify(res.user));
      }

      const redirect = getRedirectPath(res);
      router.push(redirect);
    } catch (err: any) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6 space-y-4">
        <h1 className="text-xl font-semibold text-slate-900">
          Create your account
        </h1>
        <p className="text-sm text-slate-500">
          Choose your user type to get the right experience on Niile.
        </p>

        {error && (
          <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-700">Email</label>
            <input
              type="email"
              required
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-700">
              Full name
            </label>
            <input
              type="text"
              required
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-700">
              Phone number (optional)
            </label>
            <input
              type="text"
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          {/* NEW: user type selector */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-700">
              I am a...
            </label>
            <select
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
            >
              <option value="renter">Renter / Tenant</option>
              <option value="buyer">Buyer</option>
              <option value="agent">Agent</option>
              <option value="landlord">Landlord</option>
              <option value="investor">Investor</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-700">
              Password
            </label>
            <input
              type="password"
              required
              minLength={6}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary mt-2 text-sm disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <p className="text-xs text-slate-500 text-center">
          Already have an account?{" "}
          <a
            href="/login"
            className="font-medium text-indigo-600 hover:text-indigo-700"
          >
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}
