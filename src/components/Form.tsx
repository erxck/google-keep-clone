import Note from "../core/Note";
import NoteRepository from "../core/NoteRepository";
import { useState } from "react";

type FormProps = {
  repository: NoteRepository;
  getNotes: () => void;
};

export default function Form({ repository, getNotes }: FormProps): JSX.Element {
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [click, setClick] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const note = {
      title,
      body,
    };

    note.title === "" || note.body === ""
      ? alert("Preencha todos os campos!")
      : addNote(new Note(note.title, note.body));

    setTitle("");
    setBody("");
  };

  const addNote = async (note: Note) => {
    await repository.addNote(note);
    getNotes();
  };

  const closeForm = () => {
    setClick(false);
    setTitle("");
    setBody("");
  };

  return (
    <form
      className="flex flex-col mx-auto w-full max-w-lg gap-2 border border-gray-400 p-2 rounded-lg shadow-lg"
      onSubmit={handleSubmit}
    >
      <div className="w-full" onClick={() => setClick(true)}>
        <label className={`${click ? "block" : "hidden"}`} htmlFor="title">
          <input
            className="py-2 px-3 w-full font-bold text-black  bg-transparent placeholder-gray-500 placeholder:font-bold focus:outline-none"
            type="text"
            name="title"
            id="title"
            value={title}
            placeholder="Título"
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label htmlFor="body">
          <textarea
            className="py-2 px-3 w-full text-sm text-black bg-transparent placeholder-gray-500 focus:outline-none"
            name="body"
            id="body"
            value={body}
            placeholder="Criar uma nota..."
            onChange={(e) => setBody(e.target.value)}
          />
        </label>
      </div>
      <div className={`${click ? "flex justify-end gap-3" : "hidden"}`}>
        <button
          className="py-2 px-3 bg-gray-300 text-black rounded-lg hover:bg-gray-400/70 duration-300"
          onClick={closeForm}
          type="button"
        >
          Fechar
        </button>
        <button
          className="py-2 px-4 bg-emerald-500 text-xl font-bold text-white rounded-full hover:bg-emerald-600/80 duration-300"
          type="submit"
        >
          +
        </button>
      </div>
    </form>
  );
}
