import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import {
  LayoutDashboard,
  GraduationCap,
  MessageSquare,
  User,
  Settings,
  Share2,
  Pencil,
  Star,
  Calendar,
  Globe,
  LogOut,
  Camera,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "https://api.sheety.co/09934dbeb4cdbd806015e7f281dc4805/skillswap/users"
    )
      .then((res) => res.json())
      .then((data) => {
     
        const safeUser = data?.users?.[0];

        setUser({
          ...safeUser,
          name: safeUser?.name || "Priyanka",
          role: safeUser?.role || "Mentor",
          location: safeUser?.location || "India",
          skills: safeUser?.skills || "React, JavaScript",
          needs: safeUser?.needs || "UI Design",
          about:
            safeUser?.about ||
            "Passionate about sharing knowledge and learning through skill swapping.",
        });

        setLoading(false);
      })
      .catch(() => {
     
        setUser({
          name: "Priyanka",
          role: "STUDENT",
          location: "India",
          skills: "React, JavaScript",
          needs: "UI Design",
          about:
            "Passionate about sharing knowledge and learning through skill swapping.",
        });
        setLoading(false);
      });
  }, []);

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading profile...
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <div className="flex min-h-screen bg-[#f6faf7]">
        {/* SIDEBAR */}
        <aside className="w-64 bg-white border-r px-6 py-8 hidden lg:flex flex-col">
          <div className="flex items-center gap-3 mb-8">
            <img
              src={avatarPreview || "avatars/me.jpg"}
              className="w-12 h-12 rounded-full border object-cover"
            />
            <div>
              <p className="font-semibold">{user.name}</p>
              <p className="text-xs text-green-600">STUDENT</p>
            </div>
          </div>

          <nav className="space-y-2 text-sm">
            <NavItem icon={<LayoutDashboard size={18} />} label="Dashboard" to="/dashboard" />
            <NavItem icon={<GraduationCap size={18} />} label="Explore Skills" to="/explore-skills" />
            <NavItem icon={<MessageSquare size={18} />} label="Messages" />
            <NavItem icon={<User size={18} />} label="Profile" active />
            <NavItem icon={<Settings size={18} />} label="Settings" to="/settings" />
          </nav>

          <div className="mt-auto pt-10 text-sm text-green-700 flex items-center gap-2 cursor-pointer">
            <LogOut size={18} /> Log Out
          </div>
        </aside>

        {/* MAIN */}
        <main className="flex-1 px-8 py-8">
          {/* PROFILE CARD */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-sm">
       
            <div className="h-40 bg-green-100 relative" />

        
            <div className="px-8 pb-8 -mt-16">
              <div className="flex flex-col md:flex-row gap-6 items-start">
             
                <div className="relative">
                  <img
                    src={avatarPreview || "avatars/me.jpg"}
                    className="w-28 h-28 rounded-full border-4 border-white object-cover bg-white"
                  />

                  <label className="absolute bottom-0 right-0 bg-green-500 p-2 rounded-full cursor-pointer text-white">
                    <Camera size={14} />
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={handleAvatarUpload}
                    />
                  </label>
                </div>

                <div className="flex-1">
                  <h1 className="text-2xl font-bold">{user.name}</h1>
                  <p className="text-green-700 font-medium">
                    {user.role} • {user.location}
                  </p>

                  <div className="flex gap-4 mt-3 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} /> Joined 2024
                    </span>
                    <span className="flex items-center gap-1">
                      <Globe size={14} /> English
                    </span>
                    <span className="flex items-center gap-1">
                      <Star size={14} className="text-yellow-500" /> 4.9
                    </span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button className="border px-4 py-2 rounded-xl flex items-center gap-2">
                    <Share2 size={16} /> Share
                  </button>
                  <button className="bg-green-500 text-white px-5 py-2 rounded-xl font-semibold">
                    Edit Profile
                  </button>
                </div>
              </div>

              {/* ABOUT */}
              <div className="mt-8 border-t pt-6">
                <h3 className="text-sm font-bold text-green-700 mb-2">
                  ABOUT ME
                </h3>
                <p className="text-gray-600 max-w-4xl leading-relaxed">
                  {user.about}
                </p>
              </div>
            </div>
          </div>

          {/* SKILLS */}
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <Card title="Skills I Teach">
              {user.skills.split(",").map((s) => (
                <Tag key={s} text={s} />
              ))}
            </Card>

            <Card title="Skills I'm Learning">
              {user.needs.split(",").map((s) => (
                <Tag key={s} text={s} type="learn" />
              ))}
            </Card>
          </div>
        </main>
      </div>
    </>
  );
}

/* COMPONENTS  */

function NavItem({ icon, label, to, active }) {
  return (
    <Link
      to={to || "#"}
      className={`flex items-center gap-3 px-4 py-2.5 rounded-lg ${
        active
          ? "bg-green-100 text-green-700 font-semibold"
          : "hover:bg-gray-100"
      }`}
    >
      {icon}
      {label}
    </Link>
  );
}

function Card({ title, children }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h3 className="font-bold mb-4">{title}</h3>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function Tag({ text, type }) {
  return (
    <span
      className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
        type === "learn"
          ? "bg-blue-100 text-blue-700"
          : "bg-green-100 text-green-700"
      }`}
    >
      {text.trim()}
    </span>
  );
}
