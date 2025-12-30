import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "./api";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useOutletContext } from "react-router-dom";

const ContactsList = () => {
  const [contacts, setContacts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const { refreshDashboard } = useOutletContext();

  const fetchContacts = () => {
    axios.get(`${API}/contacts`)
      .then(res => setContacts(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => fetchContacts(), []);

  const deleteContact = id => {
    if (!window.confirm("Are you sure you want to delete this contact?")) return;
    axios.delete(`${API}/contacts/${id}`)
      .then(() => { fetchContacts(); refreshDashboard(); })
      .catch(err => console.log(err));
  };

  const openModal = contact => {
    setSelectedContact(contact);
    setFormData({ name: contact.name, email: contact.email, message: contact.message });
    setIsModalOpen(true);
  };

  const confirmUpdate = () => {
    axios.patch(`${API}/contacts/${selectedContact._id}`, formData)
      .then(res => {
        setContacts(contacts.map(c => c._id === selectedContact._id ? res.data : c));
        setIsModalOpen(false);
        refreshDashboard();
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Contacts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {contacts.map(c => (
          <Card key={c._id}>
            <CardContent>
              <p className="font-semibold">{c.name} – <span className="text-gray-500">{c.email}</span></p>
              <p className="mt-2 text-gray-700">{c.message}</p>
              <div className="mt-4 flex gap-2">
                <Button size="sm" onClick={() => openModal(c)}>Edit</Button>
                <Button size="sm" variant="destructive" onClick={() => deleteContact(c._id)}>Delete</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Edit Contact</DialogTitle>
          </DialogHeader>
          <div className="mt-4 flex flex-col gap-3">
            <input type="text" placeholder="Name" value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              className="w-full border px-3 py-2 rounded" />
            <input type="email" placeholder="Email" value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              className="w-full border px-3 py-2 rounded" />
            <textarea placeholder="Message" value={formData.message}
              onChange={e => setFormData({ ...formData, message: e.target.value })}
              className="w-full border px-3 py-2 rounded" rows={4} />
          </div>
          <DialogFooter className="mt-4 flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button onClick={confirmUpdate}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContactsList;
