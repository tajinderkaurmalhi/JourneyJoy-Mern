import React from 'react';
import { Link } from 'react-router-dom';

export default function TourCard({ tour }) {
  return (
    <div className="bg-white rounded shadow-sm overflow-hidden">
      <img
        src={`http://localhost:5000/${tour.image}`}  // backend uploads folder
        alt={tour.tour_name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{tour.tour_name}</h3>
        <p className="text-sm text-gray-600 mt-1">{tour.duration}</p>
        <div className="mt-3 flex items-center justify-between">
          <div className="text-indigo-600 font-semibold">₹{tour.discount}</div>
          <Link
            to={`/tours/${tour._id}`}
            className="text-sm text-white bg-indigo-600 px-3 py-1 rounded"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
}
