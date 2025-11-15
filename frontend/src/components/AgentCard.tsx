// frontend/src/components/AgentCard.tsx

import { Agent } from "@/types";

interface AgentCardProps {
  agent: Agent;
}

export function AgentCard({ agent }: AgentCardProps) {
  const displayName = agent.full_name || agent.name || "Agent";

  const avatar =
    agent.avatar_url || agent.avatar || agent.profile_picture || null;

  const initials = displayName
    .split(" ")
    .filter((p: string) => p.length > 0)
    .map((p: string) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="card h-full flex flex-col">
      <div className="card-body flex flex-col gap-3">
        <div className="flex items-center gap-3">
          {avatar ? (
            <img
              src={avatar}
              alt={displayName}
              className="h-12 w-12 rounded-full object-cover"
            />
          ) : (
            <div className="h-12 w-12 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-bold">
              {initials}
            </div>
          )}
          <div>
            <p className="text-sm font-semibold text-slate-900">
              {displayName}
            </p>
            {agent.average_rating != null && (
              <p className="text-xs text-amber-600">
                ★ {agent.average_rating.toFixed(1)} average rating
              </p>
            )}
          </div>
        </div>

        {agent.bio && (
          <p className="text-xs text-slate-600 line-clamp-3">{agent.bio}</p>
        )}

        <div className="mt-auto flex flex-wrap gap-2 text-xs text-slate-500">
          {agent.phone && <span>📞 {agent.phone}</span>}
          {agent.email && <span>✉️ {agent.email}</span>}
          {agent.properties_count != null && (
            <span>🏠 {agent.properties_count} properties</span>
          )}
        </div>
      </div>
    </div>
  );
}

// Also export as default so both import styles work.
export default AgentCard;
