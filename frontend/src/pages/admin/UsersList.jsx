import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "./api";
import { Table, TableHeader, TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({ username: "", email: "" });

  const fetchUsers = () => {
    axios.get(`${API}/users`)
      .then(res => setUsers(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => fetchUsers(), []);

  const deleteUser = (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    axios.delete(`${API}/users/${id}`)
      .then(() => fetchUsers())
      .catch(err => console.log(err));
  };

  const openModal = (user) => {
    setSelectedUser(user);
    setFormData({ username: user.username, email: user.email });
    setIsModalOpen(true);
  };

  const confirmUpdate = () => {
    axios.patch(`${API}/users/${selectedUser._id}`, formData)
      .then((res) => {
        setUsers(users.map(u => u._id === selectedUser._id ? res.data : u));
        setIsModalOpen(false);
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Users</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHeader>
        <tbody>
          {users.map(u => (
            <TableRow key={u._id}>
              <TableCell>{u.username}</TableCell>
              <TableCell>{u.email}</TableCell>
              <TableCell className="flex gap-2">
                <Button size="sm" onClick={() => openModal(u)}>Edit</Button>
                <Button size="sm" variant="destructive" onClick={() => deleteUser(u._id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>
          <div className="mt-4 flex flex-col gap-3">
            <input
              type="text"
              placeholder="Username"
              value={formData.username}
              onChange={e => setFormData({ ...formData, username: e.target.value })}
              className="w-full border px-3 py-2 rounded"
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              className="w-full border px-3 py-2 rounded"
            />
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

export default UsersList;
