// frontend/src/app/profile/page.tsx

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { AuthUser, Property } from "@/types";

interface ProfileState {
  user: AuthUser | null;
  properties: Property[];
  loading: boolean;
  error: string | null;
}

const API_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "") ??
  "http://127.0.0.1:8000/api";

export default function ProfilePage() {
  const [state, setState] = useState<ProfileState>({
    user: null,
    properties: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    async function load() {
      try {
        if (typeof window === "undefined") return;

        const userRaw = window.localStorage.getItem("niile_user");
        const token = window.localStorage.getItem("niile_token");

        if (!userRaw || !token) {
          setState((prev) => ({
            ...prev,
            loading: false,
            user: null,
          }));
          return;
        }

        let user: AuthUser;
        try {
          user = JSON.parse(userRaw);
        } catch {
          setState((prev) => ({
            ...prev,
            loading: false,
            error: "Could not read saved user data. Please log in again.",
            user: null,
          }));
          return;
        }

        // Fetch all properties from the API
        const res = await fetch(`${API_URL}/properties/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error(
            `Failed to load properties: ${res.status} ${res.statusText}`,
          );
        }

        const data = await res.json();

        let allProps: Property[] = [];
        if (Array.isArray(data)) {
          allProps = data;
        } else if (Array.isArray(data.results)) {
          allProps = data.results;
        }

        const userId = user.id;
        const myProperties = allProps.filter(
          (p: any) => p.owner === userId || p.agent === userId,
        );

        setState({
          user,
          properties: myProperties,
          loading: false,
          error: null,
        });
      } catch (err: any) {
        setState((prev) => ({
          ...prev,
          loading: false,
          error: err?.message || "Something went wrong loading profile.",
        }));
      }
    }

    load();
  }, []);

  const { user, properties, loading, error } = state;

  const roleLabel = user ? (user.role || user.user_type || "User") : null;

  if (loading) {
    return (
      <div className="container py-10">
        <p className="text-sm text-slate-500">Loading your profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container py-10 space-y-4">
        <h1 className="text-xl font-semibold text-slate-900">
          You&apos;re not logged in
        </h1>
        <p className="text-sm text-slate-600 max-w-md">
          To access your profile and property dashboard, please log in or create
          an account.
        </p>
        <div className="flex gap-3">
          <Link
            href="/login"
            className="btn-primary text-xs px-4 py-2 rounded-md"
          >
            Log in
          </Link>
          <Link
            href="/register"
            className="text-xs text-indigo-700 font-medium hover:underline"
          >
            Register
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8 space-y-8">
      {/* Page title */}
      <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-slate-900">
            My profile
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            View your profile details and properties linked to your account.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {roleLabel && (
            <span className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-[11px] font-medium text-indigo-700">
              {String(roleLabel).toUpperCase()}
            </span>
          )}
          <span className="text-[11px] text-slate-500">
            Member since{" "}
            {user.date_joined
              ? new Date(user.date_joined).toLocaleDateString()
              : "—"}
          </span>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1.3fr,2fr] items-start">
        {/* Left: Profile card */}
        <section className="space-y-4">
          <div className="card">
            <div className="card-body space-y-3">
              <h2 className="text-sm font-semibold text-slate-900">
                Profile details
              </h2>

              <div className="space-y-2 text-sm">
                <div>
                  <p className="text-xs text-slate-500 uppercase">Full name</p>
                  <p className="font-medium text-slate-900">
                    {user.full_name || "—"}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-500 uppercase">Email</p>
                  <p className="font-medium text-slate-900">{user.email}</p>
                </div>

                <div>
                  <p className="text-xs text-slate-500 uppercase">
                    Phone number
                  </p>
                  <p className="font-medium text-slate-900">
                    {user.phone_number || "—"}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-500 uppercase">User type</p>
                  <p className="font-medium text-slate-900">
                    {roleLabel || "—"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Hint card */}
          <div className="card">
            <div className="card-body space-y-2">
              <h3 className="text-sm font-semibold text-slate-900">
                What can you do here?
              </h3>
              <ul className="text-xs text-slate-600 list-disc list-inside space-y-1">
                <li>Review your basic profile information.</li>
                <li>
                  See properties linked to your account (owner/agent/landlord).
                </li>
                <li>
                  Create new listings from the{" "}
                  <Link href="/properties/new" className="underline">
                    New Property
                  </Link>{" "}
                  page.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Right: Properties list */}
        <section className="space-y-3">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-sm font-semibold text-slate-900">
              Your properties
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
              You don&apos;t have any properties linked to your account yet. If
              you&apos;re an agent, landlord or investor, you can create a
              property from the{" "}
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
                      {[p.city, p.state, p.country]
                        .filter(Boolean)
                        .join(", ")}
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {p.listing_type === "rent"
                        ? "For rent"
                        : p.listing_type === "sale"
                        ? "For sale"
                        : "Listing"}
                      {p.property_type ? ` • ${p.property_type}` : ""}
                    </p>
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
    </div>
  );
}
