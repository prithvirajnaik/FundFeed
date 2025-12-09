import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Upload as UploadIcon,
  LayoutDashboard,
  Inbox,
  UserCircle,
  Bookmark,
  PlusCircle,
  Briefcase
} from "lucide-react";
import useAuth from "../hooks/useAuth";

export default function BottomNav() {
  const { user } = useAuth();
  const location = useLocation();
  const isActive = (path) => location.pathname.startsWith(path);

  if (!user) return null;

  return (
    <nav
      className="
        fixed bottom-0 left-0 w-full z-50
        bg-white/80 backdrop-blur-md
        border-t border-gray-200
        flex justify-around py-2
        md:hidden
      "
    >
      {/* Feed */}
      <Link to="/feed" className="flex flex-col items-center">
        <Home size={22} className={isActive("/feed") ? "text-orange-600" : "text-gray-600"} />
        <span className={`text-[10px] ${isActive("/feed") ? "text-orange-600" : "text-gray-600"}`}>
          Feed
        </span>
      </Link>

      {/* UPLOAD (developer only) */}
      {user.role === "developer" && (
        <Link to="/upload" className="flex flex-col items-center">
          <UploadIcon size={22} className={isActive("/upload") ? "text-orange-600" : "text-gray-600"} />
          <span className={`text-[10px] ${isActive("/upload") ? "text-orange-600" : "text-gray-600"}`}>
            Upload
          </span>
        </Link>
      )}

      {/* Investor Posts (developer only) */}
      {user.role === "developer" && (
        <Link to="/investor-posts" className="flex flex-col items-center">
          <Briefcase size={22} className={isActive("/investor-posts") ? "text-orange-600" : "text-gray-600"} />
          <span className={`text-[10px] ${isActive("/investor-posts") ? "text-orange-600" : "text-gray-600"}`}>
            Inv. Posts
          </span>
        </Link>
      )}

      {/* Dashboard (developer only) */}
      {user.role === "developer" && (
        <Link to="/dashboard" className="flex flex-col items-center">
          <LayoutDashboard size={22} className={isActive("/dashboard") ? "text-orange-600" : "text-gray-600"} />
          <span className={`text-[10px] ${isActive("/dashboard") ? "text-orange-600" : "text-gray-600"}`}>
            Dashboard
          </span>
        </Link>
      )}

      {/* Requests (developer only) */}
      {user.role === "developer" && (
        <Link to="/requests" className="flex flex-col items-center">
          <Inbox size={22} className={isActive("/requests") ? "text-orange-600" : "text-gray-600"} />
          <span className={`text-[10px] ${isActive("/requests") ? "text-orange-600" : "text-gray-600"}`}>
            Requests
          </span>
        </Link>
      )}

      {/* Saved (developer only) */}
      {user.role === "developer" && (
        <Link to="/saved" className="flex flex-col items-center">
          <Bookmark size={22} className={isActive("/saved") ? "text-orange-600" : "text-gray-600"} />
          <span className={`text-[10px] ${isActive("/saved") ? "text-orange-600" : "text-gray-600"}`}>
            Saved
          </span>
        </Link>
      )}

      {/* Saved (investor only) */}
      {user.role === "investor" && (
        <Link to="/saved" className="flex flex-col items-center">
          <Bookmark size={22} className={isActive("/saved") ? "text-orange-600" : "text-gray-600"} />
          <span className={`text-[10px] ${isActive("/saved") ? "text-orange-600" : "text-gray-600"}`}>
            Saved
          </span>
        </Link>
      )}
      {user.role === "investor" && (
        <Link to="/investor-posts/create" className="flex flex-col items-center">
          <PlusCircle size={22} className={isActive("/investor-posts/create") ? "text-orange-600" : "text-gray-600"} />
          <span className={`text-[10px] ${isActive("/investor-posts/create") ? "text-orange-600" : "text-gray-600"}`}>
            Post
          </span>
        </Link>
      )}

      {/* Dashboard (investor only) */}
      {user.role === "investor" && (
        <Link to="/dashboard" className="flex flex-col items-center">
          <LayoutDashboard size={22} className={isActive("/dashboard") ? "text-orange-600" : "text-gray-600"} />
          <span className={`text-[10px] ${isActive("/dashboard") ? "text-orange-600" : "text-gray-600"}`}>
            Dashboard
          </span>
        </Link>
      )}

      {/* Requests (investor only) */}
      {user.role === "investor" && (
        <Link to="/requests" className="flex flex-col items-center">
          <Inbox size={22} className={isActive("/requests") ? "text-orange-600" : "text-gray-600"} />
          <span className={`text-[10px] ${isActive("/requests") ? "text-orange-600" : "text-gray-600"}`}>
            Requests
          </span>
        </Link>
      )}

      {/* Profile */}
      <Link
        to={
          user.role === "developer"
            ? `/developer/${user.id}`
            : `/investor/${user.id}`
        }
        className="flex flex-col items-center"
      >
        <UserCircle size={22} className={
          isActive("/developer") || isActive("/investor")
            ? "text-orange-600"
            : "text-gray-600"
        } />
        <span className={`text-[10px] ${isActive("/developer") || isActive("/investor")
          ? "text-orange-600"
          : "text-gray-600"
          }`}>
          Profile
        </span>
      </Link>
    </nav>
  );
}
