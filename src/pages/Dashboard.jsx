import {
  Search,
  ArrowRight,
  TrendingUp,
  Trophy,
  Monitor,
  PenTool,
  Camera,
  Calendar,
  Clock,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { sheetApi } from "../services/api";
import { aiMatchUsers } from "../ai/gemini";

/* CONSTANTS */
const SHEETY_ENDPOINTS = {
  users: "/users",
  matches: "/matches",
};

/* HELPERS */
const fetchSheetData = async (resource) => {
  try {
    const res = await sheetApi.get(SHEETY_ENDPOINTS[resource]);
    const key = Object.keys(res.data)[0];
    return res.data[key] || [];
  } catch (e) {
    console.error(`Failed to fetch ${resource}`, e);
    return [];
  }
};


const normalizeMatch = (match) => {
  if (match >= 80) return Math.min(match, 100); // OFFERS
  if (match >= 40) return Math.max(match, 40);  // NEEDS
  if (match > 0) return Math.max(match, 20);    // RELATED
  return 0;                                     // NO MATCH
};

export default function Dashboard() {
  const [query, setQuery] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [matches, setMatches] = useState([]);
  const [requested, setRequested] = useState({});
  const [aiLoading, setAiLoading] = useState(false);

  const isSearching = query.trim().length > 0;

  /* INITIAL LOAD */
  useEffect(() => {
    Promise.all([
      fetchSheetData("users"),
      fetchSheetData("matches"),
    ]).then(([users, matchRows]) => {
      const matchMap = {};
      matchRows.forEach((m) => (matchMap[m.userId] = m));

      const merged = users.map((u) => ({
        id: u.id,
        name: u.name,
        role: u.role || "Skill Swapper",
        image: u.avatar || "/profile.jpg",
        offers: matchMap[u.id]?.offers
          ? matchMap[u.id].offers.split(",").map(s => s.trim())
          : [],
        needs: matchMap[u.id]?.needs
          ? matchMap[u.id].needs.split(",").map(s => s.trim())
          : [],
        lastActive: matchMap[u.id]?.lastActive || "Recently joined",
        match: 0,
      }));

      setAllUsers(merged);
      setMatches(merged);
    });
  }, []);

  /* AI SEARCH */
  useEffect(() => {
    if (!isSearching) {
      setMatches(allUsers);
      return;
    }

    setAiLoading(true);

    aiMatchUsers(
      query,
      allUsers.map((u) => ({
        id: u.id,
        offers: u.offers,
        needs: u.needs,
      }))
    ).then((aiResults) => {
      const scoreMap = {};
      aiResults.forEach((r) => {
        scoreMap[r.userId] = r.match;
      });

      const withScores = allUsers
        .map((u) => {
          const rawMatch = scoreMap[u.id] ?? 0;
          return {
            ...u,
            match: normalizeMatch(rawMatch),
          };
        })
        .sort((a, b) => b.match - a.match);

      setMatches(withScores);
      setAiLoading(false);
    });
  }, [query, allUsers, isSearching]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* SEARCH */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold">Welcome back</h1>
          <p className="text-gray-500 mb-6">
            Find your perfect skill match
          </p>

          <div className="max-w-2xl mx-auto flex bg-white border border-gray-200 rounded-full px-5 py-3">
            <Search className="text-gray-400 mr-3" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search skills, people..."
              className="flex-1 outline-none text-sm"
            />
            <button className="bg-indigo-600 text-white p-3 rounded-full">
              <ArrowRight size={18} />
            </button>
          </div>

          {aiLoading && (
            <p className="text-xs text-indigo-500 mt-2">
              AI matching in progress...
            </p>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* USERS */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-semibold">All Users</h2>

            {matches.map((m) => (
              <div
                key={m.id}
                className="relative bg-white rounded-2xl p-6 border border-gray-200"
              >
                {isSearching && (
                  <span
                    className={`absolute top-4 right-4 px-3 py-1 text-xs font-semibold rounded-full ${getMatchStyle(
                      m.match
                    )}`}
                  >
                    {m.match}% Match
                  </span>
                )}

                <div className="flex gap-6">
                  <div className="text-center">
                    <img
                      src={m.image}
                      alt={m.name}
                      className="w-24 h-24 rounded-full object-cover ring-4 ring-indigo-100 mx-auto"
                    />
                    <p className="mt-3 font-semibold">{m.name}</p>
                    <p className="text-xs text-gray-500">{m.role}</p>
                    <p className="text-xs text-gray-400 mt-1 flex items-center justify-center gap-1">
                      <Clock size={12} /> {m.lastActive}
                    </p>
                  </div>

                  <div className="flex-1">
                    <div className="grid grid-cols-2 gap-4">
                      <SkillBlock title="OFFERS" list={m.offers} />
                      <SkillBlock title="NEEDS" list={m.needs} type="need" />
                    </div>

                    <div className="flex justify-between mt-6">
                      <Link
                        to={`/profile/${m.id}`}
                        className="text-sm text-gray-600 hover:underline"
                      >
                        View Profile
                      </Link>

                      <button
                        onClick={() =>
                          setRequested((p) => ({
                            ...p,
                            [m.id]: true,
                          }))
                        }
                        disabled={requested[m.id]}
                        className="text-sm font-semibold text-indigo-600"
                      >
                        {requested[m.id]
                          ? "Request Sent"
                          : "Request Swap →"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT PANEL (UNCHANGED) */}
          <div className="space-y-6">
            <Card title="Trending Skills" icon={<TrendingUp size={18} />}>
              <TrendItem icon={<Monitor />} label="Web Dev" value="+12%" />
              <TrendItem icon={<PenTool />} label="UX Design" value="+8%" />
              <TrendItem icon={<Camera />} label="Photography" value="+5%" />
            </Card>

            <Card title="Upcoming Sessions" icon={<Calendar size={18} />}>
              <Session title="React Pair Programming" time="Tomorrow · 7 PM" />
              <Session title="UX Review" time="Friday · 6:30 PM" />
            </Card>

            <Card title="Community Challenge" icon={<Trophy size={18} />}>
              <p className="text-sm text-gray-600">
                Teach 3 hours this week to earn Mentor badge 🏅
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

/* UI HELPERS */

const SkillBlock = ({ title, list, type }) => (
  <div>
    <p className="text-xs font-semibold text-gray-400 mb-2">{title}</p>
    {list.length ? (
      list.map((i) => <Tag key={i} text={i} type={type} />)
    ) : (
      <span className="text-xs text-gray-400">—</span>
    )}
  </div>
);

const Card = ({ title, icon, children }) => (
  <div className="bg-white border border-gray-200 rounded-2xl p-5">
    <h3 className="font-semibold mb-4 flex items-center gap-2">
      {icon} {title}
    </h3>
    {children}
  </div>
);

const TrendItem = ({ icon, label, value }) => (
  <div className="flex justify-between py-3 border-b border-gray-100 last:border-0">
    <div className="flex gap-3 items-center">
      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
        {icon}
      </div>
      <span className="text-sm">{label}</span>
    </div>
    <span className="text-sm font-semibold text-gray-500">{value}</span>
  </div>
);

const Session = ({ title, time }) => (
  <div className="border border-gray-100 rounded-xl p-3 mb-3">
    <p className="text-sm font-semibold">{title}</p>
    <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
      <Clock size={12} /> {time}
    </p>
  </div>
);

const Tag = ({ text, type }) => (
  <span
    className={`inline-block mr-2 mb-2 px-3 py-1 rounded-lg text-xs font-semibold ${
      type === "need"
        ? "bg-orange-100 text-orange-600"
        : "bg-indigo-100 text-indigo-600"
    }`}
  >
    {text}
  </span>
);

const getMatchStyle = (m) =>
  m >= 80
    ? "bg-green-100 text-green-700"
    : m >= 40
    ? "bg-blue-100 text-blue-700"
    : m > 0
    ? "bg-indigo-100 text-indigo-700"
    : "bg-gray-100 text-gray-400";
