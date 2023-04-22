import Note from "../core/Note";
import NoteRepository from "../core/NoteRepository";
import NoteCollection from "../backend/db/NoteCollection";
import { useEffect, useState } from "react";
import Form from "./Form";
import NoteCard from "./NoteCard";

export default function Main(): JSX.Element {
  const repository: NoteRepository = new NoteCollection();
  const [notes, setNotes] = useState<Note[]>([]);
  const [note, setNote] = useState<Note | null>(null);

  const getNotes = () => {
    repository.getNotes().then((notes) => setNotes(notes));
  };

  useEffect(getNotes, []);

  const deleteNote = (note: Note) => {
    repository.deleteNote(note);
    getNotes();
  };

  const addNote = async (note: Note) => {
    await repository.addNote(note);
    getNotes();
  };

  return (
    <main className="flex-1 bg-gray-200 space-y-10 pb-10 px-3 sm:px-5 md:px-9 lg:px-12 xl:px-24">
      <Form addNote={addNote} note={note} />
      <NoteCard
        notes={notes}
        deleteNote={deleteNote}
        addNote={addNote}
        getNotes={getNotes}
      />
    </main>
  );
}
