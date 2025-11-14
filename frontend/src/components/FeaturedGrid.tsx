import PropertyCard from "@/components/PropertyCard";
import { Property } from "@/types";

export default function FeaturedGrid({ items }: { items: Property[] }) {
  if (!items?.length) return null;
  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-4">Featured</h2>
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(p => <PropertyCard key={p.slug} p={p} />)}
      </ul>
    </section>
  );
}
