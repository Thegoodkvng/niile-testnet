// frontend/src/components/PropertySidebar.tsx

import { Property } from "@/types";

interface PropertySidebarProps {
  property: Property;
}

export default function PropertySidebar({ property }: PropertySidebarProps) {
  const {
    price,
    currency,
    area,
    area_sqft,
    bedrooms,
    bathrooms,
    listing_type,
    property_type,
    status,
    is_published,
    agent,
  } = property;

  const displayCurrency = currency || "₦";

  const formattedPrice = (() => {
    if (typeof price !== "number") return "N/A";
    const [whole] = price.toFixed(0).split(".");
    const reversed = whole.split("").reverse().join("");
    const groups = reversed.match(/.{1,3}/g);
    const formattedWhole = groups
      ?.join(",")
      .split("")
      .reverse()
      .join("");

    return `${displayCurrency}${formattedWhole ?? whole}`;
  })();

  const agentDisplayName =
    agent?.full_name ?? agent?.name ?? "Agent";

  return (
    <aside className="space-y-4">
      {/* Price & key facts */}
      <div className="card">
        <div className="card-body space-y-3">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase">
              Price
            </p>
            <p className="text-2xl font-bold text-indigo-600">
              {formattedPrice}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs text-slate-600">
            <div>
              <p className="font-semibold text-slate-700">Listing type</p>
              <p className="capitalize">{listing_type}</p>
            </div>
            <div>
              <p className="font-semibold text-slate-700">Property type</p>
              <p className="capitalize">{property_type}</p>
            </div>
            <div>
              <p className="font-semibold text-slate-700">Bedrooms</p>
              <p>{bedrooms}</p>
            </div>
            <div>
              <p className="font-semibold text-slate-700">Bathrooms</p>
              <p>{bathrooms}</p>
            </div>
            <div>
              <p className="font-semibold text-slate-700">Area</p>
              <p>
                {area_sqft ?? area}{" "}
                <span className="text-slate-400">
                  {area_sqft ? "sq ft" : "m²"}
                </span>
              </p>
            </div>
            <div>
              <p className="font-semibold text-slate-700">Status</p>
              <p className="capitalize">
                {status}
                {is_published === false && (
                  <span className="ml-1 text-[10px] text-slate-400">
                    (unpublished)
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Agent card */}
      {agent && (
        <div className="card">
          <div className="card-body flex items-start gap-3">
            {agent.avatar_url || agent.avatar || agent.profile_picture ? (
              <img
                src={
                  agent.avatar_url || agent.avatar || agent.profile_picture!
                }
                alt={agentDisplayName}
                className="h-12 w-12 rounded-full object-cover"
              />
            ) : (
              <div className="h-12 w-12 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-semibold">
                {agentDisplayName
                  .split(" ")
                  .filter((part) => part.length > 0)
                  .map((part) => part[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </div>
            )}
            <div className="space-y-1">
              <p className="text-sm font-semibold text-slate-900">
                {agentDisplayName}
              </p>
              {agent.email && (
                <p className="text-xs text-slate-600">✉️ {agent.email}</p>
              )}
              {agent.phone && (
                <p className="text-xs text-slate-600">📞 {agent.phone}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
