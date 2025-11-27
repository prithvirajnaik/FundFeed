/**
 * FINAL NAVBAR:
 * - Desktop → full nav menu
 * - Mobile → only logo + logout (bottom nav handles navigation)
 */

import { Link } from "react-router-dom";
import {
  Home,
  Upload as UploadIcon,
  LayoutDashboard,
  Inbox,
  User,
  LogOut
} from "lucide-react";

import useAuth from "../hooks/useAuth";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav
      className="
        sticky top-0 z-50
        bg-white/70 backdrop-blur-lg
        px-6 py-3
        flex justify-between items-center
        border-b border-gray-200
      "
    >
      {/* LEFT — Logo */}
      <Link to="/" className="text-2xl font-bold text-orange-500">
        FundFeed
      </Link>

      {/* DESKTOP NAV (md and above) */}
      <div className="hidden md:flex items-center gap-6 text-[#0f0f0f]">

        {!user && (
          <>
            <Link to="/login" className="hover:text-orange-500 transition">Login</Link>
            <Link to="/register" className="hover:text-orange-500 transition">Register</Link>
          </>
        )}

        {user?.role === "developer" && (
          <>
            <Link to="/feed" className="flex items-center gap-1 hover:text-orange-500 transition">
              <Home size={18} /> Feed
            </Link>

            <Link to="/upload" className="flex items-center gap-1 hover:text-orange-500 transition">
              <UploadIcon size={18} /> Upload
            </Link>

            <Link to="/dashboard" className="flex items-center gap-1 hover:text-orange-500 transition">
              <LayoutDashboard size={18} /> Dashboard
            </Link>

            <Link to="/requests" className="flex items-center gap-1 hover:text-orange-500 transition">
              <Inbox size={18} /> Requests
            </Link>

            <Link to={`/developer/${user.id}`} className="flex items-center gap-1 hover:text-orange-500 transition">
              <User size={18} /> Profile
            </Link>
          </>
        )}


        {user?.role === "investor" && (
          <>
            <Link to="/feed" className="hover:text-orange-500 transition">Feed</Link>
            <Link to="/saved" className="hover:text-orange-500 transition">Saved</Link>
            <Link to={`/investor/${user.id}`} className="hover:text-orange-500 transition">Profile</Link>
          </>
        )}

        {/* DESKTOP LOGOUT */}
        {user && (
          <button
            onClick={logout}
            className="bg-orange-500 text-white px-4 py-1.5 rounded-lg hover:bg-orange-600 transition"
          >
            Logout
          </button>
        )}
      </div>

      {/* MOBILE LOGOUT ICON */}
    <div className="md:hidden flex gap-4 items-center">

      {/* If NOT logged in → show login + register icons/text */}
      {!user && (
        <>
          <Link to="/login" className="text-gray-800 text-sm font-medium">
            Login
          </Link>
          <Link to="/register" className="text-gray-800 text-sm font-medium">
            Register
          </Link>
        </>
      )}

      {/* If logged in → show logout icon */}
      {user && (
        <button onClick={logout} className="text-gray-800">
          <LogOut size={26} />
        </button>
      )}

    </div>

    </nav>
  );
}
