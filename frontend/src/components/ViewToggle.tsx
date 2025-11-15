// src/components/ViewToggle.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function ViewToggle({
  searchParams,
}: {
  // used only for initial state, but not strictly required
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const router = useRouter();
  const params = useSearchParams();

  const currentView = (params.get("view") as string) || "grid";

  const setView = (view: "grid" | "list") => {
    const newParams = new URLSearchParams(params.toString());
    if (view === "grid") {
      newParams.delete("view");
    } else {
      newParams.set("view", view);
    }
    router.push(`/?${newParams.toString()}`);
  };

  const baseBtn =
    "inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium transition-colors";
  const active =
    "border-sky-600 bg-sky-50 text-sky-700";
  const inactive =
    "border-slate-200 bg-white text-slate-500 hover:border-slate-300";

  return (
    <div className="inline-flex rounded-full bg-slate-100 p-1 text-xs">
      <button
        type="button"
        onClick={() => setView("grid")}
        className={`${baseBtn} ${
          currentView === "grid" ? active : inactive
        }`}
      >
        Grid
      </button>
      <button
        type="button"
        onClick={() => setView("list")}
        className={`${baseBtn} ${
          currentView === "list" ? active : inactive
        }`}
      >
        List
      </button>
    </div>
  );
}
