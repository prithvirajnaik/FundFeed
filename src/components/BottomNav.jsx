import { Link } from "react-router-dom";
import {
  Home,
  Upload as UploadIcon,
  LayoutDashboard,
  Inbox,
  UserCircle,
} from "lucide-react";
import useAuth from "../hooks/useAuth";
export default function BottomNav() {
  const { user } = useAuth();

  if (!user) return null; // no nav for guests

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
      <Link to="/feed" className="flex flex-col items-center text-gray-800">
        <Home size={22} />
        <span className="text-[10px]">Feed</span>
      </Link>

      {/* Upload */}
      <Link to="/upload" className="flex flex-col items-center text-gray-800">
        <UploadIcon size={22} />
        <span className="text-[10px]">Upload</span>
      </Link>

      {/* Dashboard (Developer only) */}
      {user.role === "developer" && (
        <Link
          to="/dashboard"
          className="flex flex-col items-center text-gray-800"
        >
          <LayoutDashboard size={22} />
          <span className="text-[10px]">Dashboard</span>
        </Link>
      )}

      {/* Requests (Developer only) */}
      {user.role === "developer" && (
        <Link to="/requests" className="flex flex-col items-center text-gray-800">
          <Inbox size={22} />
          <span className="text-[10px]">Requests</span>
        </Link>
      )}

      {/* Profile */}
      <Link
        to={
          user.role === "developer"
            ? `/developer/${user.id}`
            : `/investor/${user.id}`
        }
        className="flex flex-col items-center text-gray-800"
      >
        <UserCircle size={22} />
        <span className="text-[10px]">Profile</span>
      </Link>
    </nav>
  );
}
