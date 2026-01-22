import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

/* PUBLIC */
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";

/* PROTECTED */
import Dashboard from "./pages/Dashboard";
import MySkills from "./pages/MySkills";
import AddSkill from "./pages/AddSkill";
import ExploreSkills from "./pages/ExploreSkills";
import Community from "./pages/Community";
import Messages from "./pages/Messages";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import ViewProfile from "./pages/ViewProfile";
import RequestSwap from "./pages/RequestSwap";

import ProtectedRoute from "./routes/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* DEFAULT → LOGIN */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* HOME AFTER LOGIN */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        {/* APP PAGES */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-skills"
          element={
            <ProtectedRoute>
              <MySkills />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-skill"
          element={
            <ProtectedRoute>
              <AddSkill />
            </ProtectedRoute>
          }
        />

        <Route
          path="/explore-skills"
          element={
            <ProtectedRoute>
              <ExploreSkills />
            </ProtectedRoute>
          }
        />

        <Route
          path="/community"
          element={
            <ProtectedRoute>
              <Community />
            </ProtectedRoute>
          }
        />

        <Route
          path="/messages"
          element={
            <ProtectedRoute>
              <Messages />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile/:id"
          element={
            <ProtectedRoute>
              <ViewProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/request/:id"
          element={
            <ProtectedRoute>
              <RequestSwap />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

