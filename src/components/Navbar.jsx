/**
 * Navbar Component
 * ----------------------------
 * - Shows different menus based on role:
 *      Guest → Login | Register
 *      Developer → Feed | Upload Pitch | Profile
 *      Investor → Feed | Saved | Profile
 * - Uses custom color palette (primary, accent, gold)
 */

import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-primary text-white px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">
        FundFeed
      </Link>
      {/* <Link to="/investor/99" className="text-white">Test Investor</Link> */}
      {/* Right Side */}
      <div className="flex items-center gap-4">

        {!user && (
          <>
            <Link to="/login" className="hover:text-gold">Login</Link>
            <Link to="/register" className="hover:text-gold">Register</Link>
          </>
        )}

        {user?.role === "developer" && (
          <>
            <Link to="/feed" className="hover:text-gold">Feed</Link>
            <Link to="/upload" className="hover:text-gold">Upload Pitch</Link>
            <Link to={`/developer/${user.id}`} className="hover:text-gold">Profile</Link>
              <Link to="/requests" className="hover:text-gold ml-4">Requests</Link>
          </>
        )}

        {user?.role === "investor" && (
          <>
            <Link to="/feed" className="hover:text-gold">Feed</Link>
            <Link to="/saved" className="hover:text-gold">Saved</Link>
            <Link to={`/investor/${user.id}`} className="hover:text-gold">Profile</Link>
          </>
        )}

        {user && (
          <button
            onClick={logout}
            className="ml-3 bg-accent px-3 py-1 rounded-lg hover:bg-opacity-90"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
