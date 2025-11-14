export default function Footer() {
  return (
    <footer className="border-t mt-10">
      <div className="max-w-6xl mx-auto px-4 py-8 text-sm opacity-70">
        © {new Date().getFullYear()} Niile — All rights reserved.
      </div>
    </footer>
  );
}
