import Link from "next/link";
import Image from "next/image";
import { Property } from "@/types";

export default function PropertyCard({ p }: { p: Property }) {
  const img = p.images?.[0]?.image;
  return (
    <li className="rounded-2xl shadow hover:shadow-md transition overflow-hidden bg-white">
      {img && (
        <div className="relative aspect-[16/9]">
          <Image src={img} alt={p.title} fill sizes="(min-width: 768px) 33vw, 100vw" />
        </div>
      )}
      <div className="p-4">
        <h3 className="text-lg font-semibold">
          <Link href={`/properties/${p.slug}`} className="underline">{p.title}</Link>
        </h3>
        <p className="text-sm opacity-70">{p.city ? `${p.city}, ` : ""}{p.country ?? "—"}</p>
        <p className="mt-2 font-medium">{p.currency} {Number(p.price).toLocaleString()}</p>
        <p className="text-sm mt-1">🛏 {p.bedrooms} &nbsp; 🛁 {p.bathrooms}</p>
      </div>
    </li>
  );
}
