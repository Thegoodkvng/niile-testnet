import { api } from "@/lib/api";
import { Property } from "@/types";
import Image from "next/image";
import Link from "next/link";

export default async function PropertyPage({ params }: { params: { slug: string } }) {
  const p = await api<Property>(`/properties/${params.slug}/`);
  return (
    <main className="max-w-5xl mx-auto p-6 space-y-4">
      <Link href="/" className="underline">← Back</Link>
      <h1 className="text-3xl font-bold">{p.title}</h1>
      {p.images?.length ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {p.images.map(img => (
            <div key={img.id} className="relative aspect-[16/10] rounded overflow-hidden shadow">
              <Image src={img.image} alt={img.alt || p.title} fill sizes="50vw" />
            </div>
          ))}
        </div>
      ) : null}
      <p className="opacity-80">{p.address} {p.city} {p.state} {p.country}</p>
      <p className="text-xl font-semibold">{p.currency} {Number(p.price).toLocaleString()}</p>
      <p>🛏 {p.bedrooms} &nbsp; 🛁 {p.bathrooms} {p.area_sqft ? `• ${p.area_sqft} sqft` : ""}</p>
      {p.description && <p className="mt-2">{p.description}</p>}
    </main>
  );
}
