import dotenv from "dotenv";
import mongoose from "mongoose";
import Property from "./models/Property.js";

dotenv.config();

const properties = [
  {
    title: "Luxury Beach Villa",
    description:
      "A beautiful luxury villa near the beach with a private pool and stunning sunset views.",
    location: "North Goa",
    city: "Goa",
    country: "India",
    price: 4500,
    rating: 4.9,
    reviews: 128,
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80",
    ],
    category: "Villa",
    guests: 6,
    bedrooms: 3,
    beds: 4,
    bathrooms: 3,
    amenities: [
      "WiFi",
      "Swimming Pool",
      "Air Conditioning",
      "Kitchen",
      "Parking",
      "Beach Access",
    ],
  },

  {
    title: "Modern City Apartment",
    description:
      "Stylish modern apartment located in the heart of New Delhi.",
    location: "South Delhi",
    city: "New Delhi",
    country: "India",
    price: 3200,
    rating: 4.8,
    reviews: 96,
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80",
    images: [],
    category: "Apartment",
    guests: 4,
    bedrooms: 2,
    beds: 2,
    bathrooms: 2,
    amenities: [
      "WiFi",
      "Air Conditioning",
      "Kitchen",
      "Workspace",
      "Parking",
    ],
  },

  {
    title: "Mountain View Retreat",
    description:
      "Peaceful mountain retreat surrounded by pine forests and beautiful Himalayan views.",
    location: "Old Manali",
    city: "Manali",
    country: "India",
    price: 5100,
    rating: 4.9,
    reviews: 84,
    image:
      "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=80",
    images: [],
    category: "Cabin",
    guests: 5,
    bedrooms: 2,
    beds: 3,
    bathrooms: 2,
    amenities: [
      "WiFi",
      "Mountain View",
      "Fireplace",
      "Kitchen",
      "Parking",
    ],
  },

  {
    title: "Cozy Himalayan Cottage",
    description:
      "A charming wooden cottage perfect for a peaceful weekend in the mountains.",
    location: "Shimla Hills",
    city: "Shimla",
    country: "India",
    price: 3800,
    rating: 4.7,
    reviews: 72,
    image:
      "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&w=1200&q=80",
    images: [],
    category: "Cottage",
    guests: 4,
    bedrooms: 2,
    beds: 2,
    bathrooms: 1,
    amenities: [
      "WiFi",
      "Fireplace",
      "Garden",
      "Kitchen",
      "Mountain View",
    ],
  },

  {
    title: "Royal Jaipur Haveli",
    description:
      "Experience traditional Rajasthani architecture with modern luxury.",
    location: "Pink City",
    city: "Jaipur",
    country: "India",
    price: 4200,
    rating: 4.8,
    reviews: 113,
    image:
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80",
    images: [],
    category: "House",
    guests: 5,
    bedrooms: 2,
    beds: 3,
    bathrooms: 2,
    amenities: [
      "WiFi",
      "Breakfast",
      "Air Conditioning",
      "Garden",
      "Parking",
    ],
  },

  {
    title: "Kerala Backwater House",
    description:
      "Relax beside the peaceful Kerala backwaters in this beautiful private home.",
    location: "Alleppey",
    city: "Alleppey",
    country: "India",
    price: 3900,
    rating: 4.9,
    reviews: 91,
    image:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80",
    images: [],
    category: "House",
    guests: 4,
    bedrooms: 2,
    beds: 2,
    bathrooms: 2,
    amenities: [
      "WiFi",
      "Waterfront",
      "Kitchen",
      "Air Conditioning",
      "Parking",
    ],
  },

  {
    title: "Luxury Udaipur Lake House",
    description:
      "Elegant stay overlooking the beautiful lakes of Udaipur.",
    location: "Lake Pichola",
    city: "Udaipur",
    country: "India",
    price: 6200,
    rating: 5.0,
    reviews: 67,
    image:
      "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80",
    images: [],
    category: "Villa",
    guests: 6,
    bedrooms: 3,
    beds: 4,
    bathrooms: 3,
    amenities: [
      "WiFi",
      "Lake View",
      "Swimming Pool",
      "Breakfast",
      "Parking",
    ],
  },

  {
    title: "Peaceful Rishikesh Cabin",
    description:
      "A relaxing cabin surrounded by nature, perfect for a peaceful escape.",
    location: "Tapovan",
    city: "Rishikesh",
    country: "India",
    price: 2800,
    rating: 4.8,
    reviews: 59,
    image:
      "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=80",
    images: [],
    category: "Cabin",
    guests: 3,
    bedrooms: 1,
    beds: 2,
    bathrooms: 1,
    amenities: [
      "WiFi",
      "Garden",
      "Mountain View",
      "Kitchen",
    ],
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected for seeding");

    await Property.deleteMany();

    await Property.insertMany(properties);

    console.log(`✅ ${properties.length} properties inserted`);

    await mongoose.connection.close();

    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error.message);
    process.exit(1);
  }
};

seedDatabase();