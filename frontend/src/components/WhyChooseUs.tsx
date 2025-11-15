// src/components/WhyChooseUs.tsx

export default function WhyChooseUs() {
  return (
    <section className="mb-12">
      <h2 className="text-xl sm:text-2xl font-semibold mb-2">
        Why Choose Us
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        We provide the best real estate experience.
      </p>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border bg-white p-4 shadow-sm">
          <h3 className="text-sm font-semibold mb-1">
            Wide Range of Properties
          </h3>
          <p className="text-xs text-gray-600">
            Find the perfect property from our extensive collection of listings.
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-4 shadow-sm">
          <h3 className="text-sm font-semibold mb-1">Expert Agents</h3>
          <p className="text-xs text-gray-600">
            Work with experienced professionals who know the market.
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-4 shadow-sm">
          <h3 className="text-sm font-semibold mb-1">Trusted Service</h3>
          <p className="text-xs text-gray-600">
            Reliable and transparent service throughout your journey.
          </p>
        </div>
      </div>
    </section>
  );
}
