import Property from "../models/Property.js";

// GET ALL PROPERTIES
export const getProperties = async (req, res) => {
  try {
    const {
      city,
      category,
      minPrice,
      maxPrice,
      guests,
      search,
    } = req.query;

    const filter = {};

    // City
    if (city) {
      filter.city = {
        $regex: city,
        $options: "i",
      };
    }

    // Category
    if (category) {
      filter.category = category;
    }

    // Price
    if (minPrice || maxPrice) {
      filter.price = {};

      if (minPrice) {
        filter.price.$gte = Number(minPrice);
      }

      if (maxPrice) {
        filter.price.$lte = Number(maxPrice);
      }
    }

    // Guests
    if (guests) {
      filter.guests = {
        $gte: Number(guests),
      };
    }

    // Search
    if (search) {
      filter.$or = [
        {
          title: {
            $regex: search,
            $options: "i",
          },
        },
        {
          city: {
            $regex: search,
            $options: "i",
          },
        },
        {
          location: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    const properties = await Property.find(filter)
      .populate("host", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: properties.length,
      properties,
    });
  } catch (error) {
    console.error("Get properties error:", error);

    res.status(500).json({
      message: "Failed to fetch properties",
    });
  }
};


// GET SINGLE PROPERTY
export const getProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id)
      .populate("host", "name email");

    if (!property) {
      return res.status(404).json({
        message: "Property not found",
      });
    }

    res.status(200).json({
      property,
    });
  } catch (error) {
    console.error("Get property error:", error);

    res.status(500).json({
      message: "Failed to fetch property",
    });
  }
};


// CREATE PROPERTY
export const createProperty = async (req, res) => {
  try {
    const property = await Property.create({
      ...req.body,
      host: req.user._id,
    });

    res.status(201).json({
      message: "Property created successfully",
      property,
    });
  } catch (error) {
    console.error("Create property error:", error);

    res.status(500).json({
      message: "Failed to create property",
    });
  }
};

// UPDATE PROPERTY
export const updateProperty = async (req, res) => {
  try {
    const { id } = req.params;

    const property = await Property.findById(id);

    if (!property) {
      return res.status(404).json({
        message: "Property not found",
      });
    }

    // Only owner can edit
    if (
      property.host &&
      property.host.toString() !== req.user.id
    ) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    const updatedProperty =
      await Property.findByIdAndUpdate(
        id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    res.status(200).json({
      message: "Property updated successfully",
      property: updatedProperty,
    });
  } catch (error) {
    console.error("Update property error:", error);

    res.status(500).json({
      message: "Failed to update property",
    });
  }
};


// DELETE PROPERTY
export const deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;

    const property = await Property.findById(id);

    if (!property) {
      return res.status(404).json({
        message: "Property not found",
      });
    }

    // Only owner can delete
    if (
      property.host &&
      property.host.toString() !== req.user.id
    ) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    await Property.findByIdAndDelete(id);

    res.status(200).json({
      message: "Property deleted successfully",
    });
  } catch (error) {
    console.error("Delete property error:", error);

    res.status(500).json({
      message: "Failed to delete property",
    });
  }
};

// GET MY PROPERTIES
export const getMyProperties = async (req, res) => {
  try {
    const properties = await Property.find({
      host: req.user._id,
    })
      .populate("host", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: properties.length,
      properties,
    });
  } catch (error) {
    console.error("Get my properties error:", error);

    res.status(500).json({
      message: "Failed to fetch your properties",
    });
  }
};