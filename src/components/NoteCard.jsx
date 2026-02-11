import { Trash2, CalendarDays, StickyNote } from "lucide-react";

export default function NoteCard({ note, deleteNote }) {
  return (
    <div className="relative group">
      {/* Glow Effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition"></div>

      <div className="relative bg-white/80 backdrop-blur-xl p-6 rounded-3xl shadow-xl border border-white/40 transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-2xl">
        
        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <StickyNote className="text-indigo-600" size={20} />
            <h2 className="text-lg font-bold text-gray-800 break-words">
              {note.title}
            </h2>
          </div>

          <button
            onClick={() => deleteNote(note.id)}
            className="p-2 rounded-lg bg-red-100 text-red-500 hover:bg-red-200 transition"
          >
            <Trash2 size={18} />
          </button>
        </div>

        {/* Content */}
        <p className="text-gray-600 mt-3 text-sm leading-relaxed whitespace-pre-line">
          {note.content}
        </p>

        {/* Footer */}
        <div className="flex items-center gap-2 mt-4 text-xs text-gray-500">
          <CalendarDays size={14} />
          <span>
            {new Date(note.id).toLocaleDateString()} •{" "}
            {new Date(note.id).toLocaleTimeString()}
          </span>
        </div>
      </div>
    </div>
  );
}

