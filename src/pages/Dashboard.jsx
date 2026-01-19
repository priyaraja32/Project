// import {
//   Search,
//   ArrowRight,
//   TrendingUp,
//   Trophy,
//   Monitor,
//   PenTool,
//   Camera,
//   Calendar,
//   Clock,
// } from "lucide-react";
// import { Link } from "react-router-dom";
// import { useEffect, useState } from "react";
// import Navbar from "../components/Navbar";
// import { sheetApi } from "../services/api";

// const SHEETY_ENDPOINTS = {
//   users: "/users",
//   matches: "/matches",
// };

// const fetchSheetData = async (resource) => {
//   try {
//     const res = await sheetApi.get(SHEETY_ENDPOINTS[resource]);
//     return res.data[resource] || [];
//   } catch {
//     return [];
//   }
// };

// export default function Dashboard() {
//   const [query, setQuery] = useState("");
//   const [matches, setMatches] = useState([]);
//   const [requested, setRequested] = useState({});

//   useEffect(() => {
//     Promise.all([
//       fetchSheetData("users"),
//       fetchSheetData("matches"),
//     ]).then(([users, matchRows]) => {
//       const map = {};
//       matchRows.forEach((m) => (map[m.userId] = m));

//       const merged = users.map((u) => ({
//         id: u.id,
//         name: u.name,
//         role: u.role,
//         image: u.avatar || "/profile.jpg",
//         match: Number(map[u.id]?.matches || 0),
//         offers: map[u.id]?.offers?.split(",") || [],
//         needs: map[u.id]?.needs?.split(",") || [],
//         lastActive: map[u.id]?.lastActive || "Recently joined",
//       }));

//       merged.sort((a, b) => b.match - a.match);
//       setMatches(merged);
//     });
//   }, []);

//   const filtered = matches.filter((m) =>
//     `${m.name} ${m.offers.join()} ${m.needs.join()}`
//       .toLowerCase()
//       .includes(query.toLowerCase())
//   );

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* GLOBAL NAVBAR (PROFILE + SETTINGS WORK HERE) */}
//       <Navbar />

//       {/* MAIN */}
//       <div className="max-w-7xl mx-auto px-6 py-10">
//         {/* SEARCH */}
//         <div className="text-center mb-12">
//           <h1 className="text-4xl font-bold">Welcome back</h1>
//           <p className="text-gray-500 mb-6">
//             Find your perfect skill match
//           </p>

//           <div className="max-w-2xl mx-auto flex bg-white border border-gray-200 rounded-full px-5 py-3">
//             <Search className="text-gray-400 mr-3" />
//             <input
//               value={query}
//               onChange={(e) => setQuery(e.target.value)}
//               placeholder="Search skills, people..."
//               className="flex-1 outline-none text-sm"
//             />
//             <button className="bg-indigo-600 text-white p-3 rounded-full">
//               <ArrowRight size={18} />
//             </button>
//           </div>
//         </div>

//         <div className="grid lg:grid-cols-3 gap-8">
//           {/* USERS */}
//           <div className="lg:col-span-2 space-y-6">
//             <h2 className="text-xl font-semibold">All Users</h2>

//             {filtered.map((m) => (
//               <div
//                 key={m.id}
//                 className="relative bg-white rounded-2xl p-6 border border-gray-200"
//               >
//                 <span
//                   className={`absolute top-4 right-4 px-3 py-1 text-xs font-semibold rounded-full ${getMatchStyle(
//                     m.match
//                   )}`}
//                 >
//                   {m.match === 0 ? "New" : `${m.match}% Match`}
//                 </span>

//                 <div className="flex gap-6">
//                   {/* PROFILE */}
//                   <div className="text-center">
//                     <img
//                       src={m.image}
//                       className="w-24 h-24 rounded-full object-cover ring-4 ring-indigo-100 mx-auto"
//                     />
//                     <p className="mt-3 font-semibold">{m.name}</p>
//                     <p className="text-xs text-gray-500">{m.role}</p>
//                     <p className="text-xs text-gray-400 mt-1 flex items-center justify-center gap-1">
//                       <Clock size={12} /> {m.lastActive}
//                     </p>
//                   </div>

//                   {/* DETAILS */}
//                   <div className="flex-1">
//                     <div className="grid grid-cols-2 gap-4">
//                       <SkillBlock title="OFFERS" list={m.offers} />
//                       <SkillBlock title="NEEDS" list={m.needs} type="need" />
//                     </div>

//                     <div className="flex justify-between mt-6">
//                       <Link
//                         to={`/profile/${m.id}`}
//                         className="text-sm text-gray-600 hover:underline"
//                       >
//                         View Profile
//                       </Link>

//                       <button
//                         onClick={() =>
//                           setRequested((p) => ({ ...p, [m.id]: true }))
//                         }
//                         disabled={requested[m.id]}
//                         className="text-sm font-semibold text-indigo-600"
//                       >
//                         {requested[m.id]
//                           ? "Request Sent"
//                           : "Request Swap →"}
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* RIGHT SIDE */}
//           <div className="space-y-6">
//             <Card title="Trending Skills" icon={<TrendingUp size={18} />}>
//               <TrendItem icon={<Monitor />} label="Web Dev" value="+12%" />
//               <TrendItem icon={<PenTool />} label="UX Design" value="+8%" />
//               <TrendItem icon={<Camera />} label="Photography" value="+5%" />
//             </Card>

