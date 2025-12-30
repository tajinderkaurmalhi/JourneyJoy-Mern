import React, { useEffect, useState } from 'react'
import axios from 'axios'
import TourCard from '../components/TourCard'
import { Link } from 'react-router-dom'

export default function Home(){
  const [tours, setTours] = useState([])

  useEffect(()=>{
    axios.get('http://localhost:5000/api/tours')
      .then(r => setTours(r.data.slice(0,6)))
      .catch(e => console.error(e))
  },[])

  return (
    <div className="container py-12">
      <section className="grid md:grid-cols-2 gap-8 items-center ">
  <div>
    <h1 className="text-4xl font-bold">Discover Your Next Adventure</h1>
    <p className="mt-4 text-gray-700">Custom holiday packages, best deals, and stress-free bookings.</p>
    <div className="mt-6">
      <Link to="/tours" className="bg-indigo-600 text-white px-5 py-2 rounded">Browse Tours</Link>
    </div>
  </div>
  <div>
    <img 
      src="https://www.fabcars.in/assets/images/blog/book-private-sightseeing-tours-in-mumbai-body.webp" 
      alt="hero" 
      className="rounded shadow-md object-cover w-full h-100 mt-20" 
    />
  </div>
</section>


      <section className="mt-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Popular Tours</h2>
          <Link to="/tours" className="text-indigo-600">See all</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tours.map(t => <TourCard key={t._id} tour={t} />)}
        </div>
      </section>
    </div>
  )
}
