import { FaInstagram, FaYoutube } from "react-icons/fa";

export default function App() {
  const phone = "tel:9145045020";
  const whatsapp =
    "https://wa.me/919145045020?text=Hi,%20I%E2%80%99m%20interested%20in%20buying%20a%20property%20in%20Neral.%20Please%20call%20me.";

  const instagramLink =
    "https://www.instagram.com/visionrealestate.neral/";
  const youtubeLink =
    "https://www.youtube.com/@VisionRealEstateNeral";

  const properties = [
    {
      title: "2 BHK Apartment",
      location: "Neral East",
      price: "₹28 Lakhs",
      image: "/properties/profile1.png"
    },
    {
      title: "Commercial Shop",
      location: "Badlapur West",
      price: "₹45 Lakhs",
      image: "/properties/profile2.png"
    },
    {
      title: "Luxury Villa",
      location: "Karjat",
      price: "₹95 Lakhs",
      image: "/properties/profile3.png"
    }
  ];

  return (
    <div className="font-sans text-gray-800">

      
      {/* PREMIUM HEADER */}
      <header className="bg-gradient-to-br from-[#091e57] via-[#0c721e] to-[#540730] text-white">

        <div className="px-4 py-10 flex flex-col items-center text-center">

          {/* LOGO */}
          <img
            src="/logo.png"
            alt="Vision RealEstate Logo"
            className="w-35 h-35 md:w-28 md:h-28 object-contain mb-4"
          />

          {/* BRAND NAME */}
          <h1 className="text-2xl md:text-3xl font-bold tracking-wide">
            Vision RealEstate
          </h1>

          {/* BROKER NAME */}
          <p className="mt-1 text-sm md:text-base text-gray-300">
            By Maaz Palte • Neral
          </p>

          {/* TAGLINE */}
          <p className="mt-3 max-w-md text-sm md:text-base text-gray-400">
            Trusted Property Consultant for Buying, Selling & Renting Homes
            across Neral, Karjat & Badlapur
          </p>

        </div>
      </header>

      {/* FEATURED PROPERTIES */}
      <section className="px-4 py-10">
        <h2 className="text-xl font-bold mb-4">
          Featured Properties
        </h2>

        <div className="grid gap-6">
          {properties.map((p, i) => (
            <div
              key={i}
              className="border rounded-lg overflow-hidden bg-white hover:shadow-lg transition"
            >
              <img
                src={p.image}
                alt={p.title}
                className="w-full h-52 object-cover"
              />

              <div className="p-4">
                <h3 className="font-semibold text-lg">
                  {p.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {p.location}
                </p>
                <p className="font-bold text-green-600 mt-2">
                  {p.price}
                </p>

                <a
                  href={whatsapp}
                  className="block mt-3 bg-indigo-600 text-white text-center py-2 rounded"
                >
                  Contact Agent
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="px-4 py-10 bg-gray-100">
        <h2 className="text-xl font-bold mb-3">
          Why Choose Us
        </h2>
        <ul className="space-y-2 text-sm">
          <li>✔ 100+ Successful Deals</li>
          <li>✔ Local Market Expert</li>
          <li>✔ Trusted Property Consultant</li>
        </ul>
      </section>

      {/* AREAS COVERED */}
      <section className="px-4 py-10">
        <h2 className="text-xl font-bold mb-3">
          Areas Covered
        </h2>
        <p className="text-sm">
          Neral • Badlapur • Karjat • Vangani • Matheran
        </p>
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

      {/* MAP */}
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
            © {new Date().getFullYear()} Vision RealEstate Neral
          </p>

          <div className="flex gap-6 text-2xl">
            <a
              href={instagramLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-400"
            >
              <FaInstagram />
            </a>
            <a
              href={youtubeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-500"
            >
              <FaYoutube />
            </a>
          </div>
        </div>
      </footer>

      {/* STICKY MOBILE CTA */}
      <div className="fixed bottom-0 left-0 right-0 flex md:hidden">
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
