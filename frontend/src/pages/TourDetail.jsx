import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function TourDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [tour, setTour] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    persons: 1,
  });

  /* GET TOUR */
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/tours/${id}`)
      .then((res) => setTour(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* BOOKING SUBMIT */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔒 LOGIN CHECK
    const user = localStorage.getItem("user");
    if (!user) {
      alert("Please login first to book this tour");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/bookings", {
        ...form,
        tourId: id,
        userId: JSON.parse(user).id, // 👈 USER LINKED
      });

      navigate("/booking-success");

      setForm({
        name: "",
        email: "",
        phone: "",
        date: "",
        persons: 1,
      });
    } catch (err) {
      alert("❌ Booking failed");
    }
  };

  if (!tour) return <p className="text-center py-10 mt-28">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-10 mt-20">
      
      {/* LEFT */}
      <div>
        <img
          src={`http://localhost:5000/${tour.image}`}
          alt={tour.tour_name}
          className="w-full h-72 object-cover rounded-xl mb-5"
        />
        <h2 className="text-3xl font-bold mb-2">{tour.tour_name}</h2>
        <p className="text-gray-500 mb-2">{tour.duration}</p>
        <p className="text-indigo-600 text-xl font-bold mb-4">
          ₹{tour.discount}
          {tour.original_price && (
            <span className="text-gray-400 line-through ml-2 text-sm">
              ₹{tour.original_price}
            </span>
          )}
        </p>
        <p className="text-gray-600">
          {tour.description || "Enjoy an amazing journey with us."}
        </p>
      </div>

      {/* RIGHT */}
      <div className="bg-white shadow-lg rounded-xl p-6">
        <h3 className="text-2xl font-semibold mb-5">Book This Tour</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-2"
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-2"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-2"
          />
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-2"
          />
          <input
            type="number"
            name="persons"
            min="1"
            value={form.persons}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700"
          >
            Book Now
          </button>
        </form>
      </div>
    </div>
  );
}

export default TourDetails;
