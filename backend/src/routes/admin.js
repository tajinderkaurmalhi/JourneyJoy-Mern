const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Tour = require("../models/Tour");
const Booking = require("../models/Booking");
const Contact = require("../models/Contact");

const upload = require("../middleware/upload"); 

/* DASHBOARD COUNTS */
router.get("/dashboard", async (req, res) => {
  try {
    const users = await User.countDocuments();
    const tours = await Tour.countDocuments();
    const bookings = await Booking.countDocuments();
    const contacts = await Contact.countDocuments();

    res.json({ users, tours, bookings, contacts });
  } catch (err) {
    res.status(500).json({ message: "Dashboard error" });
  }
});

/* USERS */
router.get("/users", async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
});

/* TOURS */
router.get("/tours", async (req, res) => {
  const tours = await Tour.find();
  res.json(tours);
});

/* BOOKINGS */
router.get("/bookings", async (req, res) => {
  const bookings = await Booking.find()
    .populate("userId", "username email")
    .populate("tourId", "tour_name");
  res.json(bookings);
});

/* CONTACTS */
router.get("/contacts", async (req, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 });
  res.json(contacts);
});


// Example: backend/src/routes/admin.js

// Update booking
router.patch("/bookings/:id", async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: "Failed to update booking" });
  }
});

// Update user
router.patch("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Failed to update user" });
  }
});

// Update tour
router.patch("/tours/:id", upload.single("image"), async (req, res) => {
  try {
    const { tour_name, duration, original_price, discount } = req.body;
    const tour = await Tour.findById(req.params.id);
    if (!tour) return res.status(404).json({ message: "Tour not found" });

    tour.tour_name = tour_name ?? tour.tour_name;
    tour.duration = duration ?? tour.duration;
    tour.original_price = original_price ?? tour.original_price;
    tour.discount = discount ?? tour.discount;
    if (req.file) tour.image = req.file.path;

    const updatedTour = await tour.save();
    res.json(updatedTour);
  } catch (err) {
    res.status(500).json({ message: "Error updating tour" });
  }
});


// Update contact
router.patch("/contacts/:id", async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(contact);
  } catch (err) {
    res.status(500).json({ message: "Failed to update contact" });
  }
});


// ADD TOUR
router.post("/tours", upload.single("image"), async (req, res) => {
  try {
    const { tour_name, duration, original_price, discount } = req.body;
    const image = req.file ? req.file.path : undefined;

    if (!tour_name || !duration || !original_price) {
      return res.status(400).json({ message: "Tour name, duration and price are required" });
    }

    const newTour = new Tour({ tour_name, duration, original_price, discount, image });
    const savedTour = await newTour.save();
    res.status(201).json(savedTour);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error adding tour" });
  }
});

//dlt tours
router.delete("/tours/:id", async (req, res) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);
    if (!tour) return res.status(404).json({ message: "Tour not found" });
    res.json({ message: "Tour deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting tour" });
  }
});



module.exports = router;
