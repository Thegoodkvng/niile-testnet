import { api } from "@/lib/api";
import { Agent } from "@/types";
import AgentCard from "@/components/AgentCard";

export default async function AgentsPage() {
  const agents = await api<Agent[]>("/agents/");
  return (
    <main className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Agents</h1>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {agents.map(a => <AgentCard key={a.slug} a={a} />)}
      </ul>
    </main>
  );
}
