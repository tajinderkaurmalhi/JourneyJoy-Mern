import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "./api";
import { Table, TableHeader, TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useOutletContext } from "react-router-dom";

const BookingsList = () => {
  const [bookings, setBookings] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const { refreshDashboard } = useOutletContext();

  const fetchBookings = () => {
    axios.get(`${API}/bookings`)
      .then(res => setBookings(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => fetchBookings(), []);

  const deleteBooking = id => {
    if (!window.confirm("Are you sure?")) return;
    axios.delete(`${API}/bookings/${id}`)
      .then(() => { fetchBookings(); refreshDashboard(); })
      .catch(err => console.log(err));
  };

  const openModal = booking => {
    setSelectedBooking(booking);
    setNewStatus(booking.status);
    setIsModalOpen(true);
  };

  const confirmStatusUpdate = () => {
    axios.patch(`${API}/bookings/${selectedBooking._id}`, { status: newStatus })
      .then(res => {
        setBookings(bookings.map(b => b._id === selectedBooking._id ? res.data : b));
        setIsModalOpen(false);
        refreshDashboard();
      })
      .catch(err => console.log(err));
  };

  const getStatusBadge = status => {
    const colors = {
      completed: "bg-green-200 text-green-800",
      pending: "bg-yellow-200 text-yellow-800",
      "in-progress": "bg-blue-200 text-blue-800",
      confirmed: "bg-indigo-200 text-indigo-800"
    };
    return colors[status] || "bg-gray-200 text-gray-800";
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Bookings</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>User</TableCell>
            <TableCell>Tour</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHeader>
        <tbody>
          {bookings.map(b => (
            <TableRow key={b._id}>
              <TableCell>{b.userId?.username}</TableCell>
              <TableCell>{b.tourId?.tour_name}</TableCell>
              <TableCell>
                <span className={`inline-block px-2 py-1 text-sm rounded ${getStatusBadge(b.status)}`}>
                  {b.status}
                </span>
              </TableCell>
              <TableCell className="flex gap-2">
                <Button size="sm" onClick={() => openModal(b)}>Edit Status</Button>
                <Button size="sm" variant="destructive" onClick={() => deleteBooking(b._id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Edit Booking Status</DialogTitle>
          </DialogHeader>
          <select className="w-full border px-3 py-2 rounded mt-4" value={newStatus} onChange={e => setNewStatus(e.target.value)}>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="confirmed">Confirmed</option>
          </select>
          <DialogFooter className="mt-4 flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button onClick={confirmStatusUpdate}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BookingsList;
