import { useState } from "react";
import axios from "axios";
import { API } from "./api";
import { Button } from "@/components/ui/button";

const ToursAdd = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    tour_name: "",
    duration: "",
    price: "",
    discount: 0,
    image: null
  });

  const handleSubmit = e => {
    e.preventDefault();

    const data = new FormData();
    data.append("tour_name", formData.tour_name);
    data.append("duration", formData.duration);
    data.append("original_price", formData.price);
    data.append("discount", formData.discount);
    if (formData.image) data.append("image", formData.image);

    axios.post(`${API}/tours`, data, {
      headers: { "Content-Type": "multipart/form-data" }
    })
    .then(res => {
      alert("Tour added successfully!");
      setFormData({ tour_name: "", duration: "", price: "", discount: 0, image: null });
      if (onAdd) onAdd(); // refresh ToursList
    })
    .catch(err => console.log(err));
  };

  return (
    <div className="max-w-md p-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Add New Tour</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Tour Name"
          value={formData.tour_name}
          onChange={e => setFormData({ ...formData, tour_name: e.target.value })}
          className="border px-3 py-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Duration"
          value={formData.duration}
          onChange={e => setFormData({ ...formData, duration: e.target.value })}
          className="border px-3 py-2 rounded"
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={e => setFormData({ ...formData, price: e.target.value })}
          className="border px-3 py-2 rounded"
          required
        />
        <input
          type="number"
          placeholder="Discount"
          value={formData.discount}
          onChange={e => setFormData({ ...formData, discount: e.target.value })}
          className="border px-3 py-2 rounded"
        />
        <input
          type="file"
          accept="image/*"
          onChange={e => setFormData({ ...formData, image: e.target.files[0] })}
          className="border px-3 py-2 rounded"
        />
        <Button type="submit">Add Tour</Button>
      </form>
    </div>
  );
};

export default ToursAdd;
