"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/agents", label: "Agents" },
];

export default function Navbar() {
  const pathname = usePathname();
  return (
    <header className="border-b bg-white">
      <nav className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-bold">Niile</Link>
        <ul className="flex gap-6 text-sm">
          {links.map(l => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={`hover:underline ${pathname === l.href ? "font-semibold" : ""}`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
