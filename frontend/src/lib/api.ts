// E:\My Brands\Niile\Website\Niile Testnet\NiileTestnet\frontend\src\lib\api.ts
export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE ?? "http://127.0.0.1:8000/api";

export type DRFList<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

/**
 * Safe list fetcher:
 * - returns a DRF-like object even if the API replies with an array (no pagination)
 * - returns an empty result if the request fails
 */
export async function apiList<T>(path: string, init?: RequestInit): Promise<DRFList<T>> {
  try {
    const res = await fetch(`${API_BASE}${path}`, { cache: "no-store", ...init });
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);

    const data = await res.json();

    // If backend returned a plain array (no pagination), normalize it.
    if (Array.isArray(data)) {
      return { count: data.length, next: null, previous: null, results: data as T[] };
    }

    // If backend returned a DRF paginated object, pass through.
    if (data && typeof data === "object" && "results" in data) {
      return data as DRFList<T>;
    }

    // Unknown shape → empty
    return { count: 0, next: null, previous: null, results: [] };
  } catch (err) {
    // Log on server side and return empty shape (prevents crash)
    console.error("apiList error:", err);
    return { count: 0, next: null, previous: null, results: [] };
  }
}
