// frontend/src/app/page.tsx

import Link from "next/link";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-50 to-slate-50 border-b border-slate-200">
        <div className="container py-12 lg:py-16 grid gap-10 lg:grid-cols-[3fr,2fr] items-center">
          <div className="space-y-5">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900">
              Find and list{" "}
              <span className="text-indigo-600">trustworthy properties</span>.
            </h1>

            <p className="text-sm sm:text-base text-slate-600 max-w-xl">
              Niile helps buyers and renters discover quality homes and
              real estate from verified agents and developers. List your own
              properties or explore what&apos;s on the market.
            </p>

            {/* Main CTAs */}
            <div className="flex flex-wrap gap-3 mt-2">
              <Link href="/properties" className="btn-primary text-sm">
                Browse Properties
              </Link>
              <Link
                href="/agents"
                className="inline-flex items-center text-sm font-medium text-indigo-700 hover:text-indigo-800"
              >
                Meet Our Agents →
              </Link>
            </div>

            {/* Agent auth actions */}
            <div className="mt-6 border-t border-slate-200 pt-4 space-y-2">
              <p className="text-xs font-semibold text-slate-500 uppercase">
                For agents &amp; developers
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/register"
                  className="inline-flex items-center rounded-md border border-indigo-600 px-3 py-1.5 text-xs font-medium text-indigo-700 hover:bg-indigo-50"
                >
                  Register as Agent
                </Link>
                <Link
                  href="/login"
                  className="inline-flex items-center rounded-md border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
                >
                  Agent Login
                </Link>
              </div>
              <p className="text-[11px] text-slate-500">
                Create an agent account to list and manage your properties
                directly from the platform.
              </p>
            </div>
          </div>

          {/* Right-hand card */}
          <div className="hidden md:block">
            <div className="card">
              <div className="card-body space-y-4">
                <p className="text-xs uppercase font-semibold text-slate-500">
                  Quick overview
                </p>
                <p className="text-sm text-slate-600">
                  Start by registering as an agent, then create your first sample
                  property. It will appear immediately on the properties page,
                  just like in the original real estate demo project.
                </p>
                <ul className="text-xs text-slate-600 space-y-1">
                  <li>• Register or log in as an agent</li>
                  <li>• Go to <code>/properties/new</code> to add a property</li>
                  <li>• See it live on the public listings page</li>
                </ul>
                <div className="text-[11px] text-slate-400">
                  You can always access registration directly at{" "}
                  <code>/register</code> and login at <code>/login</code>.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Simple “How it works” section */}
      <section className="container py-10 space-y-6">
        <h2 className="text-lg sm:text-xl font-semibold text-slate-900">
          How Niile works
        </h2>
        <div className="grid gap-5 sm:grid-cols-3 text-sm text-slate-600">
          <div className="card">
            <div className="card-body space-y-2">
              <p className="text-xs font-semibold text-slate-500 uppercase">
                1. Register
              </p>
              <p>
                Create your agent account so you can list and manage properties
                under your own profile.
              </p>
            </div>
          </div>
          <div className="card">
            <div className="card-body space-y-2">
              <p className="text-xs font-semibold text-slate-500 uppercase">
                2. Add a property
              </p>
              <p>
                Use the <code>/properties/new</code> page to add your first
                property: price, beds, location and more.
              </p>
            </div>
          </div>
          <div className="card">
            <div className="card-body space-y-2">
              <p className="text-xs font-semibold text-slate-500 uppercase">
                3. Share &amp; showcase
              </p>
              <p>
                Prospects can browse your listing on the properties page
                and contact you directly as the verified agent.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
