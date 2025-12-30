require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

/* ROUTES */
const toursRoute = require("./routes/tours");
const bookingsRouter = require("./routes/bookings");
const contactRoutes = require("./routes/contactRoutes");
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");

const app = express();

/* MIDDLEWARE */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* STATIC FOLDER (Images) */
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

/* API ROUTES */
app.use("/api/auth", authRoutes);
app.use("/api/tours", toursRoute);
app.use("/api/bookings", bookingsRouter);
app.use("/api/contact", contactRoutes);
app.use("/api/admin", adminRoutes);

/* ROOT TEST */
app.get("/", (req, res) => {
  res.send("🚀 JourneyJoy Backend Running");
});

/* PORT */
const PORT = process.env.PORT || 5000;

/* DB CONNECT & SERVER START */
connectDB(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ DB connection failed", err);
  });
