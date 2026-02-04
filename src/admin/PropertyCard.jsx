export default function PropertyCard({
  property,
  onEdit,
  onDelete,
  onMarkSold,
}) {
  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-lg">{property.title}</h3>
          <p className="text-sm text-gray-600">
            {property.category} • {property.location}
          </p>
          <p className="mt-1 font-bold text-green-600">
            {property.price}
          </p>
          <span
            className={`inline-block mt-2 px-2 py-1 text-xs rounded ${
              property.status === "AVAILABLE"
                ? "bg-green-100 text-green-700"
                : property.status === "SOLD"
                ? "bg-red-100 text-red-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {property.status}
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <button
            onClick={() => onEdit(property._id)}
            className="text-sm px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Edit
          </button>

          <button
            onClick={() => onMarkSold(property._id)}
            className="text-sm px-3 py-1 rounded bg-orange-500 text-white hover:bg-orange-600"
            disabled={property.status === "SOLD"}
          >
            Mark Sold
          </button>

          <button
            onClick={() => onDelete(property._id)}
            className="text-sm px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
