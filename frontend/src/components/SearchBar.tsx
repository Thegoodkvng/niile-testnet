"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function SearchBar() {
  const sp = useSearchParams(); const router = useRouter();
  const [q, setQ] = useState(sp.get("q") ?? "");
  useEffect(()=>{ setQ(sp.get("q") ?? "") }, [sp]);
  return (
    <form className="mb-6 flex gap-2" onSubmit={(e)=>{e.preventDefault(); router.push(q ? `/?q=${encodeURIComponent(q)}` : "/");}}>
      <input className="border rounded px-3 py-2 w-full" value={q} onChange={e=>setQ(e.target.value)} placeholder="Search city, title, address..." />
      <button className="px-4 py-2 rounded bg-black text-white">Search</button>
    </form>
  );
}
