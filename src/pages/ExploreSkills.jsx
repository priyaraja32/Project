import { useState } from "react";
import Navbar from "../components/Navbar";
import {
  Code2,
  Music,
  Camera,
  Globe,
  Dumbbell,
  Utensils,
  Star,
  LayoutGrid,
  Search,
  SlidersHorizontal,
  X,
  Send,
} from "lucide-react";

/* -------------------- CATEGORY ICON MAP -------------------- */

const categoryIconMap = {
  Technology: <Code2 size={14} />,
  Music: <Music size={14} />,
  Languages: <Globe size={14} />,
  Photography: <Camera size={14} />,
  Cooking: <Utensils size={14} />,
  Fitness: <Dumbbell size={14} />,
};

/* -------------------- CATEGORIES -------------------- */

const categories = [
  { name: "All", icon: <LayoutGrid size={18} /> },
  { name: "Technology", icon: <Code2 size={18} /> },
  { name: "Music", icon: <Music size={18} /> },
  { name: "Languages", icon: <Globe size={18} /> },
  { name: "Photography", icon: <Camera size={18} /> },
  { name: "Cooking", icon: <Utensils size={18} /> },
  { name: "Fitness", icon: <Dumbbell size={18} /> },
];

/* -------------------- SKILLS DATA -------------------- */

const skills = [
  {
    id: 1,
    title: "Python Programming",
    category: "Technology",
    rating: 4.9,
    description: "Learn Python from basics to real-world projects.",
    details:
      "Covers Python fundamentals, APIs, automation and mini projects.",
    user: "Sarah J.",
    role: "Senior Data Scientist",
    avatar: "/avatars/sarah.jpg",
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    id: 2,
    title: "Acoustic Guitar Basics",
    category: "Music",
    rating: 4.7,
    description: "Master chords, strumming & your first song.",
    details:
      "Beginner friendly sessions with practice routines.",
    user: "Mike T.",
    role: "Musician",
    avatar: "avatar-mike.jpg",
    gradient: "from-orange-400 to-rose-500",
  },
  {
    id: 3,
    title: "Portrait Photography",
    category: "Photography",
    rating: 5.0,
    description: "Lighting, posing & professional composition.",
    details:
      "Learn DSLR & mobile photography with real techniques.",
    user: "Jessica M.",
    role: "Photographer",
    avatar: "avatars/avatar-jesica.jpg",
    gradient: "from-sky-400 to-blue-500",
  },
  {
    id: 4,
    title: "Conversational Spanish",
    category: "Languages",
    rating: 4.8,
    description: "Speak confidently in daily conversations.",
    details:
      "Focus on pronunciation, vocabulary & real-life usage.",
    user: "Alex R.",
    role: "Language Coach",
    avatar: "avatar-alex.jpg",
    gradient: "from-emerald-400 to-green-500",
  },
  {
    id: 5,
    title: "Italian Home Cooking",
    category: "Cooking",
    rating: 5.0,
    description: "Authentic Italian dishes made simple.",
    details:
      "Learn pasta, sauces & classic Italian recipes.",
    user: "Maria C.",
    role: "Culinary Expert",
    avatar: "/avatars/mariya.jpg",
    gradient: "from-pink-400 to-rose-500",
  },
  {
    id: 6,
    title: "Beginner Fitness Training",
    category: "Fitness",
    rating: 4.6,
    description: "Build strength & healthy habits.",
    details:
      "Beginner workouts, flexibility & stamina training.",
    user: "David L.",
    role: "Certified Trainer",
    avatar: "/avatars/david.jpg",
    gradient: "from-yellow-400 to-orange-500",
  },
];

/* ======================= COMPONENT ======================= */

