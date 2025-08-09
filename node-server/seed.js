const mongoose = require("mongoose");
const Flat = require("./models/Flat");

require("dotenv").config(); // This loads .env variables

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://aakash1z:okay@cluster0.brtfjn0.mongodb.net/hms",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    );
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
};

function generateSlots(capacity) {
  return Array.from({ length: capacity }, (_, i) => ({
    slot_no: i + 1,
    student: null,
  }));
}

function generateRoom(room_no, capacity) {
  return {
    room_no,
    room_capacity: capacity,
    slots: generateSlots(capacity),
  };
}

function generateFlat(flat_no) {
  if (["SQ102", "SQ202", "SQ302", "SQ402"].includes(flat_no)) {
    return {
      flat_no,
      rooms: [
        generateRoom("R1", 4),
        generateRoom("L1", 4),
        generateRoom("L2", 4),
        generateRoom("H", 6),
      ],
    };
  }

  return {
    flat_no,
    rooms: [generateRoom("R1", 4), generateRoom("L1", 2), generateRoom("H", 6)],
  };
}

async function seedFlats() {
  await connectDB();

  const flats = [];
  for (let block = 1; block <= 4; block++) {
    for (let flat = 1; flat <= 4; flat++) {
      const flat_no = `SQ${block}${flat.toString().padStart(2, "0")}`;
      flats.push(generateFlat(flat_no));
    }
  }

  await Flat.deleteMany({});
  await Flat.insertMany(flats);
  console.log("Flats seeded!");
  mongoose.disconnect();
}

seedFlats();
