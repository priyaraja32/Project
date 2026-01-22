import { useEffect, useState, useRef } from "react";
import Navbar from "../components/Navbar";
import {
  MessageSquare,
  Bookmark,
  Compass,
  Users,
  Heart,
  MessageCircle,
  UserPlus,
  Trash2,
  Edit,
} from "lucide-react";
import axios from "axios";

/* CONFIG */
const SHEET_URL =
  "https://api.sheety.co/09934dbeb4cdbd806015e7f281dc4805/skillswap/community";

/* FALLBACK DATA */
const FALLBACK_POSTS = [
  {
    id: 1,
    title: "Welcome to SkillSwap Community 🎉",
    description: "Sheety API is currently unavailable.",
    likes: 12,
    comments: [],
  },
];

const sheety = axios.create({
  baseURL: SHEET_URL,
  headers: import.meta.env.VITE_SHEETY_KEY
    ? { Authorization: `Bearer ${import.meta.env.VITE_SHEETY_KEY}` }
    : {},
});

export default function Community() {
  const [posts, setPosts] = useState([]);
  const [activeTab, setActiveTab] = useState("Feed");
  const [newPost, setNewPost] = useState("");
  const [savedPosts, setSavedPosts] = useState([]);
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await sheety.get("");
      setPosts(
        res.data?.community?.reverse().map((p) => ({
          ...p,
          comments: [],
        })) || FALLBACK_POSTS
      );
    } catch {
      setPosts(FALLBACK_POSTS);
    } finally {
      setLoading(false);
    }
  };

  /* CREATE POST */
  const handleCreatePost = async () => {
    if (!newPost.trim()) return;

    const tempPost = {
      id: Date.now(),
      title: newPost,
      description: newPost,
      likes: 0,
      comments: [],
    };

    setPosts((prev) => [tempPost, ...prev]);
    setNewPost("");

    try {
      await sheety.post("", {
        community: {
          title: tempPost.title,
          description: tempPost.description,
          likes: 0,
        },
      });
      setSuccessMsg("Post published successfully!!..");
    } catch {
      setSuccessMsg("Posted locally (API unavailable) ⚠️");
    }

    setTimeout(() => setSuccessMsg(""), 2000);
  };

  /* LIKE */
  const handleLike = (id) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, likes: p.likes + 1 } : p
      )
    );
  };

  /* COMMENT */
  const handleAddComment = (id, text) => {
    if (!text.trim()) return;

    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, comments: [...p.comments, text] }
          : p
      )
    );
  };

  /* SAVE */
  const handleSavePost = (post) => {
    if (!savedPosts.find((p) => p.id === post.id)) {
      setSavedPosts([...savedPosts, post]);
      setSuccessMsg("Post saved successfully ");
      setTimeout(() => setSuccessMsg(""), 2000);
    }
  };

  /* DELETE */
  const handleDelete = (id) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
    setSuccessMsg("Post deleted ");
    setTimeout(() => setSuccessMsg(""), 2000);
  };

  /* EDIT */
  const handleEdit = (id, text) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, title: text, description: text }
          : p
      )
    );
    setSuccessMsg("Post updated ");
    setTimeout(() => setSuccessMsg(""), 2000);
  };

  const renderContent = () => {
    if (loading) return <EmptyState text="Loading community…" />;

    if (activeTab === "Saved Posts") {
      return savedPosts.length ? (
        savedPosts.map((post) => <PostCard key={post.id} post={post} />)
      ) : (
        <EmptyState text="No saved posts yet" />
      );
    }

    if (activeTab === "My Mentors") {
      return (
        <>
          <MentorCard name="Alex Rivera" role="AI Specialist" />
          <MentorCard name="Rahul Verma" role="Full Stack Mentor" />
        </>
      );
    }

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
            onSave={handleSavePost}
            onComment={handleAddComment}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </>
    );
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-12 gap-6">
          <aside className="col-span-3 space-y-2">
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

          <main className="col-span-6 space-y-6">
            {successMsg && (
              <div className="bg-green-100 text-green-700 px-4 py-2 rounded-lg">
                {successMsg}
              </div>
            )}
            {renderContent()}
          </main>

          <aside className="col-span-3 space-y-6">
            <Card title="Popular Topics">
              <Topic tag="#React" count="1.2k posts" />
              <Topic tag="#Python" count="620 posts" />
            </Card>

            <Card title="Top Mentors">
              <Mentor name="Alex Rivera" />
            </Card>
          </aside>
        </div>
      </div>
    </>
  );
}

/*  UI COMPONENTS  */

const SidebarItem = ({ icon, label, active, onClick }) => (
  <div
    onClick={onClick}
    className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer transition ${
      active ? "bg-indigo-50 text-indigo-600" : "text-gray-600 hover:bg-gray-100"
    }`}
  >
    {icon}
    <span className="text-sm">{label}</span>
  </div>
);

const CreatePost = ({ newPost, setNewPost, onPost }) => (
  <div className="bg-white rounded-xl p-4 shadow-sm">
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

const PostCard = ({ post, onLike, onSave, onComment, onDelete, onEdit }) => {
  const [commentText, setCommentText] = useState("");
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(post.title);
  const inputRef = useRef(null);

  return (
    <div className="bg-white rounded-xl p-5 space-y-3 shadow-sm">
      {editing ? (
        <input
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          className="w-full border rounded px-2 py-1"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onEdit(post.id, editText);
              setEditing(false);
            }
          }}
        />
      ) : (
        <>
          <h3 className="font-semibold">{post.title}</h3>
          <p className="text-sm text-gray-600">{post.description}</p>
        </>
      )}

      <div className="flex gap-4 text-sm text-gray-500">
        <button onClick={() => onLike(post.id)} className="flex gap-1">
          <Heart size={16} /> {post.likes}
        </button>

        <button
          className="flex gap-1"
          onClick={() => inputRef.current?.focus()}
        >
          <MessageCircle size={16} /> {post.comments.length}
        </button>

        <button onClick={() => onSave(post)}>
          <Bookmark size={16} />
        </button>

        <button onClick={() => setEditing(!editing)}>
          <Edit size={16} />
        </button>

        <button onClick={() => onDelete(post.id)}>
          <Trash2 size={16} />
        </button>
      </div>

      {/*  SHOW COMMENTS */}
      {post.comments.length > 0 && (
        <div className="space-y-1">
          {post.comments.map((comment, index) => (
            <div
              key={index}
              className="text-sm text-gray-700 bg-gray-100 px-3 py-1 rounded-lg"
            >
              {comment}
            </div>
          ))}
        </div>
      )}

      <input
        ref={inputRef}
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Write a comment…"
        className="w-full text-sm border rounded-lg px-3 py-1"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onComment(post.id, commentText);
            setCommentText("");
          }
        }}
      />
    </div>
  );
};

const Card = ({ title, children }) => (
  <div className="bg-white rounded-xl p-4 shadow-sm">
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
  <div className="bg-white rounded-xl p-4 shadow-sm">
    <p className="font-semibold">{name}</p>
    <p className="text-sm text-gray-500">{role}</p>
  </div>
);

const EmptyState = ({ text }) => (
  <div className="text-center text-gray-400 py-10">{text}</div>
);

