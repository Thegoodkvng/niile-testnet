// frontend/src/components/PropertyGallery.tsx
import Image from "next/image";
import type { PropertyImage } from "@/types";

export default function PropertyGallery({
  images,
  mainImage,
}: {
  images: PropertyImage[];
  mainImage: string | null;
}) {
  // Only show up to 6 thumbs for now
  const others = images.filter((img) => img.image !== mainImage).slice(0, 6);

  if (!others.length) return null;

  return (
    <div className="border-t border-slate-200 bg-slate-50 px-3 py-3">
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
        {others.map((img) => (
          <div
            key={img.id}
            className="relative h-16 overflow-hidden rounded-md bg-slate-100"
          >
            <Image
              src={img.image}
              alt={img.alt || "Property image"}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
