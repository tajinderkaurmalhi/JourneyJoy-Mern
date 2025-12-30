import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Tours from "./pages/Tours";
import TourDetail from "./pages/TourDetail";
import BookingForm from "./pages/BookingForm";
import BookingSuccess from "./pages/BookingSuccess";
import Contact from "./pages/Contact";
import MyBookings from "./pages/MyBookings";
import About from "./pages/About";

// Admin
import AdminLayout from "./pages/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import UsersList from "./pages/admin/UsersList";
import ToursList from "./pages/admin/ToursList";
import BookingsList from "./pages/admin/BookingsList";
import ContactList from "./pages/admin/ContactList";

function App() {
  return (
    <Routes>

      {/* ADMIN ROUTES (NO HEADER/FOOTER) */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="users" element={<UsersList />} />
        <Route path="tours" element={<ToursList />} />
        <Route path="bookings" element={<BookingsList />} />
        <Route path="contacts" element={<ContactList />} />
      </Route>

      {/* PUBLIC ROUTES */}
      <Route
        path="*"
        element={
          <div className="bg-white dark:bg-slate-900 min-h-screen">
            <Header />

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tours" element={<Tours />} />
              <Route path="/tours/:id" element={<TourDetail />} />
              <Route path="/booking" element={<BookingForm />} />
              <Route path="/booking-success" element={<BookingSuccess />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="/my-bookings" element={<MyBookings />} />
            </Routes>

            <Footer />
          </div>
        }
      />
    </Routes>
  );
}

export default App;
