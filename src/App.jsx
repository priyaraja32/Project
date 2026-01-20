import { BrowserRouter, Routes, Route } from "react-router-dom";

/* AUTH */
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

/* MAIN PAGE */
import Dashboard from "./pages/Dashboard";
import MySkills from "./pages/MySkills";
import AddSkill from "./pages/AddSkill";
import ExploreSkills from "./pages/ExploreSkills";
import Community from "./pages/Community";
import Messages from "./pages/Messages";
import Settings from "./pages/Settings";

/* PROFILE */
import Profile from "./pages/Profile";
import ViewProfile from "./pages/ViewProfile";

/* REQUEST */
import RequestSwap from "./pages/RequestSwap";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* AUTH */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* MAIN APP */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/my-skills" element={<MySkills />} />
        <Route path="/add-skill" element={<AddSkill />} />
        <Route path="/explore-skills" element={<ExploreSkills />} />
        <Route path="/community" element={<Community />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/settings" element={<Settings />} />

        {/* PROFILE ROUTES */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/:id" element={<ViewProfile />} />

        {/* REQUEST SWAP */}
        <Route path="/request/:id" element={<RequestSwap />} />
      </Routes>
    </BrowserRouter>
  );
}
