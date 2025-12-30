import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button"; // correct path
// Remove local dark mode logic here if App level ch already handle ho rahi

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-slate-900 shadow-md border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between gap-8">
        {/* Left Section */}
        <div className="flex flex-col gap-4">
          <Link to="/" className="text-2xl font-bold text-indigo-600 dark:text-white">
            JourneyJoy
          </Link>
          <p className="max-w-xs text-sm">
            Book your next adventure with us today and discover a new way.
          </p>
           <div className="mt-6">
                <Link to="/tours" className="bg-indigo-600 text-white px-5 py-2 rounded">Contact Us</Link>
              </div>
          <p className="text-xs mt-4">© {new Date().getFullYear()} JourneyJoy. All rights reserved.</p>
        </div>

        {/* Right Section */}
        <div className="flex flex-col gap-4 text-sm">
          <h4 className="font-semibold">Contact Info</h4>
          <ul className="flex flex-col gap-2">
            <li className="flex items-center gap-2">
              <i className="fa-solid fa-mobile"></i> +91-987654321
            </li>
            <li className="flex items-center gap-2">
              <i className="fa fa-address-card" aria-hidden="true"></i> Sector 34, Chandigarh
            </li>
            <li className="flex items-center gap-2">
              <i className="fa-solid fa-clock"></i> Mon-Sat (8:00-18:00)
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
