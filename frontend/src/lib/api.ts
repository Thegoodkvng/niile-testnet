// frontend/src/lib/api.ts

import type { Property, PaginatedResponse } from "@/types";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "") ??
  "http://127.0.0.1:8000/api";

// Generic JSON fetch helper
async function fetchJSON<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const url = `${API_URL}${path}`;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  const res = await fetch(url, {
    ...options,
    headers,
    cache: "no-store",
  });

  if (!res.ok) {
    let msg = `Request failed: ${res.status} ${res.statusText}`;
    try {
      const data = await res.json();
      if (data?.detail) {
        msg = data.detail;
      }
    } catch {
      // ignore JSON parse error, keep generic msg
    }
    throw new Error(msg);
  }

  return res.json();
}

// Helper to build querystring from params
function buildQuery(params: Record<string, any>): string {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (
      value !== undefined &&
      value !== null &&
      value !== "" &&
      !Number.isNaN(value)
    ) {
      search.append(key, String(value));
    }
  });
  const qs = search.toString();
  return qs ? `?${qs}` : "";
}

/**
 * Properties list with pagination.
 *
 * Our backend currently returns a plain list: [ {...}, {...} ]
 * but the frontend expects:
 * { count, next, previous, results: [...] }
 *
 * This function normalises both shapes so the rest of the app
 * can always treat it as PaginatedResponse<Property>.
 */
export async function getProperties(
  params: Record<string, any> = {},
): Promise<PaginatedResponse<Property>> {
  const qs = buildQuery(params);
  const raw = await fetchJSON<any>(`/properties/${qs}`);

  if (Array.isArray(raw)) {
    // Backend returned a simple list – wrap it into PaginatedResponse
    return {
      count: raw.length,
      next: null,
      previous: null,
      results: raw as Property[],
    };
  }

  // Assume backend already returns a paginated object
  return raw as PaginatedResponse<Property>;
}

/**
 * Get a single property by ID.
 * (If later you have a slug endpoint, you can adjust this.)
 */
export async function getPropertyById(id: number): Promise<Property> {
  return fetchJSON<Property>(`/properties/${id}/`);
}

/**
 * Basic "featured" properties helper.
 * For now we just get the first few from the list.
 */
export async function getFeaturedProperties(): Promise<Property[]> {
  const data = await getProperties({ page: 1 });
  // Take first 6 for the homepage grid
  return data.results.slice(0, 6);
}
