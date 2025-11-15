// src/components/HeroSearch.tsx
"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const PROPERTY_TYPES = [
  { value: "house", label: "House" },
  { value: "apartment", label: "Apartment" },
  { value: "condo", label: "Condo" },
  { value: "townhouse", label: "Townhouse" },
  { value: "land", label: "Land" },
  { value: "commercial", label: "Commercial" },
];

const LISTING_TYPES = [
  { value: "sale", label: "For Sale" },
  { value: "rent", label: "For Rent" },
  { value: "lease", label: "For Lease" },
  { value: "shortlet", label: "Shortlet" },
];

export default function HeroSearch() {
  const router = useRouter();
  const [propertyType, setPropertyType] = useState<string | null>(null);
  const [listingType, setListingType] = useState<string | null>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const params = new URLSearchParams();
    if (propertyType) params.set("property_type", propertyType);
    if (listingType) params.set("listing_type", listingType);

    const qs = params.toString();
    const url = qs ? `/properties?${qs}` : "/properties";
    router.push(url);
  }

  return (
    <section className="bg-gradient-to-br from-indigo-600 via-indigo-500 to-purple-500 text-white rounded-3xl p-8 sm:p-10 mb-12">
      <div className="max-w-5xl mx-auto grid gap-8 lg:grid-cols-[2fr,3fr] items-center">
        {/* Left: Headline */}
        <div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Find Your Dream Property
          </h1>
          <p className="text-sm sm:text-base text-indigo-100 mb-6">
            Discover the perfect property that matches your lifestyle and
            dreams.
          </p>
          <button
            type="button"
            onClick={() => router.push("/properties")}
            className="inline-flex items-center rounded-full bg-white/95 px-5 py-2 text-sm font-semibold text-indigo-700 shadow hover:bg-white"
          >
            Browse Properties
          </button>
        </div>

        {/* Right: Quick search form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white text-gray-900 rounded-2xl shadow-lg p-6 space-y-5"
        >
          <div>
            <h2 className="text-sm font-semibold text-gray-800 mb-2">
              Property Type
            </h2>
            <div className="flex flex-wrap gap-2">
              {PROPERTY_TYPES.map((pt) => (
                <button
                  key={pt.value}
                  type="button"
                  onClick={() =>
                    setPropertyType(
                      propertyType === pt.value ? null : pt.value
                    )
                  }
                  className={`rounded-full border px-3 py-1 text-xs font-medium ${
                    propertyType === pt.value
                      ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                      : "border-gray-200 text-gray-700 hover:border-indigo-300"
                  }`}
                >
                  {pt.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-gray-800 mb-2">
              Listing Type
            </h2>
            <div className="flex flex-wrap gap-2">
              {LISTING_TYPES.map((lt) => (
                <button
                  key={lt.value}
                  type="button"
                  onClick={() =>
                    setListingType(
                      listingType === lt.value ? null : lt.value
                    )
                  }
                  className={`rounded-full border px-3 py-1 text-xs font-medium ${
                    listingType === lt.value
                      ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                      : "border-gray-200 text-gray-700 hover:border-indigo-300"
                  }`}
                >
                  {lt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-700"
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
