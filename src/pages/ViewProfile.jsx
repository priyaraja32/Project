import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Star,
  Clock,
  Calendar,
  MessageSquare,
  X,
} from "lucide-react";
import { sheetApi } from "../services/api";

const upcomingSessionsData = {
  1: [
    { title: "React Hooks Deep Dive", time: "Tomorrow · 7:00 PM" },
    { title: "Portfolio Review", time: "Friday · 6:30 PM" },
  ],
  2: [{ title: "UI Design Feedback", time: "Today · 8:00 PM" }],
  3: [{ title: "Photography Basics", time: "Saturday · 5:00 PM" }],
};

const reviewsData = {
  1: [
    { name: "Renu", text: "Explains concepts very clearly." },
    { name: "Meera", text: "Great mentor and very patient." },
  ],
  2: [{ name: "Rohit", text: "Excellent UI suggestions." }],
  3: [{ name: "Sneha", text: "Loved the photography tips!" }],
};

export default function ViewProfile() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    Promise.all([
      sheetApi.get("/users"),
      sheetApi.get("/matches"),
    ]).then(([usersRes, matchesRes]) => {
      setUser(usersRes.data.users.find(u => String(u.id) === id));
      setMatch(matchesRes.data.matches.find(m => String(m.userId) === id));
      setLoading(false);
    });
  }, [id]);

  if (loading) return <Centered text="Loading profile..." />;
  if (!user) return <Centered text="Profile not found" />;

  const offers = match?.offers?.split(",") || [];
  const needs = match?.needs?.split(",") || [];

  return (
    <div className="min-h-screen bg-[#f6f8ff]">
      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* BACK */}
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 mb-6"
        >
          <ArrowLeft size={16} /> Back
        </Link>

        {/* MAIN CARD */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
          {/* HEADER */}
          <div className="flex flex-col md:flex-row gap-8">
            <img
              src={user.avatar || "/profile-default.jpg"}
              className="w-36 h-36 rounded-full object-cover ring-4 ring-indigo-50"
              alt={user.name}
            />

            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-800">
                {user.name}
              </h1>
              <p className="text-gray-500">{user.role}</p>

              <div className="flex gap-6 mt-4 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <Clock size={14} /> Active recently
                </span>
                <span className="flex items-center gap-1">
                  <Star size={14} className="text-yellow-500" />
                  {match?.matches || 0}% Match
                </span>
              </div>

              {/* ACTIONS */}
              <div className="flex gap-4 mt-6">
                <Link
                  to={`/request/${id}`}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold shadow-sm"
                >
                  Request Swap
                </Link>

                <button
                  onClick={() => setShowMessage(true)}
                  className="border border-gray-200 px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:bg-gray-50"
                >
                  <MessageSquare size={16} /> Message
                </button>
              </div>
            </div>
          </div>

          <SoftDivider />

          {/* SKILLS */}
          <Grid>
            <Section title="Skills Offered">
              {offers.map(s => <Tag key={s} text={s} />)}
            </Section>

            <Section title="Wants to Learn">
              {needs.map(s => (
                <Tag key={s} text={s} type="need" />
              ))}
            </Section>
          </Grid>

          <SoftDivider />

          {/* UPCOMING */}
          <Section title="Upcoming Sessions">
            {(upcomingSessionsData[id] || []).map((s, i) => (
              <SoftCard key={i}>
                <p className="font-semibold text-gray-800">
                  {s.title}
                </p>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <Calendar size={14} /> {s.time}
                </p>
              </SoftCard>
            ))}
          </Section>

          <SoftDivider />

          {/* REVIEWS */}
          <Section title="Reviews">
            {(reviewsData[id] || []).map((r, i) => (
              <SoftCard key={i}>
                <p className="font-semibold text-gray-800">
                  {r.name}
                </p>
                <p className="text-sm text-gray-600">{r.text}</p>
              </SoftCard>
            ))}
          </Section>
        </div>
      </div>

      {/* MESSAGE MODAL */}
      {showMessage && (
        <MessageModal
          user={user}
          onClose={() => setShowMessage(false)}
        />
      )}
    </div>
  );
}

/* ---------------- UI PARTS ---------------- */

function MessageModal({ user, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 relative shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X />
        </button>

        <h2 className="text-xl font-bold mb-4">
          Message {user.name}
        </h2>

        <textarea
          placeholder="Type your message..."
          className="w-full border border-gray-200 rounded-xl p-3 h-32 focus:outline-none focus:ring-2 focus:ring-indigo-200"
        />

        <button
          onClick={onClose}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold mt-4"
        >
          Send Message
        </button>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="mb-6">
      <h3 className="font-semibold text-lg mb-3 text-gray-800">
        {title}
      </h3>
      {children}
    </div>
  );
}

function Grid({ children }) {
  return <div className="grid md:grid-cols-2 gap-8">{children}</div>;
}

function SoftDivider() {
  return <div className="my-8 h-px bg-gray-100" />;
}

function Tag({ text, type }) {
  return (
    <span
      className={`inline-block mr-2 mb-2 px-3 py-1.5 rounded-lg text-xs font-semibold ${
        type === "need"
          ? "bg-orange-50 text-orange-600"
          : "bg-indigo-50 text-indigo-600"
      }`}
    >
      {text}
    </span>
  );
}

function SoftCard({ children }) {
  return (
    <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 mb-3">
      {children}
    </div>
  );
}

function Centered({ text }) {
  return (
    <div className="min-h-screen flex items-center justify-center text-gray-500">
      {text}
    </div>
  );
}
