import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Moon, Sun, Menu, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "./ui/dialog";
import { Button } from "./ui/button";

export default function Header() {
  const [dark, setDark] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // signup
  const [signupUser, setSignupUser] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPass, setSignupPass] = useState("");

  const navigate = useNavigate();

  /* THEME + USER CHECK */
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      setDark(true);
      document.documentElement.classList.add("dark");
    }

    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setLoggedIn(true);
      setUser(storedUser);
    }
  }, []);

  const toggleTheme = () => {
    setDark(!dark);
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", !dark ? "dark" : "light");
  };

  /* LOGIN */
  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("user", JSON.stringify(res.data.user));
      setLoggedIn(true);
      setUser(res.data.user); // ⭐ UPDATE STATE
      setShowLogin(false);
      navigate("/");

    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    }
  };

  /* SIGNUP */
  const handleSignup = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/signup", {
        username: signupUser,
        email: signupEmail,
        password: signupPass,
      });

      alert("Signup successful! Please login now.");
      setShowSignup(false);
      setShowLogin(true);

    } catch (err) {
      alert(err.response?.data?.msg || "Signup failed");
    }
  };

  /* LOGOUT */
  const handleLogout = () => {
    localStorage.removeItem("user");
    setLoggedIn(false);
    setUser(null);
    navigate("/");
  };

  return (
    <>
      <header className="bg-white dark:bg-slate-900 shadow-md fixed top-0 w-full z-50">
        <nav className="max-w-7xl mx-auto py-4 flex justify-between items-center px-4">
          <Link to="/" className="text-2xl font-bold text-indigo-600 dark:text-white">
            JourneyJoy
          </Link>

          <ul className="hidden md:flex gap-10">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/tours">Tours</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>

            {user?.role === "admin" && (
              <li>
                <Link to="/admin" className="text-red-600 font-semibold">Admin Panel</Link>
              </li>
            )}
          </ul>

          <div className="flex gap-4 items-center">

            

            <button
              onClick={() => loggedIn ? navigate("/my-bookings") : setShowLogin(true)}
              className="bg-indigo-600 text-white px-4 py-1 rounded"
            >
              Bookings
            </button>

            {loggedIn ? (
              <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-1 rounded">
                Logout
              </button>
            ) : (
              <button onClick={() => setShowLogin(true)} className="bg-indigo-600 text-white px-4 py-1 rounded">
                Login
              </button>
            )}

            <button onClick={() => setOpenMenu(!openMenu)} className="md:hidden">
              {openMenu ? <X /> : <Menu />}
            </button>
          </div>
        </nav>
      </header>

      {/* 🔑 LOGIN MODAL */}
      <Dialog open={showLogin} onOpenChange={setShowLogin}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Login</DialogTitle>
            <DialogDescription>Enter your credentials to continue.</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <input className="border p-2 rounded" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input className="border p-2 rounded" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          <DialogFooter>
            <Button onClick={handleLogin} className="w-full bg-indigo-600">Login</Button>
          </DialogFooter>

          <p className="text-sm text-center pt-3">
            Don't have an account?{" "}
            <span className="text-indigo-600 cursor-pointer" onClick={() => { setShowLogin(false); setShowSignup(true); }}>Signup</span>
          </p>
        </DialogContent>
      </Dialog>

      {/* 🆕 SIGNUP MODAL */}
      <Dialog open={showSignup} onOpenChange={setShowSignup}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Create Account</DialogTitle>
            <DialogDescription>Fill details to register.</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <input className="border p-2 rounded" placeholder="Username" value={signupUser} onChange={(e) => setSignupUser(e.target.value)} />
            <input className="border p-2 rounded" placeholder="Email" value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} />
            <input className="border p-2 rounded" type="password" placeholder="Password" value={signupPass} onChange={(e) => setSignupPass(e.target.value)} />
          </div>

          <DialogFooter>
            <Button onClick={handleSignup} className="w-full bg-indigo-600">Signup</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
