import { useState } from "react";
import NoteForm from "./components/NoteForm";
import NoteCard from "./components/NoteCard";

export default function App() {
  const [notes, setNotes] = useState([]);

  const addNote = (note) => {
    setNotes([{ ...note, id: Date.now() }, ...notes]);
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-6">
          📝 My Notes App
        </h1>

        <NoteForm addNote={addNote} />

        <div className="grid md:grid-cols-2 gap-6 mt-8">
          {notes.length === 0 ? (
            <p className="text-white text-center col-span-full">
              No notes yet. Add one!
            </p>
          ) : (
            notes.map((note) => (
              <NoteCard key={note.id} note={note} deleteNote={deleteNote} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
