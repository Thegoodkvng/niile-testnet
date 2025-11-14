import { api } from "@/lib/api";
import { Agent, Property } from "@/types";
import AgentCard from "@/components/AgentCard";
import PropertyCard from "@/components/PropertyCard";

type Props = { params:{ slug:string } };

export default async function AgentPage({ params }: Props) {
  const agent = await api<Agent>(`/agents/${params.slug}/`);
  // Optional: fetch agent’s properties via query (requires agent FK/filter in backend)
  const props = await api<{results:Property[]; count:number}>(`/properties/?search=${encodeURIComponent(agent.name)}`);
  return (
    <main className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Agent</h1>
      <AgentCard a={agent} />
      {props.results.length > 0 && (
        <>
          <h2 className="text-2xl font-semibold mt-4">Listings</h2>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {props.results.map(p => <PropertyCard key={p.slug} p={p} />)}
          </ul>
        </>
      )}
    </main>
  );
}
