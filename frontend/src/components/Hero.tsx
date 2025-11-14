import SearchBar from "@/components/SearchBar";

export default function Hero() {
  return (
    <section className="bg-slate-50 border-b">
      <div className="max-w-6xl mx-auto px-4 py-10 md:py-14">
        <h1 className="text-3xl md:text-4xl font-bold">Find your next home</h1>
        <p className="mt-2 opacity-75">Browse verified listings and contact trusted agents.</p>
        <div className="mt-6">
          <SearchBar />
        </div>
      </div>
    </section>
  );
}
