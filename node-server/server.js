const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const apiRoutes = require("./routes/api");

const app = express();

const allowedOrigins = ["http://localhost:5173", "https://restfox.dev"];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin like mobile apps or curl
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.error("MongoDB error:", err));

app.get("/", (req, res) => {
  res.status(200).send("Welcome to Node server");
});

// ✅ Only prefix once here
app.use("/api", apiRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
