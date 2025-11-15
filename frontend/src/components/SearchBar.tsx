// frontend/src/components/SearchBar.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [q, setQ] = useState(searchParams.get("q") ?? "");

  useEffect(() => {
    setQ(searchParams.get("q") ?? "");
  }, [searchParams]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (q.trim()) params.set("q", q.trim());
    router.push(params.toString() ? `/?${params.toString()}` : "/");
  };

  return (
    <form onSubmit={onSubmit} className="flex gap-2">
      <input
        className="border rounded px-3 py-2 w-full"
        placeholder="Search city, title, address..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      <button
        type="submit"
        className="px-4 py-2 rounded bg-black text-white text-sm"
      >
        Search
      </button>
    </form>
  );
}
