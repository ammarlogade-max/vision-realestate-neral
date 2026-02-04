import Property from "../models/Property.js";

/* ================= PUBLIC ================= */

// GET all public properties
export const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find({
      status: { $in: ["AVAILABLE", "RESERVED"] },
    }).sort({ createdAt: -1 });
    res.json(properties);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch properties" });
  }
};

/* ================= ADMIN ================= */

// GET all properties (admin)
export const getAdminProperties = async (req, res) => {
  try {
    const properties = await Property.find().sort({ createdAt: -1 });
    res.json(properties);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch properties" });
  }
};

// ✅ GET SINGLE PROPERTY (ADMIN) — THIS WAS MISSING
export const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.json(property);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch property" });
  }
};

// CREATE
export const createProperty = async (req, res) => {
  try {
    const images = req.files?.map((f) => `/uploads/${f.filename}`) || [];

    const property = await Property.create({
      ...req.body,
      images,
    });

    res.status(201).json(property);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create property" });
  }
};

// UPDATE
export const updateProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    const newImages = req.files?.map((f) => `/uploads/${f.filename}`) || [];
    let nextImages = property.images;

    if (req.body.images) {
      nextImages = Array.isArray(req.body.images)
        ? req.body.images
        : [req.body.images];
    }

    if (newImages.length) {
      nextImages = [...nextImages, ...newImages];
    }

    property.images = nextImages;

    Object.assign(property, req.body);
    await property.save();

    res.json(property);
  } catch (err) {
    res.status(500).json({ message: "Failed to update property" });
  }
};

// DELETE
export const deleteProperty = async (req, res) => {
  try {
    await Property.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete property" });
  }
};

// MARK SOLD
export const markPropertySold = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    property.status = "SOLD";
    await property.save();
    res.json(property);
  } catch (err) {
    res.status(500).json({ message: "Failed to mark sold" });
  }
};
