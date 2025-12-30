import React from "react";
import { useNavigate } from "react-router-dom";

export default function BookingSuccess() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md text-center">
<img
  src="https://cdn-icons-png.flaticon.com/512/845/845646.png" // ✅ online green tick
  alt="Success"
  className="w-20 h-20 mx-auto mb-4"
/>
        <h2 className="text-2xl font-bold mb-2">Booking Successful!</h2>
        <p className="mb-4">We will contact you within 24 hours.</p>
        <button onClick={() => navigate("/")} className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Back to Home
        </button>
      </div>
    </div>
  );
}
