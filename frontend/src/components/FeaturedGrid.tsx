// frontend/src/components/FeaturedGrid.tsx

import { ApiProperty } from "@/types";
import { PropertyCard } from "@/components/PropertyCard";

interface FeaturedGridProps {
  properties: ApiProperty[];
}

export default function FeaturedGrid({ properties }: FeaturedGridProps) {
  if (!properties || properties.length === 0) {
    return (
      <p className="text-sm text-slate-500">
        No properties available at the moment.
      </p>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}
