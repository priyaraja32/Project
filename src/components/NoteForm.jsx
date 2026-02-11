import { useState } from "react";
import { NotebookPen, Type, AlignLeft } from "lucide-react";

export default function NoteForm({ addNote }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content) return;

    addNote({ title, content });
    setTitle("");
    setContent("");
  };

  return (
    <div className="relative">
      {/* Gradient Glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl blur opacity-25"></div>

      <form
        onSubmit={handleSubmit}
        className="relative bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/40 space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-center gap-2 text-gray-800">
          <NotebookPen className="text-indigo-600" size={28} />
          <h2 className="text-2xl font-bold">Create New Note</h2>
        </div>

        {/* Title Field */}
        <div className="relative">
          <label className="text-sm font-semibold text-gray-600">Title</label>
          <Type
            className="absolute left-3 top-11 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Enter note title..."
            className="w-full mt-2 pl-10 pr-3 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Content Field */}
        <div className="relative">
          <label className="text-sm font-semibold text-gray-600">Content</label>
          <AlignLeft
            className="absolute left-3 top-11 text-gray-400"
            size={18}
          />
          <textarea
            placeholder="Write your thoughts..."
            rows="4"
            className="w-full mt-2 pl-10 pr-3 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none transition"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300"
        >
          <NotebookPen size={18} />
          Add Note
        </button>
      </form>
    </div>
  );
}
