// frontend/src/components/PropertyCard.tsx

import Link from "next/link";
import type { Property } from "@/types";

interface Props {
  property: Property;
}

function formatPrice(price: number | string | undefined) {
  if (price === null || price === undefined) return "Price on request";
  const num = typeof price === "string" ? Number(price) : price;
  if (Number.isNaN(num)) return "Price on request";
  return num.toLocaleString("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  });
}

export function PropertyCard({ property }: Props) {
  const {
    id,
    title,
    city,
    state,
    country,
    price,
    bedrooms,
    bathrooms,
    listing_type,
    property_type,
  } = property;

  const listingLabel =
    listing_type === "rent"
      ? "For rent"
      : listing_type === "sale"
      ? "For sale"
      : "Listing";

  return (
    <article className="card h-full flex flex-col">
      <div className="card-body flex flex-col gap-3">
        {/* Top badge row */}
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center rounded-full bg-indigo-50 px-2 py-0.5 text-[11px] font-medium text-indigo-700">
            {listingLabel}
          </span>
          {property_type && (
            <span className="text-[11px] text-slate-500 uppercase tracking-wide">
              {property_type}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-sm sm:text-base font-semibold text-slate-900 line-clamp-2">
          {title}
        </h3>

        {/* Location */}
        <p className="text-xs text-slate-500">
          {[city, state, country].filter(Boolean).join(", ")}
        </p>

        {/* Key stats */}
        <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-600 mt-1">
          {typeof bedrooms !== "undefined" && (
            <span className="inline-flex items-center gap-1">
              <span className="font-semibold">{bedrooms}</span>
              <span>beds</span>
            </span>
          )}
          {typeof bathrooms !== "undefined" && (
            <span className="inline-flex items-center gap-1">
              <span className="font-semibold">{bathrooms}</span>
              <span>baths</span>
            </span>
          )}
        </div>

        {/* Price */}
        <p className="mt-2 text-sm font-semibold text-indigo-700">
          {formatPrice(price)}
        </p>

        {/* View property button */}
        <div className="mt-4 pt-3 border-t border-slate-100">
          <Link
            href={`/properties/${id}`}
            className="inline-flex w-full items-center justify-center rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
          >
            View property
          </Link>
        </div>
      </div>
    </article>
  );
}
