import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from 'react-hot-toast';

import Navbar from "./components/Navbar";
import BottomNav from "./components/BottomNav";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";

import Feed from "./features/feed/pages/Feed"

import PitchDetail from "./features/pitchDetail/pages/PitchDetail";
import InvestorPostDetail from "./features/investor-posts/pages/InvestorPostDetail";

import UploadPitch from "./features/upload/pages/UploadPitch";
import InvestorPostsFeed from "./features/investor-posts/pages/InvestorPostsFeed";
import CreateInvestorPost from "./features/investor-posts/pages/CreateInvestorPost";
import DeveloperProfile from "./features/profile/pages/DeveloperProfile";
import InvestorProfile from "./features/profile/pages/InvestorProfile";
import Saved from "./features/saved/pages/Saved";

import RequestsInbox from "./features/requests/pages/RequestsInbox";
import MeetingRoom from "./features/requests/pages/MeetingRoom";
import DashboardRouter from "./features/dashboard/pages/DashboardRouter";
import EditPitch from "./features/dashboard/pages/EditPitch";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#fff',
              color: '#0f0f0f',
              padding: '12px 20px',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            },
            success: {
              iconTheme: {
                primary: '#16A29A',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#FF6B2C',
                secondary: '#fff',
              },
            },
          }}
        />
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
              path="/investor-posts"
              element={
                <ProtectedRoute>
                  <InvestorPostsFeed />
                </ProtectedRoute>
              }
            />

            <Route path="/investor-post/:id" element={
              <ProtectedRoute>
                <InvestorPostDetail />
              </ProtectedRoute>
            }
            />

            <Route
              path="/investor-posts/create"
              element={
                <ProtectedRoute>
                  <CreateInvestorPost />
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
                  <DashboardRouter />
                </ProtectedRoute>
              }
            />

            <Route
              path="/edit/:id"
              element={
                <ProtectedRoute>
                  <EditPitch />
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
            <Route
              path="/meeting/:id"
              element={
                <ProtectedRoute>
                  <MeetingRoom />
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
