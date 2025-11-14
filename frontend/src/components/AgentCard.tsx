import Image from "next/image";
import Link from "next/link";
import { Agent } from "@/types";

export default function AgentCard({ a }: { a: Agent }) {
  return (
    <li className="rounded-2xl shadow p-4 bg-white">
      {a.avatar && <Image src={a.avatar} alt={a.name} width={96} height={96} className="rounded-full mb-2" />}
      <h3 className="text-lg font-semibold"><Link href={`/agents/${a.slug}`} className="underline">{a.name}</Link></h3>
      {a.phone && <p className="text-sm opacity-70">{a.phone}</p>}
    </li>
  );
}
