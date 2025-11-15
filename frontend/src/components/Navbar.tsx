// frontend/src/components/Navbar.tsx

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const linkClass = (href: string) =>
    `text-sm font-medium ${
      pathname === href
        ? "text-indigo-600"
        : "text-slate-600 hover:text-indigo-600"
    }`;

  return (
    <header className="bg-white border-b border-slate-200">
      <nav className="container flex items-center justify-between py-4">
        {/* Left: logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="h-8 w-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-sm font-bold">
            RE
          </span>
          <span className="font-semibold text-lg">Real Estate</span>
        </Link>

        {/* Right: burger + links + dashboard/profile */}
        <div className="flex items-center gap-4">
          {/* Mobile menu toggle */}
          <button
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md border border-slate-300"
            onClick={() => setOpen((o) => !o)}
          >
            <span className="sr-only">Toggle navigation</span>☰
          </button>

          {/* Links + My dashboard + My profile */}
          <div
            className={`${
              open ? "flex" : "hidden"
            } md:flex flex-col md:flex-row gap-4 md:items-center`}
          >
            <Link href="/" className={linkClass("/")}>
              Home
            </Link>
            <Link href="/properties" className={linkClass("/properties")}>
              Properties
            </Link>
            <Link href="/agents" className={linkClass("/agents")}>
              Agents
            </Link>

            {/* Dashboard & Profile links (top-right on desktop) */}
            <Link
              href="/dashboard"
              className={linkClass("/dashboard") + " md:ml-2"}
            >
              My dashboard
            </Link>
            <Link href="/profile" className={linkClass("/profile")}>
              My profile
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
