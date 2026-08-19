import Image from "./models/imageModel.js";

const defaultImages = [
  // Darawaja (Doors)
  { title: "Teak Wood Main Door", category: "Darawaja", imageUrl: "images/door.jpg" },
  { title: "Classic Carved Wooden Door", category: "Darawaja", imageUrl: "images/door2.jpg" },
  { title: "Modern Interior Wooden Door", category: "Darawaja", imageUrl: "images/door3.jpg" },
  { title: "Traditional Temple Style Door", category: "Darawaja", imageUrl: "images/door4.jpg" },
  { title: "Designer Double Door", category: "Darawaja", imageUrl: "images/door5.jpg" },
  { title: "Royal Entrance Main Door", category: "Darawaja", imageUrl: "images/maindoor.jpg" },
  { title: "Luxury Carved Main Door", category: "Darawaja", imageUrl: "images/maindoor(1).jpg" },

  // Divaan
  { title: "Wooden Living Room Divaan", category: "Divaan", imageUrl: "images/sofa1.jpg" },
  { title: "Royal Carved Divaan Sofa", category: "Divaan", imageUrl: "images/sofa2.jpg" },
  { title: "Modern Cushion Divaan", category: "Divaan", imageUrl: "images/sofa3.jpg" },

  // Chair
  { title: "Traditional Wooden Armchair", category: "Chair", imageUrl: "images/chair.jpg" },

  // Devara
  { title: "Handcrafted Wooden Devara", category: "Devara", imageUrl: "images/devaara.jpg" },
  { title: "Grand Pooja Devara Mandir", category: "Devara", imageUrl: "images/devaara2.jpg" },

  // Cradle / Other
  { title: "Carved Wooden Baby Cradle", category: "Other", imageUrl: "images/Cradle.jpg" },
  { title: "Traditional Wooden Cradle", category: "Other", imageUrl: "images/cradle2.jpg" },
  { title: "Royal Wooden Baby Swing Cradle", category: "Other", imageUrl: "images/cradle3.jpg" },
];

export const seedDefaultImages = async () => {
  try {
    const count = await Image.countDocuments();
    if (count === 0) {
      console.log("Seeding default product images into MongoDB Atlas...");
      await Image.insertMany(defaultImages);
      console.log("Default product images seeded successfully!");
    }
  } catch (error) {
    console.error("Error seeding default images:", error.message);
  }
};
