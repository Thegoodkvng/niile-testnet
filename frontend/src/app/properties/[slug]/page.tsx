// frontend/src/app/properties/[slug]/page.tsx

import Link from "next/link";
import { notFound } from "next/navigation";
import { getPropertyById } from "@/lib/api";
import type { Property } from "@/types";

interface Props {
  params: { slug: string };
}

export const revalidate = 30;

export default async function PropertyDetailPage({ params }: Props) {
  const id = Number(params.slug);
  if (!id || Number.isNaN(id)) {
    notFound();
  }

  let property: Property;
  try {
    property = await getPropertyById(id);
  } catch {
    notFound();
  }

  const {
    title,
    price,
    listing_type,
    property_type,
    bedrooms,
    bathrooms,
    city,
    state,
    country,
    description,
  } = property;

  const listingLabel =
    listing_type === "rent"
      ? "For rent"
      : listing_type === "sale"
      ? "For sale"
      : "Listing";

  const formattedPrice =
    price !== undefined && price !== null
      ? (() => {
          const num = typeof price === "string" ? Number(price) : price;
          if (Number.isNaN(num)) return null;
          return num.toLocaleString("en-NG", {
            style: "currency",
            currency: "NGN",
            maximumFractionDigits: 0,
          });
        })()
      : null;

  const location = [city, state, country].filter(Boolean).join(", ");

  return (
    <div className="container py-8 space-y-6">
      {/* Back link */}
      <div>
        <Link
          href="/properties"
          className="inline-flex items-center text-xs font-medium text-slate-600 hover:text-slate-900"
        >
          ← Back to properties
        </Link>
      </div>

      {/* Header */}
      <header className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center rounded-full bg-indigo-50 px-2 py-0.5 text-[11px] font-medium text-indigo-700">
            {listingLabel}
          </span>
          {property_type && (
            <span className="text-[11px] text-slate-500 uppercase tracking-wide">
              {property_type}
            </span>
          )}
        </div>

        <h1 className="text-xl sm:text-2xl font-semibold text-slate-900">
          {title}
        </h1>

        {location && (
          <p className="text-sm text-slate-500">{location}</p>
        )}

        {formattedPrice && (
          <p className="mt-2 text-lg font-semibold text-indigo-700">
            {formattedPrice}
          </p>
        )}
      </header>

      {/* Main content layout */}
      <div className="grid gap-6 lg:grid-cols-[2fr,1fr] items-start">
        {/* Left: details */}
        <section className="space-y-4">
          {/* Key stats */}
          <div className="card">
            <div className="card-body flex flex-wrap gap-4 text-sm text-slate-700">
              {typeof bedrooms !== "undefined" && (
                <div>
                  <p className="text-xs text-slate-500 uppercase">Bedrooms</p>
                  <p className="font-semibold">{bedrooms}</p>
                </div>
              )}
              {typeof bathrooms !== "undefined" && (
                <div>
                  <p className="text-xs text-slate-500 uppercase">Bathrooms</p>
                  <p className="font-semibold">{bathrooms}</p>
                </div>
              )}
              {property_type && (
                <div>
                  <p className="text-xs text-slate-500 uppercase">
                    Property type
                  </p>
                  <p className="font-semibold">{property_type}</p>
                </div>
              )}
              {listing_type && (
                <div>
                  <p className="text-xs text-slate-500 uppercase">
                    Listing type
                  </p>
                  <p className="font-semibold">
                    {listingLabel}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="card">
            <div className="card-body space-y-2">
              <h2 className="text-sm font-semibold text-slate-900">
                Description
              </h2>
              <p className="text-sm text-slate-700 whitespace-pre-line">
                {description || "No description provided for this property yet."}
              </p>
            </div>
          </div>
        </section>

        {/* Right: simple sidebar */}
        <aside className="space-y-4">
          <div className="card">
            <div className="card-body space-y-3">
              <h2 className="text-sm font-semibold text-slate-900">
                Interested in this property?
              </h2>
              <p className="text-xs text-slate-600">
                This is a demo detail page wired to your Django backend. In a
                real deployment you could display agent contact details here and
                add an enquiry form.
              </p>
              <p className="text-[11px] text-slate-500">
                You can create more sample properties from the{" "}
                <Link href="/properties/new" className="underline">
                  New Property
                </Link>{" "}
                page and they will appear on the main properties list.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
