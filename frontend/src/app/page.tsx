import { apiList, API_BASE } from "@/lib/api";
import { Property } from "@/types";
import Hero from "@/components/Hero";
import FeaturedGrid from "@/components/FeaturedGrid";
import PropertyCard from "@/components/PropertyCard";

async function getFeatured(): Promise<Property[]> {
  try {
    const res = await fetch(`${API_BASE}/properties/featured/`, { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : (data?.results ?? []);
  } catch {
    return [];
  }
}

export default async function Page({ searchParams }: { searchParams?: { q?: string; page?: string } }) {
  const q = searchParams?.q ?? "";
  const page = searchParams?.page ?? "1";
  const params = new URLSearchParams();
  if (q) params.set("search", q);
  if (page) params.set("page", page);

  const [featured, latest] = await Promise.all([
    getFeatured(),
    apiList<Property>(`/properties/?${params.toString()}`),
  ]);

  return (
    <main>
      <Hero />

      <FeaturedGrid items={featured} />

      <section className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold mb-4">Latest</h2>
        {latest.results.length === 0 ? (
          <p className="opacity-70">No properties found.</p>
        ) : (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latest.results.map((p) => <PropertyCard key={p.slug} p={p} />)}
          </ul>
        )}
      </section>
    </main>
  );
}
