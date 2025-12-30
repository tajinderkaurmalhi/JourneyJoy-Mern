import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "./api";
import { useOutletContext } from "react-router-dom";

export default function Dashboard() {
  const [stats, setStats] = useState({});
  const { refreshTrigger } = useOutletContext();

  useEffect(() => {
    axios.get(`${API}/dashboard`)
      .then(res => setStats(res.data))
      .catch(err => console.log(err));
  }, [refreshTrigger]); // Refetch whenever refreshTrigger changes

  const cards = [
    { label: "Users", value: stats.users, color: "indigo" },
    { label: "Tours", value: stats.tours, color: "green" },
    { label: "Bookings", value: stats.bookings, color: "yellow" },
    { label: "Contacts", value: stats.contacts, color: "red" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((c, i) => (
        <Card key={i} className={`border-t-4 border-${c.color}-500`}>
          <CardContent className="text-center p-6">
            <p className="text-gray-500">{c.label}</p>
            <h2 className={`text-3xl font-bold text-${c.color}-600`}>{c.value || 0}</h2>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
