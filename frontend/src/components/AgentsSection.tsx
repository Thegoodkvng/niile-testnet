// frontend/src/components/AgentsSection.tsx

import { ApiAgentSummary } from "@/types";

interface AgentsSectionProps {
  agents: ApiAgentSummary[];
  title?: string;
}

export default function AgentsSection({
  agents,
  title = "Our Agents",
}: AgentsSectionProps) {
  if (!agents || agents.length === 0) {
    return (
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-semibold text-slate-900">
          {title}
        </h2>
        <p className="text-sm text-slate-500">
          No agents available at the moment.
        </p>
      </section>
    );
  }

  return (
    <section className="space-y-4">
      <h2 className="text-lg sm:text-xl font-semibold text-slate-900">
        {title}
      </h2>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {agents.map((agent) => {
          const displayName =
            agent.full_name ?? agent.name ?? "Agent";

          return (
            <article
              key={agent.id}
              className="card h-full flex flex-col justify-between"
            >
              <div className="card-body space-y-3">
                <div className="flex items-center gap-3">
                  {agent.profile_picture || agent.avatar_url || agent.avatar ? (
                    <img
                      src={
                        agent.profile_picture ||
                        agent.avatar_url ||
                        agent.avatar!
                      }
                      alt={displayName}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-12 w-12 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-semibold">
                      {displayName
                        .split(" ")
                        .filter((part) => part.length > 0)
                        .map((part) => part[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase()}
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {displayName}
                    </p>
                    {agent.specializations &&
                      agent.specializations.length > 0 && (
                        <p className="text-xs text-slate-500">
                          {agent.specializations.join(" · ")}
                        </p>
                      )}
                  </div>
                </div>

                {agent.specializations &&
                  agent.specializations.length > 0 && (
                    <p className="text-xs text-slate-600">
                      Specialised in{" "}
                      <span className="font-medium">
                        {agent.specializations[0]}
                      </span>
                      {agent.specializations.length > 1 && " and more"}
                    </p>
                  )}

                <div className="flex flex-wrap gap-2 text-[11px] text-slate-500">
                  {typeof agent.owned_count === "number" && (
                    <span>🏡 {agent.owned_count} owned</span>
                  )}
                  {typeof agent.managed_count === "number" && (
                    <span>📋 {agent.managed_count} managed</span>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
