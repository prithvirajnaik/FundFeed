import { Link, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import {
  Home,
  Upload as UploadIcon,
  LayoutDashboard,
  Inbox,
  User,
  Bookmark,
  LogOut,
  PlusCircle,
  Briefcase
} from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname.startsWith(path);

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
      {/* LEFT: Logo */}
      <Link to="/" className="text-2xl font-bold text-orange-500">
        FundFeed
      </Link>

      {/* DESKTOP NAV */}
      <div className="hidden md:flex items-center gap-6 text-[#0f0f0f]">

        {/* GUEST (Desktop) */}
        {!user && (
          <>
            <Link to="/login"
              className={`${isActive("/login") ? "text-orange-600 font-semibold" : ""}`}>
              Login
            </Link>

            <Link to="/register"
              className={`${isActive("/register") ? "text-orange-600 font-semibold" : ""}`}>
              Register
            </Link>
          </>
        )}

        {/* ------------------ DEVELOPER NAV ------------------ */}
        {user?.role === "developer" && (
          <>
            <Link
              to="/feed"
              className={`flex items-center gap-1
                ${isActive("/feed") ? "text-orange-600 font-semibold" : ""}`}>
              <Home size={18} /> Feed
            </Link>

            <Link
              to="/investor-posts"
              className={`flex items-center gap-1
                ${isActive("/investor-posts") ? "text-orange-600 font-semibold" : ""}`}>
              <Briefcase size={18} /> Investor Posts
            </Link>

            <Link
              to="/upload"
              className={`flex items-center gap-1
                ${isActive("/upload") ? "text-orange-600 font-semibold" : ""}`}>
              <UploadIcon size={18} /> Upload
            </Link>

            <Link
              to="/dashboard"
              className={`flex items-center gap-1
                ${isActive("/dashboard") ? "text-orange-600 font-semibold" : ""}`}>
              <LayoutDashboard size={18} /> Dashboard
            </Link>

            <Link
              to="/requests"
              className={`flex items-center gap-1
                ${isActive("/requests") ? "text-orange-600 font-semibold" : ""}`}>
              <Inbox size={18} /> Requests
            </Link>

            <Link
              to="/saved"
              className={`flex items-center gap-1
                ${isActive("/saved") ? "text-orange-600 font-semibold" : ""}`}>
              <Bookmark size={18} /> Saved
            </Link>

            <Link
              to={`/developer/${user.id}`}
              className={`flex items-center gap-1
                ${isActive(`/developer/${user.id}`) ? "text-orange-600 font-semibold" : ""}`}>
              <User size={18} /> Profile
            </Link>
          </>
        )}

        {/* ------------------ INVESTOR NAV ------------------ */}
        {user?.role === "investor" && (
          <>
            <Link
              to="/feed"
              className={`flex items-center gap-1
                ${isActive("/feed") ? "text-orange-600 font-semibold" : ""}`}>
              <Home size={18} /> Feed
            </Link>
            <Link
              to="/investor-posts/create"
              className={`flex items-center gap-1
                ${isActive("/investor-posts/create") ? "text-orange-600 font-semibold" : ""}`}>
              <PlusCircle size={18} /> Post
            </Link>
            <Link
              to="/saved"
              className={`flex items-center gap-1
                ${isActive("/saved") ? "text-orange-600 font-semibold" : ""}`}>
              <Bookmark size={18} /> Saved
            </Link>

            <Link
              to={`/investor/${user.id}`}
              className={`flex items-center gap-1
                ${isActive(`/investor/${user.id}`) ? "text-orange-600 font-semibold" : ""}`}>
              <User size={18} /> Profile
            </Link>
          </>
        )}

        {/* LOGOUT */}
        {user && (
          <button
            onClick={logout}
            className="flex items-center gap-1 bg-orange-500 text-white px-4 py-1.5 rounded-lg hover:bg-orange-600 transition"
          >
            <LogOut size={18} /> Logout
          </button>
        )}
      </div>

      {/* MOBILE RIGHT SIDE */}
      <div className="md:hidden flex items-center gap-4">

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

        {user && (
          <button onClick={logout}>
            <LogOut size={26} className="text-gray-800" />
          </button>
        )}
      </div>
    </nav>
  );
}
