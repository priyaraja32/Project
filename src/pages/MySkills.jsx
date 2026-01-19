import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
  User,
  LayoutDashboard,
  Settings,
  Plus,
  GraduationCap,
  TrendingUp,
  RefreshCw,
  Clock,
  Star,
  Code2,
  Music,
  Languages,
  Camera,
  Upload,
} from "lucide-react";
import { fetchActivities, fetchSkills } from "../services/api";

export default function MySkills() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId") || "1";

  const [profileImage, setProfileImage] = useState(
    localStorage.getItem("profileImage") || "/profile-default.jpg"
  );

  const [activities, setActivities] = useState([]);
  const [skills, setSkills] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    fetchActivities().then(setActivities);
    fetchSkills().then(setSkills);
  }, []);

  const handleProfileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    localStorage.setItem("profileImage", url);
    setProfileImage(url);
  };

  const filteredActivities =
    filter === "All"
      ? activities
      : activities.filter((a) => a.status === filter);

  return (
    <>
      <Navbar />

      <div className="flex min-h-screen bg-[#f6f8ff]">
        {/* SIDEBAR */}
        <aside className="w-64 bg-white border-r border-gray-200/70 px-6 py-8 hidden lg:block">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-3">
              <img
                src={profileImage}
                className="w-12 h-12 rounded-full border border-gray-200/70"
                alt="profile"
              />
              <div>
                <p className="font-semibold text-sm">Priyanka</p>
                <p className="text-xs text-blue-600">Student</p>
              </div>
            </div>

            <label className="flex items-center gap-2 text-xs cursor-pointer text-blue-600">
              <Upload size={14} /> Change Photo
              <input type="file" hidden onChange={handleProfileUpload} />
            </label>
          </div>

          <nav className="space-y-1">
            <SidebarItem icon={<LayoutDashboard size={16} />} label="Dashboard" onClick={() => navigate("/dashboard")} />
            <SidebarItem icon={<GraduationCap size={16} />} label="Explore Skills" onClick={() => navigate("/explore-skills")} />
            <SidebarItem icon={<User size={16} />} label="Profile" onClick={() => navigate(`/profile/${userId}`)} />
            <SidebarItem icon={<Settings size={16} />} label="Settings" onClick={() => navigate("/settings")} />
          </nav>
        </aside>

        {/* MAIN */}
        <main className="flex-1 px-10 py-10">
          {/* HEADER */}
          <div className="flex justify-between mb-8">
            <div>
              <h1 className="text-2xl font-semibold">My Skills</h1>
              <p className="text-sm text-gray-500">
                Manage and track your skills
              </p>
            </div>

            <button
              onClick={() => navigate("/add-skill")}
              className="flex items-center gap-2 bg-blue-500 text-white px-5 py-2.5 rounded-lg shadow-sm"
            >
              <Plus size={16} /> Add New Skill
            </button>
          </div>

          {/* STATS */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <StatCard title="Skills Offered" value={skills.length} icon={<TrendingUp size={18} />} />
            <StatCard title="Active Swaps" value="1" icon={<RefreshCw size={18} />} />
            <StatCard title="Hours Taught" value="24h" icon={<Clock size={18} />} />
            <StatCard title="Rating" value="4.5" icon={<Star size={18} />} />
          </div>

          {/* ACTIVITY */}
          <div className="bg-white rounded-xl border border-gray-200/70 shadow-sm">
            <div className="flex justify-between px-6 py-4 border-b border-gray-200/70">
              <div>
                <p className="font-semibold text-sm">Recent Activity</p>
                <p className="text-xs text-gray-500">Latest skill swaps</p>
              </div>

              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="text-xs border border-gray-200/70 rounded-lg px-3 py-1.5 bg-white"
              >
                <option>All</option>
                <option>Completed</option>
                <option>Pending</option>
              </select>
            </div>

            {filteredActivities.length === 0 ? (
              <p className="p-6 text-sm text-gray-500">
                No recent activity.
              </p>
            ) : (
              <table className="w-full text-sm">
                <tbody>
                  {filteredActivities.map((a) => (
                    <ActivityRow key={a.id} {...a} />
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </main>
      </div>
    </>
  );
}

/* COMPONENTS */

const SidebarItem = ({ icon, label, onClick }) => (
  <button
    onClick={onClick}
    className="flex gap-3 px-4 py-2.5 w-full rounded-lg hover:bg-gray-100 text-sm"
  >
    {icon} {label}
  </button>
);

const StatCard = ({ title, value, icon }) => (
  <div className="bg-white p-6 rounded-xl border border-gray-200/70 shadow-sm">
    <div className="flex justify-between text-gray-500 text-sm">
      <p>{title}</p>
      {icon}
    </div>
    <h2 className="text-2xl font-semibold mt-2">{value}</h2>
  </div>
);

function ActivityRow({ icon, title, partner, date, status }) {
  const icons = {
    code: <Code2 size={16} />,
    music: <Music size={16} />,
    translate: <Languages size={16} />,
    camera: <Camera size={16} />,
  };

  return (
    <tr className="border-b border-gray-200/70 last:border-0 hover:bg-gray-50">
      <td className="px-6 py-4 flex gap-3 items-center">
        <div className="text-blue-500">{icons[icon]}</div>
        <div>
          <p className="font-medium">{title}</p>
          <p className="text-xs text-gray-500">{partner}</p>
        </div>
      </td>

      <td className="px-6 py-4 text-xs text-gray-500">{date}</td>

      <td className="px-6 py-4 text-right">
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            status === "Completed"
              ? "bg-blue-100 text-blue-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {status}
        </span>
      </td>
    </tr>
  );
}