//             <Card title="Upcoming Sessions" icon={<Calendar size={18} />}>
//               <Session title="React Pair Programming" time="Tomorrow · 7 PM" />
//               <Session title="UX Review" time="Friday · 6:30 PM" />
//             </Card>

//             <Card title="Community Challenge" icon={<Trophy size={18} />}>
//               <p className="text-sm text-gray-600">
//                 Teach 3 hours this week to earn Mentor badge 🏅
//               </p>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ---------- HELPERS ---------- */

// const SkillBlock = ({ title, list, type }) => (
//   <div>
//     <p className="text-xs font-semibold text-gray-400 mb-2">{title}</p>
//     {list.length ? (
//       list.map((i) => <Tag key={i} text={i} type={type} />)
//     ) : (
//       <span className="text-xs text-gray-400">—</span>
//     )}
//   </div>
// );

// const Card = ({ title, icon, children }) => (
//   <div className="bg-white border border-gray-200 rounded-2xl p-5">
//     <h3 className="font-semibold mb-4 flex items-center gap-2">
//       {icon} {title}
//     </h3>
//     {children}
//   </div>
// );

// const TrendItem = ({ icon, label, value }) => (
//   <div className="flex justify-between py-3 border-b border-gray-100 last:border-0">
//     <div className="flex gap-3 items-center">
//       <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
//         {icon}
//       </div>
//       <span className="text-sm">{label}</span>
//     </div>
//     <span className="text-sm font-semibold text-gray-500">{value}</span>
//   </div>
// );

// const Session = ({ title, time }) => (
//   <div className="border border-gray-100 rounded-xl p-3 mb-3">
//     <p className="text-sm font-semibold">{title}</p>
//     <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
//       <Clock size={12} /> {time}
//     </p>
//   </div>
// );

// const Tag = ({ text, type }) => (
//   <span
//     className={`inline-block mr-2 mb-2 px-3 py-1 rounded-lg text-xs font-semibold ${
//       type === "need"
//         ? "bg-orange-100 text-orange-600"
//         : "bg-indigo-100 text-indigo-600"
//     }`}
//   >
//     {text}
//   </span>
// );

// const getMatchStyle = (m) =>
//   m >= 95
//     ? "bg-green-100 text-green-700"
//     : m >= 90
//     ? "bg-indigo-100 text-indigo-700"
//     : m >= 75
//     ? "bg-blue-100 text-blue-700"
//     : "bg-gray-100 text-gray-600";


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

/* ---------------- CONSTANTS ---------------- */

const SHEETY_ENDPOINTS = {
  users: "/users",
  matches: "/matches",
};

/* ---------------- HELPERS ---------------- */

// ✅ FIXED: works with ANY Sheety tab name
const fetchSheetData = async (resource) => {
  try {
    const res = await sheetApi.get(SHEETY_ENDPOINTS[resource]);

    // Sheety always returns ONE root key
    const key = Object.keys(res.data)[0];
    const rows = res.data[key] || [];

    console.log(`Fetched ${resource}:`, rows); // debug
    return rows;
  } catch (e) {
    console.error(`Failed to fetch ${resource}`, e);
    return [];
  }
};

export default function Dashboard() {
  const [query, setQuery] = useState("");
  const [matches, setMatches] = useState([]);
  const [requested, setRequested] = useState({});

  useEffect(() => {
    Promise.all([
      fetchSheetData("users"),
      fetchSheetData("matches"),
    ]).then(([users, matchRows]) => {
      // Map matches by userId
      const matchMap = {};
      matchRows.forEach((m) => {
        matchMap[m.userId] = m;
      });

      const merged = users.map((u) => ({
        id: u.id,
        name: u.name,
        role: u.role || "Skill Swapper",
        image: u.avatar || "/profile.jpg",
        match: Number(matchMap[u.id]?.matches || 0),
        offers: matchMap[u.id]?.offers
          ? matchMap[u.id].offers.split(",")
          : [],
        needs: matchMap[u.id]?.needs
          ? matchMap[u.id].needs.split(",")
          : [],
        lastActive:
          matchMap[u.id]?.lastActive || "Recently joined",
      }));

      // Sort by best match
      merged.sort((a, b) => b.match - a.match);
      setMatches(merged);
    });
  }, []);

  // ✅ SAFE SEARCH FILTER
  const filtered = matches.filter((m) =>
    `${m.name} ${(m.offers || []).join(" ")} ${(m.needs || []).join(" ")}`
      .toLowerCase()
      .includes(query.toLowerCase())
  );

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
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* USERS */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-semibold">All Users</h2>

            {filtered.length === 0 && (
              <p className="text-gray-500 text-sm">
                No users found
              </p>
            )}

            {filtered.map((m) => (
              <div
                key={m.id}
                className="relative bg-white rounded-2xl p-6 border border-gray-200"
              >
                <span
                  className={`absolute top-4 right-4 px-3 py-1 text-xs font-semibold rounded-full ${getMatchStyle(
                    m.match
                  )}`}
                >
                  {m.match === 0 ? "New" : `${m.match}% Match`}
                </span>

                <div className="flex gap-6">
                  {/* PROFILE */}
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

                  {/* DETAILS */}
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

          {/* RIGHT SIDE */}
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

/* ---------------- UI HELPERS ---------------- */

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
  m >= 95
    ? "bg-green-100 text-green-700"
    : m >= 90
    ? "bg-indigo-100 text-indigo-700"
    : m >= 75
    ? "bg-blue-100 text-blue-700"
    : "bg-gray-100 text-gray-600";
