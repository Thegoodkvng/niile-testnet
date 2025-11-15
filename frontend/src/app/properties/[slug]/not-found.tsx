// E:\...\frontend\src\app\properties\[slug]\not-found.tsx
import Link from "next/link";

export default function PropertyNotFound() {
  return (
    <div className="container py-16 text-center space-y-4">
      <h1 className="text-2xl font-semibold text-slate-900">
        Property not found
      </h1>
      <p className="text-sm text-slate-500">
        The property you are looking for does not exist or has been removed.
      </p>
      <Link href="/properties" className="btn-primary text-xs">
        Back to properties
      </Link>
    </div>
  );
}
