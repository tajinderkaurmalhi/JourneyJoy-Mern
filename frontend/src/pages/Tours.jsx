import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Tours() {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/tours")
      .then((res) => setTours(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">

      {/* Heading */}
      <div className="flex items-center justify-between mb-6 mt-12">
        <h2 className="text-2xl font-semibold text-slate-800">
          All Tours
        </h2>
        <Link to="/" className="text-indigo-600 font-medium hover:underline">
          Back to Home
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {tours.map((tour) => (
          <div
            key={tour._id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition flex flex-col overflow-hidden"
          >
            <img
              src={`http://localhost:5000/${tour.image}`}
              alt={tour.tour_name}
              className="h-44 w-full object-cover"
            />

            <div className="p-4 flex flex-col flex-grow">
              <h3 className="font-semibold text-lg mb-1">
                {tour.tour_name}
              </h3>

              <p className="text-sm text-gray-500 mb-3">
                {tour.duration}
              </p>

              <div className="mb-4">
                <span className="text-indigo-600 font-bold text-lg">
                  ₹{tour.discount}
                </span>
                {tour.original_price && (
                  <span className="text-sm text-gray-400 line-through ml-2">
                    ₹{tour.original_price}
                  </span>
                )}
              </div>

              <Link
                to={`/tours/${tour._id}`}
                className="mt-auto text-center bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
              >
                View
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tours;
