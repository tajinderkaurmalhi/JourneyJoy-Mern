import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function BookingForm({ tour, openLogin }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    persons: 1,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = localStorage.getItem("user");
    if (!user) {
      openLogin(); // LOGIN POPUP OPEN
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/bookings", {
        ...form,
        tourId: tour._id,
        userId: JSON.parse(user).id,
      });

      navigate("/booking-success");
    } catch (err) {
      alert("Booking failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
      <input name="name" placeholder="Name" onChange={handleChange} className="border p-2 w-full mb-2" />
      <input name="email" placeholder="Email" onChange={handleChange} className="border p-2 w-full mb-2" />
      <input name="phone" placeholder="Phone" onChange={handleChange} className="border p-2 w-full mb-2" />
      <input type="date" name="date" onChange={handleChange} className="border p-2 w-full mb-2" />
      <input type="number" name="persons" min={1} onChange={handleChange} className="border p-2 w-full mb-2" />
      <button className="bg-blue-600 text-white p-2 w-full rounded">
        Book Now
      </button>
    </form>
  );
}
