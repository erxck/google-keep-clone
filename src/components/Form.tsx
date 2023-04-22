import Note from "../core/Note";
import { useState, useEffect } from "react";

type FormProps = {
  addNote: (note: Note) => void;
  note: Note | null;
};

export default function Form({ addNote, note }: FormProps): JSX.Element {
  const [id, setId] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [click, setClick] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const note = {
      title,
      body,
      id,
    };

    note.title === "" || note.body === ""
      ? alert("Preencha todos os campos!")
      : addNote(new Note(note.title, note.body, note.id));

    setTitle("");
    setBody("");
    setId("");
  };

  const closeForm = () => {
    setTitle("");
    setBody("");
    setId("");
    setClick(false);
  };

  return (
    <form
      className="flex flex-col mx-auto w-full max-w-lg gap-2 border border-gray-400 p-2 rounded-lg shadow-lg"
      onSubmit={handleSubmit}
    >
      <div className="w-full" onClick={() => setClick(true)}>
        {id ? (
          <h1 className="text-2xl px-3 mb-1 font-bold text-black">
            Editar Nota
          </h1>
        ) : (
          <h1 className="text-2xl px-3 mb-1 font-bold text-black">Nova Nota</h1>
        )}
        <label className={`${click ? "block" : "hidden"}`} htmlFor="title">
          <input
            className="py-2 px-3 w-full text-base font-bold text-black  bg-transparent placeholder-gray-500 placeholder:font-bold focus:outline-none"
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
            placeholder="Digite sua nota..."
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
