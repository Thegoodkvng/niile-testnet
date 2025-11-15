// src/components/PropertyFilters.tsx

type SearchParams = {
  [key: string]: string | string[] | undefined;
};

export default function PropertyFilters({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const get = (key: string): string =>
    (searchParams[key] as string | undefined) ?? "";

  return (
    <form
      method="GET"
      className="grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-2 lg:grid-cols-4"
    >
      {/* Property type */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-slate-600">
          Property Type
        </label>
        <select
          name="property_type"
          defaultValue={get("property_type")}
          className="rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-sm outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-300"
        >
          <option value="">Any</option>
          <option value="APARTMENT">Apartment</option>
          <option value="HOUSE">House</option>
          <option value="LAND">Land</option>
          <option value="COMMERCIAL">Commercial</option>
        </select>
      </div>

      {/* Listing type */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-slate-600">
          Listing Type
        </label>
        <select
          name="listing_type"
          defaultValue={get("listing_type")}
          className="rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-sm outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-300"
        >
          <option value="">Any</option>
          <option value="SALE">For Sale</option>
          <option value="RENT">For Rent</option>
          <option value="LEASE">For Lease</option>
           <option value="SHORTLET">Shortlet</option>
        </select>
      </div>

      {/* Price range */}
      <div className="flex gap-2">
        <div className="flex flex-1 flex-col gap-1">
          <label className="text-xs font-medium text-slate-600">
            Min Price
          </label>
          <input
            type="number"
            name="min_price"
            defaultValue={get("min_price")}
            placeholder="e.g. 5000000"
            className="rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-sm outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-300"
          />
        </div>
        <div className="flex flex-1 flex-col gap-1">
          <label className="text-xs font-medium text-slate-600">
            Max Price
          </label>
          <input
            type="number"
            name="max_price"
            defaultValue={get("max_price")}
            placeholder="e.g. 20000000"
            className="rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-sm outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-300"
          />
        </div>
      </div>

      {/* Bedrooms & Bathrooms */}
      <div className="flex gap-2">
        <div className="flex flex-1 flex-col gap-1">
          <label className="text-xs font-medium text-slate-600">
            Beds
          </label>
          <input
            type="number"
            name="bedrooms"
            min={0}
            defaultValue={get("bedrooms")}
            className="rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-sm outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-300"
          />
        </div>
        <div className="flex flex-1 flex-col gap-1">
          <label className="text-xs font-medium text-slate-600">
            Baths
          </label>
          <input
            type="number"
            name="bathrooms"
            min={0}
            defaultValue={get("bathrooms")}
            className="rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-sm outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-300"
          />
        </div>
      </div>
      

      {/* Location */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-slate-600">
          Location
        </label>
        <input
          type="text"
          name="location"
          defaultValue={get("location")}
          placeholder="City, neighbourhood..."
          className="rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-sm outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-300"
        />
      </div>

      {/* Keyword */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-slate-600">
          Keywords
        </label>
        <input
          type="text"
          name="keyword"
          defaultValue={get("keyword")}
          placeholder="Pool, balcony, etc."
          className="rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-sm outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-300"
        />
      </div>

      {/* Submit */}
      <div className="flex items-end justify-end">
        <button
          type="submit"
          className="w-full rounded-lg bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-700 sm:w-auto"
        >
          Apply Filters
        </button>
      </div>
    </form>
  );
}
