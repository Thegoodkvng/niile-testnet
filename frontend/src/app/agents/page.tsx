// E:\...\frontend\src\app\agents\page.tsx
import { getAgents } from "@/lib/api";
import { AgentCard } from "@/components/AgentCard";

export const revalidate = 60;

export default async function AgentsPage() {
  const data = await getAgents();
  const agents = data.results;

  return (
    <div className="container py-8 space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-semibold text-slate-900">
          Our Agents
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Browse our verified agents and contact them about available
          properties.
        </p>
      </div>

      {agents.length === 0 ? (
        <p className="text-sm text-slate-500">No agents available yet.</p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {agents.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>
      )}
    </div>
  );
}
