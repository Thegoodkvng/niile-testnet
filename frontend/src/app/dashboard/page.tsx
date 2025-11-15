// frontend/src/app/dashboard/page.tsx

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getStoredUser, getToken } from "@/lib/auth";
import type { AuthUser, Property } from "@/types";

interface DashboardState {
  user: AuthUser | null;
  properties: Property[];
  loading: boolean;
  error: string | null;
}

const API_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "") ??
  "http://127.0.0.1:8000/api";

export default function DashboardPage() {
  const router = useRouter();
  const [state, setState] = useState<DashboardState>({
    user: null,
    properties: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    async function load() {
      try {
        // 1) Get user + token from our auth helpers
        const user = getStoredUser();
        const token = getToken();

        if (!user || !token) {
          // Nothing in localStorage → send to login
          setState({
            user: null,
            properties: [],
            loading: false,
            error: null,
          });
          router.replace("/login");
          return;
        }

        // Set the user immediately so UI can show their name while we load
        setState((prev) => ({
          ...prev,
          user,
          loading: true,
          error: null,
        }));

        // 2) Call the private /api/properties/ endpoint
        const res = await fetch(`${API_URL}/properties/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        });

        if (res.status === 401 || res.status === 403) {
          // Backend rejected the token → treat as logged-out
          setState({
            user: null,
            properties: [],
            loading: false,
            error: "Your session has expired. Please log in again.",
          });
          router.replace("/login");
          return;
        }

        if (!res.ok) {
          throw new Error(
            `Failed to load properties: ${res.status} ${res.statusText}`,
          );
        }

        const data = await res.json();

        let props: Property[] = [];
        if (Array.isArray(data)) {
          props = data;
        } else if (Array.isArray((data as any).results)) {
          props = (data as any).results;
        }

        console.log("[Dashboard] Properties for current user", {
          total: props.length,
        });

        setState({
          user,
          properties: props,
          loading: false,
          error: null,
        });
      } catch (err: any) {
        console.error("[Dashboard] Error loading properties", err);
        setState((prev) => ({
          ...prev,
          loading: false,
          error: err?.message || "Something went wrong loading dashboard.",
        }));
      }
    }

    load();
  }, [router]);

  const { user, properties, loading, error } = state;

  if (loading) {
    return (
      <div className="container py-10">
        <p className="text-sm text-slate-500">Loading your dashboard...</p>
      </div>
    );
  }

  if (!user) {
    // This is what you’re seeing: "Redirecting to login…"
    // It will now only show while we actually push you to /login.
    return (
      <div className="container py-10">
        <p className="text-sm text-slate-500">
          Redirecting to login…
        </p>
      </div>
    );
  }

  const roleLabel = user.role || user.user_type || "User";

  return (
    <div className="container py-8 space-y-8">
      {/* Header */}
      <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-slate-900">
            Agent dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Welcome back, {user.full_name || user.email}. Manage your property
            listings or jump to your profile.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-[11px] font-medium text-indigo-700">
            {String(roleLabel).toUpperCase()}
          </span>
          <span className="text-[11px] text-slate-500">
            Member since{" "}
            {user.date_joined
              ? new Date(user.date_joined).toLocaleDateString()
              : "—"}
          </span>
        </div>
      </header>

      {/* Quick actions */}
      <section className="grid gap-4 sm:grid-cols-3">
        <Link href="/properties/new" className="card hover:bg-slate-50">
          <div className="card-body space-y-1">
            <p className="text-xs font-medium text-slate-500 uppercase">
              Quick action
            </p>
            <p className="text-sm font-semibold text-slate-900">
              Create new property
            </p>
            <p className="text-xs text-slate-500">
              Add a new listing to your portfolio in a few steps.
            </p>
          </div>
        </Link>

        <Link href="/properties" className="card hover:bg-slate-50">
          <div className="card-body space-y-1">
            <p className="text-xs font-medium text-slate-500 uppercase">
              Explore
            </p>
            <p className="text-sm font-semibold text-slate-900">
              Browse all properties
            </p>
            <p className="text-xs text-slate-500">
              View the full property catalogue with filters and search.
            </p>
          </div>
        </Link>

        <Link href="/profile" className="card hover:bg-slate-50">
          <div className="card-body space-y-1">
            <p className="text-xs font-medium text-slate-500 uppercase">
              Account
            </p>
            <p className="text-sm font-semibold text-slate-900">
              View my profile
            </p>
            <p className="text-xs text-slate-500">
              Update your details and see account information.
            </p>
          </div>
        </Link>
      </section>

      {/* User's properties */}
      <section className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-sm font-semibold text-slate-900">
            Your properties ({properties.length})
          </h2>
          <Link
            href="/properties/new"
            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-indigo-700"
          >
            + Create new property
          </Link>
        </div>

        {error && (
          <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-md px-3 py-2">
            {error}
          </p>
        )}

        {properties.length === 0 && !error && (
          <p className="text-xs text-slate-500 border border-dashed border-slate-200 rounded-md px-3 py-3">
            You don&apos;t have any properties linked to your account yet. Create
            your first listing from the{" "}
            <Link href="/properties/new" className="underline">
              New Property
            </Link>{" "}
            page.
          </p>
        )}

        {properties.length > 0 && (
          <div className="space-y-3">
            {properties.map((p) => (
              <div
                key={p.id}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 rounded-md border border-slate-100 bg-white px-3 py-3"
              >
                <div>
                  <p className="text-sm font-medium text-slate-900">
                    {p.title}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {[p.city, p.state, p.country].filter(Boolean).join(", ")}
                  </p>
                  {/* listing_type/property_type are optional if your model doesn't have them */}
                  {("listing_type" in p || "property_type" in p) && (
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {"listing_type" in p
                        ? p.listing_type === "rent"
                          ? "For rent"
                          : p.listing_type === "sale"
                          ? "For sale"
                          : "Listing"
                        : "Listing"}
                      {"property_type" in p && p.property_type
                        ? ` • ${p.property_type}`
                        : ""}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    href={`/properties/${p.id}`}
                    className="inline-flex items-center rounded-md border border-slate-200 px-3 py-1.5 text-[11px] font-medium text-slate-700 hover:bg-slate-50"
                  >
                    View property
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
