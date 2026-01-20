import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import {
  MessageSquare,
  Bookmark,
  Compass,
  Users,
  Heart,
  MessageCircle,
  UserPlus,
} from "lucide-react";
import axios from "axios";

/*  CONFIG*/

const SHEET_URL =
  "https://api.sheety.co/a2b1328993660a67af1a0300ee237042/skillswap/community";

/*  FALLBACK DATA (CRITICAL) */

const FALLBACK_POSTS = [
  {
    id: 1,
    title: "Welcome to SkillSwap Community 🎉",
    description: "Sheety API is currently unavailable.",
    likes: 12,
    comments: 4,
  },
  {
    id: 2,
    title: "React Skill Exchange",
    description: "Anyone interested in React + Node swap?",
    likes: 8,
    comments: 2,
  },
];

const sheety = axios.create({
  baseURL: SHEET_URL,
  headers: import.meta.env.VITE_SHEETY_KEY
    ? { Authorization: `Bearer ${import.meta.env.VITE_SHEETY_KEY}` }
    : {},
});

/*  COMPONENT*/

export default function Community() {
  const [posts, setPosts] = useState([]);
  const [activeTab, setActiveTab] = useState("Feed");
  const [newPost, setNewPost] = useState("");
  const [savedPosts, setSavedPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  /*  FETCH POSTS  */

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await sheety.get("");
      setPosts(res.data?.community?.reverse() || FALLBACK_POSTS);
    } catch (err) {
      console.warn("⚠️ Sheety unavailable, using fallback");

      setPosts(FALLBACK_POSTS);
      setError("Live community temporarily unavailable");
    } finally {
      setLoading(false);
    }
  };

  /* ACTIONS  */

  const handleCreatePost = () => {
    if (!newPost.trim()) return;

    const tempPost = {
      id: Date.now(),
      title: newPost,
      description: newPost,
      likes: 0,
      comments: 0,
    };

    setPosts((prev) => [tempPost, ...prev]);
    setNewPost("");
  };

  const handleLike = (post) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === post.id ? { ...p, likes: p.likes + 1 } : p
      )
    );
  };

  const handleComment = (post) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === post.id ? { ...p, comments: p.comments + 1 } : p
      )
    );
  };

  const handleSavePost = (post) => {
    if (!savedPosts.find((p) => p.id === post.id)) {
      setSavedPosts([...savedPosts, post]);
    }
  };

  /*  TAB CONTENT */

  const renderContent = () => {
    if (loading) return <EmptyState text="Loading community…" />;
    if (error && !posts.length) return <EmptyState text={error} />;

    switch (activeTab) {
      case "Feed":
        return (
          <>
            <CreatePost
              newPost={newPost}
              setNewPost={setNewPost}
              onPost={handleCreatePost}
            />

            {posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onLike={handleLike}
                onComment={handleComment}
                onSave={handleSavePost}
              />
            ))}
          </>
        );

      case "Explore":
        return posts.slice(0, 3).map((post) => (
          <PostCard key={post.id} post={post} />
        ));

      case "My Mentors":
        return (
          <>
            <MentorCard name="Alex Rivera" role="AI Specialist" />
            <MentorCard name="Rahul Verma" role="Full Stack Mentor" />
          </>
        );

      case "Saved Posts":
        return savedPosts.length ? (
          savedPosts.map((post) => <PostCard key={post.id} post={post} />)
        ) : (
          <EmptyState text="No saved posts yet" />
        );

      default:
        return null;
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-12 gap-6">
          {/* LEFT */}
          <aside className="col-span-3">
            {["Feed", "Explore", "My Mentors", "Saved Posts"].map((item) => (
              <SidebarItem
                key={item}
                label={item}
                active={activeTab === item}
                onClick={() => setActiveTab(item)}
                icon={
                  item === "Feed" ? <MessageSquare size={18} /> :
                  item === "Explore" ? <Compass size={18} /> :
                  item === "My Mentors" ? <Users size={18} /> :
                  <Bookmark size={18} />
                }
              />
            ))}
          </aside>

          {/* CENTER */}
          <main className="col-span-6 space-y-6">{renderContent()}</main>

          {/* RIGHT */}
          <aside className="col-span-3 space-y-6">
            <Card title="Popular Topics">
              <Topic tag="#React" count="1.2k posts" />
              <Topic tag="#Python" count="620 posts" />
            </Card>

            <Card title="Top Mentors">
              <Mentor name="Alex Rivera" role="AI Specialist" />
            </Card>
          </aside>
        </div>
      </div>
    </>
  );
}

/* UI COMPONENTS  */

const SidebarItem = ({ icon, label, active, onClick }) => (
  <div
    onClick={onClick}
    className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer ${
      active ? "bg-indigo-50 text-indigo-600" : "text-gray-600"
    }`}
  >
    {icon}
    <span className="text-sm">{label}</span>
  </div>
);

const CreatePost = ({ newPost, setNewPost, onPost }) => (
  <div className="bg-white border rounded-xl p-4">
    <input
      value={newPost}
      onChange={(e) => setNewPost(e.target.value)}
      placeholder="Share something…"
      className="w-full border-b outline-none py-2"
    />
    <button
      onClick={onPost}
      className="mt-3 bg-indigo-600 text-white px-6 py-2 rounded-full"
    >
      Post
    </button>
  </div>
);

const PostCard = ({ post, onLike, onComment, onSave }) => (
  <div className="bg-white border rounded-xl p-5 space-y-3">
    <h3 className="font-semibold">{post.title}</h3>
    <p className="text-sm text-gray-600">{post.description}</p>

    <div className="flex gap-4 text-sm text-gray-500">
      {onLike && (
        <button onClick={() => onLike(post)}>
          <Heart size={16} /> {post.likes}
        </button>
      )}
      {onComment && (
        <button onClick={() => onComment(post)}>
          <MessageCircle size={16} /> {post.comments}
        </button>
      )}
      {onSave && (
        <button onClick={() => onSave(post)}>
          <Bookmark size={16} />
        </button>
      )}
    </div>
  </div>
);

const Card = ({ title, children }) => (
  <div className="bg-white border rounded-xl p-4">
    <h3 className="font-semibold mb-2">{title}</h3>
    {children}
  </div>
);

const Topic = ({ tag, count }) => (
  <div className="flex justify-between text-sm">
    <span className="text-indigo-600">{tag}</span>
    <span>{count}</span>
  </div>
);

const Mentor = ({ name }) => (
  <div className="flex justify-between text-sm">
    <span>{name}</span>
    <UserPlus size={16} />
  </div>
);

const MentorCard = ({ name, role }) => (
  <div className="bg-white border rounded-xl p-4">
    <p className="font-semibold">{name}</p>
    <p className="text-sm text-gray-500">{role}</p>
  </div>
);

const EmptyState = ({ text }) => (
  <div className="text-center text-gray-400 py-10">{text}</div>
);
