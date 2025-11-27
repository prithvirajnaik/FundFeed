import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Navbar from "./components/Navbar";
import BottomNav from "./components/BottomNav";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";

import Feed from "./features/feed/pages/Feed"

import PitchDetail from "./features/pitchDetail/pages/pitchDetail";
import UploadPitch from "./features/upload/pages/UploadPitch";
import DeveloperProfile from "./features/profile/pages/DeveloperProfile";
import InvestorProfile from "./features/profile/pages/InvestorProfile";
import Saved from "./features/saved/pages/Saved";

import RequestsInbox from "./features/requests/pages/RequestsInbox";
import DeveloperDashboard from "./features/dashboard/pages/DeveloperDashboard";

// Placeholder pages
// const Feed = () => <div className="p-10 text-xl">Feed Page</div>;
// const Upload = () => <div className="p-10 text-xl">Upload Pitch</div>;
// const Saved = () => <div className="p-10 text-xl">Saved Pitches</div>;
const Profile = () => <div className="p-10 text-xl">Profile</div>;

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        
        <Navbar />
        <div className="pb-14">   
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected routes */}
          <Route
            path="/feed"
            element={
              <ProtectedRoute>
                <Feed />
              </ProtectedRoute>
            }
          />

          <Route
            path="/upload"
            element={
              <ProtectedRoute>
                <UploadPitch />
              </ProtectedRoute>
            }
          />

          <Route
            path="/saved"
            element={
              <ProtectedRoute>
                <Saved />
              </ProtectedRoute>
            }
          />
          <Route 
            path="/pitch/:id"
            element={
              <ProtectedRoute>
                <PitchDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DeveloperDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/developer/:id"
            element={
              <ProtectedRoute>
                <DeveloperProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/investor/:id"
            element={
              <ProtectedRoute>
                <InvestorProfile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/requests"
            element={
              <ProtectedRoute>
                <RequestsInbox />
              </ProtectedRoute>
            }
          />
        </Routes>
        </div>
            <BottomNav />  
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
