import React, { useEffect, useState } from "react";
import axios from "axios";

function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return;

    const user = JSON.parse(storedUser);

    axios
      .get(`http://localhost:5000/api/bookings/user/${user.id}`)
      .then((res) => setBookings(res.data))
      .catch((err) => console.log(err));
  }, []);

  const cancelBooking = (id) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      axios
        .put(`http://localhost:5000/api/bookings/cancel/${id}`)
        .then((res) => {
          alert(res.data.message);
          // Update local state immediately
          setBookings(
            bookings.map((b) =>
              b._id === id ? { ...b, status: "cancelled" } : b
            )
          );
        })
        .catch((err) => console.log(err));
    }
  };

  // Function to format booked date/time
  const formatBookedDate = (isoString) => {
    return new Date(isoString).toLocaleString("en-IN", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="max-w-5xl mx-auto mt-24 px-4 pb-20">
      <h2 className="text-3xl font-bold mb-6">My Bookings</h2>

      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <div className="grid gap-6">
          {bookings.map((b) => (
            <div
              key={b._id}
              className="border rounded-xl p-5  shadow bg-white"
            >
              <h3 className="text-xl font-semibold">{b.tourId?.tour_name}</h3>
             
              <p>Persons: {b.persons}</p>
              <p>Phone: {b.phone}</p>
              <p>
                Status:{" "}
                <span
                  className={
                    b.status === "cancelled"
                      ? "text-red-500 font-semibold"
                      : "text-green-600 font-semibold"
                  }
                >
                  {b.status}
                </span>
              </p>
              <p className="text-sm text-gray-500">
                Booked on: {formatBookedDate(b.createdAt)}
              </p>
              {b.status === "booked" && (
                <button
                  onClick={() => cancelBooking(b._id)}
                  className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Cancel Booking
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyBookings;
