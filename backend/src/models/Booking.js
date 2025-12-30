const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tourId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tour",
      required: true,
    },
    name: String,
    email: String,
    phone: String,
    date: String,
    persons: Number,
    status: {
      type: String,
      enum: ["booked", "cancelled"],
      default: "booked", // by default booked
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
