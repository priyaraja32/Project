import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
  LayoutDashboard,
  GraduationCap,
  User,
  Settings as SettingsIcon,
  LogOut,
  Upload,
  Shield,
  Bell,
  MapPin,
  Briefcase,
  Star,
} from "lucide-react";
import { sheetApi } from "../services/api";

export default function Settings() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId") || "5";

  /* ---------------- STATE ---------------- */

  const [profileImage, setProfileImage] = useState(
    localStorage.getItem("profileImage") || "/profile-default.jpg"
  );

  const [form, setForm] = useState({
    name: "Priyanka",
    email: "",
    role: "",
    location: "",
    skills: "",
    bio: "",
  });

  const [notifications, setNotifications] = useState({
    email: true,
    messages: true,
    reminders: false,
  });

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  /*  FETCH USER */

  useEffect(() => {
    sheetApi
      .get(`/users/${userId}`)
      .then((res) => {
        const u = res.data.user;
        setForm({
          name: u.name || "Priyanka",
          email: u.email || "",
          role: u.role || "Student",
          location: u.location || "",
          skills: u.skills || "",
          bio: u.bio || "",
        });

        setNotifications({
          email: u.notifyEmail ?? true,
          messages: u.notifyMessages ?? true,
          reminders: u.notifyReminders ?? false,
        });
      })
      .catch(() => console.warn("User not found"));
  }, [userId]);

  /*  SAVE PROFILE */

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);

    try {
      await sheetApi.put(`/users/${userId}`, {
        user: {
          ...form,
          notifyEmail: notifications.email,
          notifyMessages: notifications.messages,
          notifyReminders: notifications.reminders,
        },
      });

      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch {
      alert("Failed to save changes");
    }

    setSaving(false);
  };

  /* PASSWORD*/

  const handleChangePassword = async () => {
    if (!passwords.current || !passwords.new) {
      alert("Please fill all password fields");
      return;
    }

    try {
      await sheetApi.put(`/users/${userId}`, {
        user: { password: passwords.new },
      });

      alert("Password updated successfully");
      setPasswords({ current: "", new: "" });
      setShowPassword(false);
    } catch {
      alert("Failed to update password");
    }
  };

  /* LOGOUT*/

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  /*PROFILE IMAGE */

  const handleProfileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    localStorage.setItem("profileImage", url);
    setProfileImage(url);
  };

  return (
    <>
      <Navbar />

      <div className="flex min-h-screen bg-[#f6f8ff]">
        {/* SIDEBAR */}
        <aside className="w-64 bg-white border-r border-gray-200 px-6 py-8 hidden lg:flex flex-col">
          <div className="mb-10">
            <div className="flex items-center gap-3">
              <img
                src={profileImage}
                className="w-12 h-12 rounded-full ring-4 ring-blue-100"
              />
              <div>
                <p className="font-semibold">{form.name}</p>
                <p className="text-xs text-blue-600">{form.role}</p>
              </div>
            </div>

            <label className="mt-3 inline-flex items-center gap-2 text-sm text-blue-600 cursor-pointer">
              <Upload size={14} />
              Change photo
              <input hidden type="file" onChange={handleProfileUpload} />
            </label>
          </div>

          <nav className="space-y-1 text-sm">
            <NavItem icon={<LayoutDashboard size={18} />} label="Dashboard" onClick={() => navigate("/dashboard")} />
            <NavItem icon={<GraduationCap size={18} />} label="Explore Skills" onClick={() => navigate("/explore-skills")} />
            <NavItem icon={<User size={18} />} label="Profile" onClick={() => navigate(`/profile/${userId}`)} />
            <NavItem icon={<SettingsIcon size={18} />} label="Settings" active />
          </nav>

          <button
            onClick={handleLogout}
            className="mt-auto pt-8 text-red-500 flex items-center gap-2"
          >
            <LogOut size={18} /> Log out
          </button>
        </aside>

        {/* MAIN */}
        <main className="flex-1 px-10 py-10">
          {/* HEADER */}
          <div className="flex justify-between items-center mb-10">
            <div>
              <h1 className="text-3xl font-semibold">Settings</h1>
              <p className="text-gray-500">Manage your personal information</p>
            </div>

            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl"
            >
              {saving ? "Saving..." : saved ? "Saved ✓" : "Save Changes"}
            </button>
          </div>

          {/* PROFILE INFO */}
          <Section title="Profile Information">
            <div className="grid md:grid-cols-2 gap-8">
              <Input label="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              <Input label="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              <Input icon={<Briefcase size={14} />} label="Role" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
              <Input icon={<MapPin size={14} />} label="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
              <Input icon={<Star size={14} />} label="Skills" value={form.skills} onChange={(e) => setForm({ ...form, skills: e.target.value })} />
            </div>

            <div className="mt-6">
              <label className="text-xs font-semibold text-gray-500 uppercase">
                Bio
              </label>
              <textarea
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
                rows={4}
                className="w-full mt-2 p-3 border border-gray-200 rounded-xl focus:border-blue-500 outline-none"
              />
            </div>
          </Section>

          {/* NOTIFICATIONS */}
          <Section title="Notifications" icon={<Bell size={18} />}>
            <Toggle label="Email notifications" checked={notifications.email} onChange={() => setNotifications({ ...notifications, email: !notifications.email })} />
            <Toggle label="Message notifications" checked={notifications.messages} onChange={() => setNotifications({ ...notifications, messages: !notifications.messages })} />
            <Toggle label="Session reminders" checked={notifications.reminders} onChange={() => setNotifications({ ...notifications, reminders: !notifications.reminders })} />
          </Section>

          {/* SECURITY */}
          <Section title="Security" icon={<Shield size={18} />}>
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="text-sm text-blue-600 hover:underline"
            >
              Change password
            </button>

            {showPassword && (
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <Input type="password" label="Current Password" value={passwords.current} onChange={(e) => setPasswords({ ...passwords, current: e.target.value })} />
                <Input type="password" label="New Password" value={passwords.new} onChange={(e) => setPasswords({ ...passwords, new: e.target.value })} />

                <button
                  onClick={handleChangePassword}
                  className="bg-blue-600 text-white px-5 py-2 rounded-lg w-fit"
                >
                  Update Password
                </button>
              </div>
            )}
          </Section>
        </main>
      </div>
    </>
  );
}

/*  UI COMPONENTS  */

function NavItem({ icon, label, onClick, active }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-2.5 w-full rounded-xl ${
        active
          ? "bg-blue-100 text-blue-700 font-semibold"
          : "hover:bg-gray-100 text-gray-600"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

function Section({ title, icon, children }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl mb-8">
      <div className="px-6 py-4 border-b border-gray-100 font-semibold flex items-center gap-2">
        {icon}
        {title}
      </div>
      <div className="p-6 space-y-4">{children}</div>
    </div>
  );
}

function Input({ label, icon, ...props }) {
  return (
    <div>
      <label className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase">
        {icon}
        {label}
      </label>
      <input
        {...props}
        className="w-full mt-2 pb-2 border-b border-gray-300 focus:border-blue-500 outline-none"
      />
    </div>
  );
}

function Toggle({ label, checked, onChange }) {
  return (
    <label className="flex justify-between items-center text-sm cursor-pointer">
      {label}
      <input type="checkbox" checked={checked} onChange={onChange} />
    </label>
  );
}
