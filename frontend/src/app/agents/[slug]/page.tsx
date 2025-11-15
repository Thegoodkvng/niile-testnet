// frontend/src/app/agents/[slug]/page.tsx

import { notFound } from "next/navigation";
import { getAgentBySlug, getProperties } from "@/lib/api";
import { ApiAgentSummary, Property } from "@/types";
import AgentCard from "@/components/AgentCard";
import { PropertyCard } from "@/components/PropertyCard";

interface PageProps {
  params: { slug: string };
}

export const revalidate = 60;

export default async function AgentDetailPage({ params }: PageProps) {
  const slug = params.slug;

  let agent: ApiAgentSummary;
  try {
    agent = await getAgentBySlug(slug);
  } catch (err) {
    console.error("Error loading agent:", err);
    return notFound();
  }

  if (!agent) {
    return notFound();
  }

  // Optionally fetch this agent's properties (if your API supports it)
  let properties: Property[] = [];
  try {
    const data = await getProperties({ agent: slug, page: 1, sort: "latest" });
    properties = data.results;
  } catch (err) {
    console.error("Error loading agent properties:", err);
  }

  const displayName = agent.full_name || agent.name || "Agent";

  return (
    <div className="container py-8 space-y-8">
      {/* Agent main card */}
      <section className="grid gap-6 lg:grid-cols-[1.2fr,2fr]">
        <AgentCard agent={agent} />

        <div className="card">
          <div className="card-body space-y-3">
            <h1 className="text-xl sm:text-2xl font-semibold text-slate-900">
              {displayName}
            </h1>

            {agent.specializations && agent.specializations.length > 0 && (
              <p className="text-sm text-slate-600">
                Specialised in{" "}
                <span className="font-medium">
                  {agent.specializations.join(", ")}
                </span>
              </p>
            )}

            <div className="flex flex-wrap gap-3 text-xs text-slate-500">
              {typeof agent.owned_count === "number" && (
                <span>🏡 {agent.owned_count} owned properties</span>
              )}
              {typeof agent.managed_count === "number" && (
                <span>📋 {agent.managed_count} managed properties</span>
              )}
            </div>

            {agent.bio && (
              <p className="text-sm text-slate-600 whitespace-pre-line mt-2">
                {agent.bio}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Properties by this agent */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-semibold text-slate-900">
          Properties by {displayName}
        </h2>

        {properties.length === 0 ? (
          <p className="text-sm text-slate-500">
            This agent has no properties listed yet.
          </p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {properties.map((property: Property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
