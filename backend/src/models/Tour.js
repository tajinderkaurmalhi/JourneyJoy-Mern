const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema({
  tour_name: { type: String, required: true },
  duration: { type: String, required: true },
  original_price: { type: Number, required: true },
  discount: { type: Number, required: true },
  image: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Tour", tourSchema);
