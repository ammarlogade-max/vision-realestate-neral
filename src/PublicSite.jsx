import { useEffect, useState } from "react";
import { fetchProperties } from "./services/api";
import { FaInstagram, FaYoutube } from "react-icons/fa";
import ImageCarousel from "./components/ImageCarousel";




export default function App() {
  const phone = "tel:9145045020";
  const whatsapp =
    "https://wa.me/919145045020?text=Hi,%20I%E2%80%99m%20interested%20in%20buying%20a%20property%20in%20Neral.%20Please%20call%20me.";

  const instagramLink = "https://www.instagram.com/visionrealestate.neral/";
  const youtubeLink = "https://www.youtube.com/@VisionRealEstateNeral";

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProperties()
      .then((data) => setProperties(data || []))
      .catch(() => setProperties([]))
      .finally(() => setLoading(false));
  }, []);

  const categories = [
    { key: "1BHK", title: "1 BHK Flats" },
    { key: "2BHK", title: "2 BHK Flats" },
    { key: "3BHK", title: "3 BHK Flats" },
    { key: "SHOP", title: "Commercial Shops" },
    { key: "VILLA", title: "Villas" },
    { key: "PLOT", title: "Plots" },
  ];

  return (
    <div className="font-sans text-gray-800 pb-16">

      {/* PREMIUM HEADER */}
      <header className="bg-gradient-to-br from-[#091e57] via-[#0c721e] to-[#540730] text-white">
        <div className="px-4 py-10 flex flex-col items-center text-center">
          <img
            src="/logo.png"
            alt="Vision RealEstate Logo"
            className="w-28 h-28 object-contain mb-4"
          />
          <h1 className="text-2xl md:text-3xl font-bold tracking-wide">
            Vision RealEstate
          </h1>
          <p className="mt-1 text-sm md:text-base text-gray-300">
            By Maaz Palte - Neral
          </p>
          <p className="mt-3 max-w-md text-sm md:text-base text-gray-200">
            Trusted Property Consultant for Buying, Selling & Renting Homes
            across Neral, Karjat & Badlapur
          </p>
        </div>
      </header>

      {/* PROPERTY SECTIONS */}
      <section className="px-4 py-10 space-y-16">
        {loading && <p>Loading properties...</p>}

        {!loading &&
          categories.map((cat) => {
            const list = properties.filter(
              (p) =>
                p.category === cat.key &&
                (p.status === "AVAILABLE" || p.status === "RESERVED")
            );

            return (
              <div key={cat.key}>
                <h2 className="text-2xl font-bold mb-4">{cat.title}</h2>

                {list.length === 0 ? (
                  <p className="text-sm text-gray-500">
                    No properties available currently.
                  </p>
                ) : (
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {list.map((p) => (
                      <div
                        key={p.id}
                        className="border rounded-lg overflow-hidden bg-white hover:shadow-lg transition"
                      >
                        <div className="w-full h-52 overflow-hidden">
                           <ImageCarousel images={p.images} />
                        </div>

                        <div className="p-4">
                          <h3 className="font-semibold text-lg">
                            {p.title}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {p.location}
                          </p>
                          {p.status === "RESERVED" && (
                            <p className="text-xs font-semibold text-orange-600 mt-1">
                              Reserved
                            </p>
                          )}
                          <p className="font-bold text-green-600 mt-2">
                            {p.price}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
      </section>

      {/* CTA */}
      <section className="px-4 py-10 bg-green-50 text-center">
        <h2 className="text-xl font-bold mb-3">
          Looking to Buy or Sell Property?
        </h2>
        <a
          href={whatsapp}
          className="inline-block bg-green-600 text-white px-6 py-3 rounded font-semibold"
        >
          WhatsApp Now
        </a>
      </section>

      {/* MAP (RESTORED) */}
      <section className="px-4 py-10">
        <iframe
          src="https://www.google.com/maps?q=rp%20internet%20service%20neral&output=embed"
          className="w-full h-64 border rounded"
          loading="lazy"
        ></iframe>
      </section>

      {/* FOOTER */}
      <footer className="px-4 py-6 bg-slate-900 text-white text-sm">
        <div className="flex flex-col items-center gap-4">
          <p>
            {"\u00A9"} {new Date().getFullYear()} Vision RealEstate Neral{" "}
            {"\u2022"} Designed & Developed by Ammar Logade
          </p>
          <div className="flex gap-6 text-2xl">
            <a
              href={instagramLink}
              target="_blank"
              rel="noreferrer"
              className="text-pink-400"
            >
              <FaInstagram />
            </a>
            <a
              href={youtubeLink}
              target="_blank"
              rel="noreferrer"
              className="text-red-500"
            >
              <FaYoutube />
            </a>
          </div>
        </div>
      </footer>

      {/* STICKY BUTTONS */}
      <div className="fixed bottom-0 left-0 right-0 flex">
        <a
          href={phone}
          className="flex-1 bg-green-500 text-white text-center py-3 font-semibold"
        >
          Call
        </a>
        <a
          href={whatsapp}
          className="flex-1 bg-green-600 text-white text-center py-3 font-semibold"
        >
          WhatsApp
        </a>
      </div>
    </div>
  );
}
