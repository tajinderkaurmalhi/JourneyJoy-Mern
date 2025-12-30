const Tour = require("../models/Tour");

// ➤ GET all tours
exports.getTours = async (req, res) => {
  try {
    const tours = await Tour.find();
    res.json(tours);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

// ➤ CREATE a new tour
exports.createTour = async (req, res) => {
  try {
    const images = req.files ? req.files.map(f => f.filename) : [];

    const tour = new Tour({
      ...req.body,
      images,
    });

    await tour.save();
    res.json({ message: "Tour created successfully", tour });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};
