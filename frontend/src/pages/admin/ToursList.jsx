import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "./api";
import { Table, TableHeader, TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useOutletContext } from "react-router-dom";
import ToursAdd from "./ToursAdd";

const ToursList = () => {
  const [tours, setTours] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTour, setSelectedTour] = useState(null);
  const [formData, setFormData] = useState({ tour_name: "", duration: "", price: "", discount: "", image: null });
  const [isAddOpen, setIsAddOpen] = useState(false); // Add Tour Modal
  const { refreshDashboard } = useOutletContext();

  const fetchTours = () => {
    axios.get(`${API}/tours`)
      .then(res => setTours(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => fetchTours(), []);

  const deleteTour = id => {
    if (!window.confirm("Are you sure you want to delete this tour?")) return;
    axios.delete(`${API}/tours/${id}`)
      .then(() => { fetchTours(); refreshDashboard(); })
      .catch(err => console.log(err));
  };

  const openModal = tour => {
    setSelectedTour(tour);
    setFormData({
      tour_name: tour.tour_name,
      duration: tour.duration,
      price: tour.original_price,
      discount: tour.discount,
      image: null
    });
    setIsModalOpen(true);
  };

  const confirmUpdate = () => {
    const data = new FormData();
    data.append("tour_name", formData.tour_name);
    data.append("duration", formData.duration);
    data.append("original_price", formData.price);
    data.append("discount", formData.discount);
    if (formData.image) data.append("image", formData.image);

    axios.patch(`${API}/tours/${selectedTour._id}`, data, {
      headers: { "Content-Type": "multipart/form-data" }
    })
      .then(res => {
        setTours(tours.map(t => t._id === selectedTour._id ? res.data : t));
        setIsModalOpen(false);
        refreshDashboard();
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Tours</h2>
        <Button onClick={() => setIsAddOpen(true)}>Add Tour</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>Tour Name</TableCell>
            <TableCell>Duration</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Discount</TableCell>

            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHeader>
        <tbody>
          {tours.map(t => (
            <TableRow key={t._id}>
              <TableCell>{t.tour_name}</TableCell>
              <TableCell>{t.duration}</TableCell>
              <TableCell>₹{t.original_price}</TableCell>
              <TableCell>₹{t.discount}</TableCell>

              <TableCell className="flex gap-2">
                <Button size="sm" onClick={() => openModal(t)}>Edit</Button>
                <Button size="sm" variant="destructive" onClick={() => deleteTour(t._id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>

      {/* Edit Tour Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Tour</DialogTitle>
          </DialogHeader>
          <div className="mt-4 flex flex-col gap-3">
            <input
              type="text"
              placeholder="Tour Name"
              value={formData.tour_name}
              onChange={e => setFormData({ ...formData, tour_name: e.target.value })}
              className="border px-3 py-2 rounded"
            />
            <input
              type="text"
              placeholder="Duration"
              value={formData.duration}
              onChange={e => setFormData({ ...formData, duration: e.target.value })}
              className="border px-3 py-2 rounded"
            />
            <input
              type="number"
              placeholder="Price"
              value={formData.price}
              onChange={e => setFormData({ ...formData, price: e.target.value })}
              className="border px-3 py-2 rounded"
            />
            <input
              type="number"
              placeholder="Discount"
              value={formData.discount}
              onChange={e => setFormData({ ...formData, discount: e.target.value })}
              className="border px-3 py-2 rounded"
            />

          </div>
          <DialogFooter className="mt-4 flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button onClick={confirmUpdate}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Tour Modal */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className="max-w-md">
          <ToursAdd onAdd={() => { fetchTours(); refreshDashboard(); setIsAddOpen(false); }} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ToursList;