export default function ExploreSkills() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [recommended, setRecommended] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [toast, setToast] = useState("");

  /* -------------------- FILTER -------------------- */

  const filteredSkills = skills.filter((skill) => {
    const matchCategory =
      activeCategory === "All" || skill.category === activeCategory;

    const matchSearch =
      skill.title.toLowerCase().includes(search.toLowerCase()) ||
      skill.user.toLowerCase().includes(search.toLowerCase());

    const matchRecommended = !recommended || skill.rating >= 4.8;

    return matchCategory && matchSearch && matchRecommended;
  });

  /* -------------------- REQUEST SWAP -------------------- */

  const requestSwap = (skill) => {
    setToast(`Swap request sent to ${skill.user}`);
    setTimeout(() => setToast(""), 3000);
    setSelectedSkill(null);
  };

  return (
    <>
      <Navbar />

      {/* TOAST */}
      {toast && (
        <div className="fixed top-6 right-6 bg-green-600 text-white px-5 py-3 rounded-xl shadow-lg z-50">
          {toast}
        </div>
      )}

      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex">
        {/* SIDEBAR */}
        <aside className="w-64 bg-white border-r border-green-100 px-6 py-8 hidden lg:block">
          <h2 className="text-lg font-semibold mb-6">Categories</h2>
          <ul className="space-y-1">
            {categories.map((cat) => (
              <li
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer transition
                ${
                  activeCategory === cat.name
                    ? "bg-green-100 text-green-700 font-semibold"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {cat.icon}
                {cat.name}
              </li>
            ))}
          </ul>
        </aside>

        {/* MAIN */}
        <main className="flex-1 px-10 py-8">
          {/* HEADER */}
          <div className="mb-8">
            <h1 className="text-3xl font-semibold">Explore Skills</h1>
            <p className="text-green-700">
              Discover and swap skills with the community
            </p>
          </div>

          {/* SEARCH + FILTER */}
          <div className="flex flex-wrap gap-4 mb-10">
            <div className="flex items-center gap-2 bg-white border border-green-200 rounded-xl px-4 py-3 w-full md:w-1/2 shadow-sm">
              <Search size={18} className="text-green-600" />
              <input
                placeholder="Search skills or people..."
                className="w-full outline-none text-sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <button
              onClick={() => setRecommended(!recommended)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl border text-sm font-semibold transition
              ${
                recommended
                  ? "bg-green-500 text-white border-green-500"
                  : "bg-white border-green-200 text-gray-700 hover:bg-green-50"
              }`}
            >
              <SlidersHorizontal size={16} />
              Recommended
            </button>
          </div>

          {/* CARDS */}
          <div className="grid md:grid-cols-3 gap-8">
            {filteredSkills.map((skill) => (
              <div
                key={skill.id}
                className="bg-white rounded-2xl border border-green-100 hover:shadow-lg transition overflow-hidden"
              >
                {/* COLORED CONTENT HEADER */}
                <div
                  className={`p-5 bg-gradient-to-br ${skill.gradient} text-white`}
                >
                  <div className="flex items-center gap-2 text-xs bg-white/20 w-fit px-3 py-1 rounded-full mb-3">
                    {categoryIconMap[skill.category]}
                    {skill.category}
                  </div>

                  <h3 className="text-lg font-semibold">
                    {skill.title}
                  </h3>

                  <p className="text-xs opacity-90 mt-1">
                    Learn & exchange skills
                  </p>
                </div>

                {/* BODY */}
                <div className="p-6">
                  <div className="flex justify-between mb-4">
                    <p className="text-sm text-gray-600">
                      {skill.description}
                    </p>
                    <span className="flex items-center gap-1 text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full h-fit">
                      <Star size={12} fill="currentColor" />
                      {skill.rating}
                    </span>
                  </div>

                  {/* USER */}
                  <div className="flex items-center gap-3 mb-6">
                    <img
                      src={skill.avatar}
                      className="w-10 h-10 rounded-full ring-2 ring-green-100 shadow-sm"
                    />
                    <div>
                      <p className="text-sm font-medium">
                        {skill.user}
                      </p>
                      <p className="text-xs text-green-600">
                        {skill.role}
                      </p>
                    </div>
                  </div>

                  {/* ACTIONS */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => setSelectedSkill(skill)}
                      className="flex-1 border border-green-200 rounded-lg py-2 text-sm hover:bg-green-50"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => requestSwap(skill)}
                      className="flex-1 bg-green-500 text-white rounded-lg py-2 text-sm font-semibold hover:bg-green-600"
                    >
                      Request Swap
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* MODAL */}
      {selectedSkill && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-lg rounded-2xl p-6 relative">
            <button
              onClick={() => setSelectedSkill(null)}
              className="absolute top-4 right-4"
            >
              <X />
            </button>

            <h2 className="text-xl font-semibold mb-2">
              {selectedSkill.title}
            </h2>

            <p className="text-sm text-gray-600 mb-4">
              {selectedSkill.details}
            </p>

            <button
              onClick={() => requestSwap(selectedSkill)}
              className="w-full flex items-center justify-center gap-2 bg-green-500 text-white py-3 rounded-xl font-semibold"
            >
              <Send size={16} />
              Request Swap
            </button>
          </div>
        </div>
      )}
    </>
  );
}

