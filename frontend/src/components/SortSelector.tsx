// src/components/SortSelector.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function SortSelector({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const router = useRouter();
  const params = useSearchParams();

  const currentOrdering = params.get("ordering") || "";

  const onChange = (value: string) => {
    const newParams = new URLSearchParams(params.toString());
    if (!value) {
      newParams.delete("ordering");
    } else {
      newParams.set("ordering", value);
    }
    newParams.delete("page"); // reset to first page when sorting changes
    router.push(`/?${newParams.toString()}`);
  };

  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="text-slate-500">Sort by</span>
      <select
        defaultValue={currentOrdering}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-300"
      >
        <option value="">Latest added</option>
        <option value="price">Price: Low to High</option>
        <option value="-price">Price: High to Low</option>
        <option value="-bedrooms">Most Bedrooms</option>
        <option value="-bathrooms">Most Bathrooms</option>
        <option value="-area_sqft">Largest Area</option>
      </select>
    </div>
  );
}
