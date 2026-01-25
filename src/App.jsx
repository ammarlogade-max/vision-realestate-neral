export default function App() {
  const phone = "tel:9145045020";
  const whatsapp =
    "https://wa.me/919145045020?text=Hi,%20I%E2%80%99m%20interested%20in%20buying%20a%20property%20in%20Neral.%20Please%20call%20me.";

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

      {/* HERO */}
      <section className="px-4 py-10 bg-slate-900 text-white">
        <h1 className="text-2xl font-bold">
          Maaz Palte – Vision RealEstate Neral
        </h1>
        <p className="mt-2 text-sm">
          Buy • Sell • Rent Properties in Neral, Karjat, Badlapur
        </p>

        <div className="mt-5 flex gap-3">
          <a href={phone} className="flex-1 bg-green-500 py-3 text-center rounded font-semibold">
            Call Now
          </a>
          <a href={whatsapp} className="flex-1 bg-green-600 py-3 text-center rounded font-semibold">
            WhatsApp
          </a>
        </div>
      </section>

      {/* PROPERTIES */}
      <section className="px-4 py-10">
        <h2 className="text-xl font-bold mb-4">Featured Properties</h2>

  <div className="grid gap-4">
  {properties.map((p, i) => (
    <div
      key={i}
      className="border rounded-lg overflow-hidden hover:shadow-lg transition bg-white"
    >
      {/* Image */}
      <div className="w-full h-52 overflow-hidden">
        <img
          src={p.image}
          alt={p.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-lg">{p.title}</h3>
        <p className="text-sm text-gray-600">{p.location}</p>
        <p className="font-bold text-green-600 mt-2">{p.price}</p>
      </div>
    </div>
  ))}
</div>

      </section>

      {/* WHY US */}
      <section className="px-4 py-10 bg-gray-100">
        <h2 className="text-xl font-bold mb-3">Why Choose Us</h2>
        <ul className="space-y-2 text-sm">
          <li>✔ RERA Registered Broker</li>
          <li>✔ 100+ Successful Deals</li>
          <li>✔ Local Market Expert</li>
        </ul>
      </section>

      {/* AREAS */}
      <section className="px-4 py-10">
        <h2 className="text-xl font-bold mb-3">Areas Covered</h2>
        <p className="text-sm">
          Neral • Badlapur • Karjat • Vangani • Matheran
        </p>
      </section>

      {/* CTA */}
      <section className="px-4 py-10 bg-green-50 text-center">
        <h2 className="text-xl font-bold mb-3">
          Looking to Buy or Sell Property?
        </h2>
        <a href={whatsapp} className="inline-block bg-green-600 text-white px-6 py-3 rounded font-semibold">
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
      <footer className="px-4 py-6 bg-slate-900 text-white text-sm text-center">
        © {new Date().getFullYear()} Vision RealEstate Neral
      </footer>

      {/* STICKY BUTTONS */}
      <div className="fixed bottom-0 left-0 right-0 flex">
        <a href={phone} className="flex-1 bg-green-500 text-white text-center py-3 font-semibold">
          Call
        </a>
        <a href={whatsapp} className="flex-1 bg-green-600 text-white text-center py-3 font-semibold">
          WhatsApp
        </a>
      </div>
    </div>
  );
}
