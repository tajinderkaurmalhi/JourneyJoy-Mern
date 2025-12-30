import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Button } from "../components/ui/button"; // shadcn button

export default function About() {
  return (
    <div className="bg-gray-50 dark:bg-slate-900 min-h-screen flex flex-col text-gray-800 dark:text-gray-100">
      <Header />

      <main className="flex-grow container mx-auto px-6 py-20 ">
        {/* About Us Header */}
        <h1 className="text-center text-4xl md:text-5xl font-extrabold mb-4 py-6 tracking-wide">
          ABOUT US
        </h1>
        <div className="h-1 w-24 bg-indigo-600 mx-auto mb-12 rounded"></div>

        {/* About Us Content */}
        <div className="space-y-12">
          <div className="space-y-4">
            <p className="text-lg leading-relaxed">
              Welcome to JourneyJoy, where your travel dreams come to life. Our mission is to provide
              unforgettable travel experiences that don't break the bank. Every traveler should have the opportunity to explore
              the world, immerse themselves in new cultures, and create lasting memories.
            </p>
          
          </div>

          {/* Cards for Vision, Story, Services */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow hover:shadow-lg transition">
              <h2 className="text-xl font-bold mb-2 text-indigo-600">Our Vision</h2>
              <p className="text-gray-700 dark:text-gray-300">
                We envision a world where travel is accessible to everyone. Budget-friendly trips with freedom to personalize your journey.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow hover:shadow-lg transition">
              <h2 className="text-xl font-bold mb-2 text-indigo-600">Our Story</h2>
              <p className="text-gray-700 dark:text-gray-300">
                Founded by passionate travelers, JourneyJoy brings global travel experience to create unforgettable trips.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow hover:shadow-lg transition">
              <h2 className="text-xl font-bold mb-2 text-indigo-600">Our Services</h2>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                <li>Customized travel itineraries</li>
                <li>Budget-friendly accommodations</li>
                <li>Transportation arrangements</li>
                <li>Expert tips & recommendations</li>
                <li>24/7 support</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Images & Highlights Section */}
        <div className="mt-16 grid md:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-6">

            <img
              src="https://cdn.getyourguide.com/img/tour/65ae81fe49b4a6f5ebe13c12f175f351bb877debfc20e131ef1642e40ec85dac.jpg/99.jpg"
              alt="Travel Image 2"
              className="rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
            />
          </div>

          <div className="py-12">
            <h2 className="text-2xl md:text-3xl font-bold text-indigo-600 mb-4">
              JOURNEYJOY GIVES YOU THE POWER TO TRAVEL HOW YOU CHOOSE
            </h2>
            <div className="h-1 w-24 bg-indigo-600 mb-6 rounded"></div>
            <p className="mb-4 leading-relaxed">
              Amazing travel memories shouldn’t cost the earth. Budget trips with freedom to personalize your dream trip.
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 leading-relaxed">
              <li>🌟 Traveler choice 2022 trip advisor Indian</li>
              <li>🌟 Maldives Tourism Awards 2022</li>
              <li>🌟 Indigo special recognition award 2022-2023</li>
              <li>🌟 Cordelia Cruise runner-up award for South India 2022-2023</li>
            </ul>
           
          </div>
        </div>
      </main>

     
    </div>
  );
}
