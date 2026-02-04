import prisma from "../db/prisma.js";

/* ================= PUBLIC ================= */

// GET all public properties
export const getAllProperties = async (req, res) => {
  try {
    const properties = await prisma.property.findMany({
      where: {
        status: { in: ["AVAILABLE", "RESERVED"] },
      },
      orderBy: { createdAt: "desc" },
    });
    res.json(properties.map(toPublicProperty));
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch properties" });
  }
};

/* ================= ADMIN ================= */

// GET all properties (admin)
export const getAdminProperties = async (req, res) => {
  try {
    const properties = await prisma.property.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(properties.map(toPublicProperty));
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch properties" });
  }
};

// ✅ GET SINGLE PROPERTY (ADMIN) — THIS WAS MISSING
export const getPropertyById = async (req, res) => {
  try {
    const property = await prisma.property.findUnique({
      where: { id: req.params.id },
    });

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.json(toPublicProperty(property));
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch property" });
  }
};

// CREATE
export const createProperty = async (req, res) => {
  try {
    const images = req.files?.map((f) => f.path) || [];

    const property = await prisma.property.create({
      data: {
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        location: req.body.location,
        category: mapCategory(req.body.category),
        status: mapStatus(req.body.status),
        images,
      },
    });

    res.status(201).json(toPublicProperty(property));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create property" });
  }
};

// UPDATE
export const updateProperty = async (req, res) => {
  try {
    const property = await prisma.property.findUnique({
      where: { id: req.params.id },
    });

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    const newImages = req.files?.map((f) => f.path) || [];
    let nextImages = property.images || [];

    if (req.body.images) {
      nextImages = Array.isArray(req.body.images)
        ? req.body.images
        : [req.body.images];
    }

    if (newImages.length) {
      nextImages = [...nextImages, ...newImages];
    }

    const updated = await prisma.property.update({
      where: { id: req.params.id },
      data: {
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        location: req.body.location,
        category: req.body.category
          ? mapCategory(req.body.category)
          : property.category,
        status: req.body.status ? mapStatus(req.body.status) : property.status,
        images: nextImages,
      },
    });

    res.json(toPublicProperty(updated));
  } catch (err) {
    res.status(500).json({ message: "Failed to update property" });
  }
};

// DELETE
export const deleteProperty = async (req, res) => {
  try {
    await prisma.property.delete({
      where: { id: req.params.id },
    });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete property" });
  }
};

// MARK SOLD
export const markPropertySold = async (req, res) => {
  try {
    const property = await prisma.property.update({
      where: { id: req.params.id },
      data: { status: "SOLD" },
    });
    res.json(toPublicProperty(property));
  } catch (err) {
    res.status(500).json({ message: "Failed to mark sold" });
  }
};

const mapCategory = (value) => {
  switch (value) {
    case "1BHK":
      return "BHK1";
    case "2BHK":
      return "BHK2";
    case "3BHK":
      return "BHK3";
    case "SHOP":
    case "VILLA":
    case "PLOT":
      return value;
    default:
      return "BHK1";
  }
};

const mapStatus = (value) => {
  switch (value) {
    case "AVAILABLE":
    case "SOLD":
    case "RESERVED":
      return value;
    default:
      return "AVAILABLE";
  }
};

const toPublicProperty = (property) => ({
  ...property,
  category: mapCategoryOut(property.category),
  images: (property.images || []).filter(
    (img) =>
      img &&
      !img.startsWith("http://localhost") &&
      !img.startsWith("http://127.0.0.1")
  ),
});

const mapCategoryOut = (value) => {
  switch (value) {
    case "BHK1":
      return "1BHK";
    case "BHK2":
      return "2BHK";
    case "BHK3":
      return "3BHK";
    default:
      return value;
  }
};
