import Link from "next/link";
export default function Pagination({ page, count, pageSize }:{page:number; count:number; pageSize:number}) {
  const pages = Math.ceil(count / pageSize);
  if (pages <= 1) return null;
  const prev = page > 1 ? page - 1 : 1;
  const next = page < pages ? page + 1 : pages;
  return (
    <nav className="flex gap-2 mt-6">
      <Link className="px-3 py-1 border rounded" href={`/?page=${prev}`}>Prev</Link>
      <span className="px-3 py-1">{page} / {pages}</span>
      <Link className="px-3 py-1 border rounded" href={`/?page=${next}`}>Next</Link>
    </nav>
  );
}
