import { useState } from "react";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export default function ImageCarousel({ images = [] }) {
  const [index, setIndex] = useState(0);

  if (!images.length) return null;

  const prev = () => {
    setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  };

  const next = () => {
    setIndex((i) => (i === images.length - 1 ? 0 : i + 1));
  };

  return (
    <div className="relative w-full h-52 bg-black overflow-hidden">
      {(() => {
        const img = images[index];
        const src = img?.startsWith("http") ? img : `${API_BASE}${img}`;
        return (
          <img
            src={src}
            alt="Property"
            className="w-full h-full object-cover"
          />
        );
      })()}

      {images.length > 1 && (
        <>
          {/* LEFT */}
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white px-2 py-1 rounded"
          >
            {"<"}
          </button>

          {/* RIGHT */}
          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white px-2 py-1 rounded"
          >
            {">"}
          </button>

          {/* DOTS */}
          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
            {images.map((_, i) => (
              <span
                key={i}
                className={`h-2 w-2 rounded-full ${
                  i === index ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
