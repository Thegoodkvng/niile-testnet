// E:\...\frontend\src\components/Footer.tsx
export function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 mt-10">
      <div className="container py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-slate-500">
          © {new Date().getFullYear()} Real Estate Management System. All
          rights reserved.
        </p>
        <p className="text-xs text-slate-400">
          Built with Django &amp; Next.js
        </p>
      </div>
    </footer>
  );
}
