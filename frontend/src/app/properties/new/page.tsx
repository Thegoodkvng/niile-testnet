// frontend/src/app/properties/new/page.tsx

"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createProperty } from "@/lib/auth";

export default function NewPropertyPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [listingType, setListingType] = useState<"sale" | "rent">("sale");
  const [propertyType, setPropertyType] = useState("apartment");
  const [bedrooms, setBedrooms] = useState<number | "">("");
  const [bathrooms, setBathrooms] = useState<number | "">("");
  const [city, setCity] = useState("Abuja");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("Nigeria");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      if (price === "" || bedrooms === "" || bathrooms === "") {
        throw new Error("Please fill in all numeric fields.");
      }

      await createProperty({
        title,
        price: Number(price),
        listing_type: listingType,
        property_type: propertyType,
        bedrooms: Number(bedrooms),
        bathrooms: Number(bathrooms),
        city,
        state,
        country,
        description,
      });

      setSuccess("Property created successfully!");
      // optionally redirect to properties page after a short delay
      setTimeout(() => {
        router.push("/properties");
      }, 1000);
    } catch (err: any) {
      setError(err.message || "Failed to create property");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-slate-900">
            Create New Property
          </h1>
          <a
            href="/properties"
            className="text-xs text-indigo-600 hover:text-indigo-700"
          >
            Back to properties
          </a>
        </div>

        <p className="text-sm text-slate-500">
          Fill in the details below to create a sample property listing for your
          agent account.
        </p>

        {error && (
          <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
            {error}
          </div>
        )}

        {success && (
          <div className="text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-md px-3 py-2">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
          <div className="space-y-1 md:col-span-2">
            <label className="text-xs font-medium text-slate-700">
              Title
            </label>
            <input
              type="text"
              required
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Modern 3-bedroom apartment in Wuse"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-700">
              Price
            </label>
            <input
              type="number"
              min={0}
              required
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
              value={price}
              onChange={(e) =>
                setPrice(e.target.value === "" ? "" : Number(e.target.value))
              }
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-700">
              Listing type
            </label>
            <select
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
              value={listingType}
              onChange={(e) =>
                setListingType(e.target.value as "sale" | "rent")
              }
            >
              <option value="sale">For sale</option>
              <option value="rent">For rent</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-700">
              Property type
            </label>
            <select
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
            >
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="duplex">Duplex</option>
              <option value="land">Land</option>
              <option value="office">Office</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-700">
              Bedrooms
            </label>
            <input
              type="number"
              min={0}
              required
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
              value={bedrooms}
              onChange={(e) =>
                setBedrooms(
                  e.target.value === "" ? "" : Number(e.target.value),
                )
              }
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-700">
              Bathrooms
            </label>
            <input
              type="number"
              min={0}
              required
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
              value={bathrooms}
              onChange={(e) =>
                setBathrooms(
                  e.target.value === "" ? "" : Number(e.target.value),
                )
              }
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-700">
              City
            </label>
            <input
              type="text"
              required
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-700">
              State / Region
            </label>
            <input
              type="text"
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-700">
              Country
            </label>
            <input
              type="text"
              required
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>

          <div className="space-y-1 md:col-span-2">
            <label className="text-xs font-medium text-slate-700">
              Description
            </label>
            <textarea
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm min-h-[100px]"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Short description of the property, key features, neighbourhood, etc."
            />
          </div>

          <div className="md:col-span-2 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="btn-primary text-sm px-4 py-2 disabled:opacity-60"
            >
              {loading ? "Creating..." : "Create property"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
