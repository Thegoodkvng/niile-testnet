// frontend/src/components/FeaturedPropertiesSection.tsx

import Link from "next/link";
import { ApiProperty } from "@/types";
import { PropertyCard } from "@/components/PropertyCard";
import FeaturedGrid from "@/components/FeaturedGrid";

interface FeaturedPropertiesSectionProps {
  title?: string;
  properties: ApiProperty[];
}

export default function FeaturedPropertiesSection({
  title = "Featured Properties",
  properties,
}: FeaturedPropertiesSectionProps) {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-lg sm:text-xl font-semibold text-slate-900">
          {title}
        </h2>
        <Link
          href="/properties"
          className="text-xs font-medium text-indigo-600 hover:text-indigo-700"
        >
          View all
        </Link>
      </div>

      <FeaturedGrid properties={properties} />
    </section>
  );
}
