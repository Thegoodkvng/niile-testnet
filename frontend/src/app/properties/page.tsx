// frontend/src/app/properties/page.tsx

import Link from "next/link";
import { getProperties } from "@/lib/api";
import { Property, PaginatedResponse } from "@/types";
import { PropertyCard } from "@/components/PropertyCard";

interface Props {
  searchParams: { [key: string]: string | string[] | undefined };
}

export const revalidate = 30;

function getSingleParam(
  value: string | string[] | undefined,
): string | undefined {
  if (!value) return undefined;
  return Array.isArray(value) ? value[0] : value;
}

export default async function PropertiesPage({ searchParams }: Props) {
  const page = Number(getSingleParam(searchParams.page)) || 1;
  const sort = getSingleParam(searchParams.sort) || "latest";

  const filters = {
    keyword: getSingleParam(searchParams.keyword),
    property_type: getSingleParam(searchParams.property_type),
    listing_type: getSingleParam(searchParams.listing_type),
    price_range: getSingleParam(searchParams.price_range),
    bedrooms: getSingleParam(searchParams.bedrooms),
    bathrooms: getSingleParam(searchParams.bathrooms),
    min_area: getSingleParam(searchParams.min_area),
    max_area: getSingleParam(searchParams.max_area),
    location: getSingleParam(searchParams.location),
  };

  let data: PaginatedResponse<Property> | null = null;

  try {
    data = await getProperties({ page, sort, ...filters });
  } catch (err) {
    console.error("Error loading properties:", err);
  }

  const properties: Property[] = data?.results ?? [];
  const count = data?.count ?? 0;

  const pageSize = 12;
  const totalPages = Math.max(1, Math.ceil(count / pageSize));

  const sortOptions = [
    { value: "latest", label: "Latest" },
    { value: "price_low", label: "Price (low → high)" },
    { value: "price_high", label: "Price (high → low)" },
    { value: "beds", label: "Bedrooms" },
    { value: "baths", label: "Bathrooms" },
    { value: "area", label: "Area" },
  ];

  return (
    <div className="container py-8 space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-slate-900">
            Properties Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Browse and manage properties. Use filters and sorting to find
            exactly what you need, or create a new listing.
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:items-end">
          {/* Create new property button */}
          <Link
            href="/properties/new"
            className="btn-primary text-xs sm:text-sm px-3 py-2 text-center"
          >
            + Create new property
          </Link>

          {/* Sort controls */}
          <div className="flex flex-wrap gap-2 justify-start sm:justify-end">
            <span className="text-xs font-medium text-slate-600 self-center">
              Sort by:
            </span>
            {sortOptions.map((option) => {
              const params = new URLSearchParams();
              params.set("sort", option.value);
              Object.entries(filters).forEach(([key, value]) => {
                if (value) params.set(key, value);
              });

              const href = `/properties?${params.toString()}`;
              const isActive = sort === option.value;

              return (
                <Link
                  key={option.value}
                  href={href}
                  className={`px-2 py-1 text-[11px] rounded-md border ${
                    isActive
                      ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                      : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {option.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Filters / search bar */}
      <form className="card">
        <div className="card-body grid gap-4 md:grid-cols-[2fr,repeat(3,1fr)]">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-slate-600">
              Keyword
            </label>
            <input
              type="text"
              name="keyword"
              placeholder="City, neighbourhood, title..."
              defaultValue={filters.keyword}
              className="rounded-md border border-slate-300 px-2 py-1 text-sm"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-slate-600">
              Listing type
            </label>
            <select
              name="listing_type"
              defaultValue={filters.listing_type}
              className="rounded-md border border-slate-300 px-2 py-1 text-sm"
            >
              <option value="">Any</option>
              <option value="sale">For sale</option>
              <option value="rent">For rent</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-slate-600">
              Min beds
            </label>
            <input
              type="number"
              name="bedrooms"
              min={0}
              defaultValue={filters.bedrooms}
              className="rounded-md border border-slate-300 px-2 py-1 text-sm"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-slate-600">
              Location
            </label>
            <input
              type="text"
              name="location"
              placeholder="e.g. Abuja"
              defaultValue={filters.location}
              className="rounded-md border border-slate-300 px-2 py-1 text-sm"
            />
          </div>

          <div className="md:col-span-4 flex justify-end mt-2">
            <button type="submit" className="btn-primary text-xs">
              Apply filters
            </button>
          </div>
        </div>
      </form>

      {/* Results */}
      {properties.length === 0 ? (
        <p className="text-sm text-slate-500">
          No properties found with the selected criteria.
        </p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-4">
          {Array.from({ length: totalPages }).map((_, idx) => {
            const pageNum = idx + 1;
            const params = new URLSearchParams();
            params.set("page", String(pageNum));
            params.set("sort", sort);
            Object.entries(filters).forEach(([key, value]) => {
              if (value) params.set(key, value);
            });

            const href = `/properties?${params.toString()}`;
            const isActive = pageNum === page;

            return (
              <Link
                key={pageNum}
                href={href}
                className={`px-3 py-1 text-xs rounded-md border ${
                  isActive
                    ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                    : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                }`}
              >
                {pageNum}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
