import { useState } from "react";
import Note from "../core/Note";
import { IconDocumentCheck, IconEdit, IconTrash } from "./Icons";
import ReactModal from "react-modal";

ReactModal.setAppElement("#root");

type NoteCardProps = {
  notes: Note[];
  deleteNote: (note: Note) => void;
  addNote: (note: Note) => void;
  getNotes: () => void;
};

export default function NoteCard({
  notes,
  deleteNote,
  addNote,
  getNotes,
}: NoteCardProps): JSX.Element {
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [noteToDelete, setNoteToDelete] = useState<Note | null>(null);
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [id, setId] = useState<string>("");

  const handleDeleteNote = (note: Note) => {
    setNoteToDelete(note);
    setIsOpen(true);
  };

  const handleConfirmDeleteNote = () => {
    if (noteToDelete) {
      deleteNote(noteToDelete);
    } else {
      alert("Erro ao deletar nota!");
    }
    setNoteToDelete(null);
    setIsOpen(false);

    getNotes();
  };

  const handleCancelDeleteNote = () => {
    setNoteToDelete(null);
    setIsOpen(false);
  };

  const handleEditNote = (note: Note) => {
    setTitle(note.Title);
    setBody(note.Body);
    setId(note.Id);
    setIsOpen(true);
  };

  const handleConfirmEditNote = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const note = {
      title,
      body,
      id,
    };

    if (note.title === "" || note.body === "") {
      alert("Preencha todos os campos!");
    } else {
      addNote(new Note(note.title, note.body, note.id));
      setTitle("");
      setBody("");
      setId("");
      setIsOpen(false);
    }
  };

  const handleCancelEditNote = () => {
    setTitle("");
    setBody("");
    setId("");
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold text-black">Notas</h1>
      {notes.length === 0 ? (
        <p className="text-xl text-gray-500">Carregando...</p>
      ) : (
        <>
          <div>
            <ReactModal
              isOpen={modalIsOpen}
              onRequestClose={() => setIsOpen(false)}
              className="flex flex-col items-center justify-center w-full h-full bg-gray-900 bg-opacity-50 p-4"
              overlayClassName="fixed inset-0 z-50"
            >
              {noteToDelete ? (
                <div className="flex flex-col items-center justify-center w-full max-w-lg lg:h-48 bg-gray-100 rounded-lg shadow-lg p-4">
                  <h1 className="text-2xl font-bold text-black mb-4">
                    Excluir Nota
                  </h1>
                  <p className="text-gray-600 text-sm mb-4">
                    Tem certeza que deseja excluir essa nota?
                  </p>
                  <div className="flex gap-4">
                    <button
                      className="bg-red-500 text-white rounded-lg px-4 py-2 hover:bg-red-600 duration-200"
                      onClick={() => handleConfirmDeleteNote()}
                      type="button"
                    >
                      Excluir
                    </button>
                    <button
                      className="bg-gray-500 text-white rounded-lg px-4 py-2 hover:bg-gray-600 duration-200"
                      onClick={() => handleCancelDeleteNote()}
                      type="button"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center w-full max-w-lg bg-gray-100 rounded-lg shadow-lg p-4">
                  <form
                    className="flex flex-col gap-3 w-full"
                    onSubmit={handleConfirmEditNote}
                  >
                    <div className="w-full flex flex-col border border-gray-400 rounded-lg">
                      <h1 className="text-2xl font-bold text-black py-2 px-3">
                        Editar Nota
                      </h1>
                      <label className={`"block"`} htmlFor="title">
                        <input
                          className="py-2 px-3 w-full text-base font-bold text-black bg-transparent placeholder-gray-500 placeholder:font-bold focus:outline-none"
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
                    <div className="flex gap-4 justify-end">
                      <button
                        className="bg-emerald-500 text-white rounded-lg px-4 py-2 hover:bg-emerald-600 duration-200"
                        type="submit"
                      >
                        Editar
                      </button>
                      <button
                        className="bg-gray-500 text-white rounded-lg px-4 py-2 hover:bg-gray-600 duration-200"
                        type="button"
                        onClick={() => handleCancelEditNote()}
                      >
                        Cancelar
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </ReactModal>

            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5 xl:grid-cols-4">
              {notes.map((note) => (
                <li key={note.Id} className="flex-1">
                  <div className="group rounded-lg border border-gray-400 shadow-lg px-4 pt-4 pb-2 hover:border-gray-500 duration-300">
                    <div className="flex justify-between gap-5">
                      <h2 className="text-lg font-bold text-black mb-2 lg:text-xl">
                        {note.Title}
                      </h2>
                      {IconDocumentCheck}
                    </div>
                    {note.Body.indexOf(" ") <= 0 && note.Body.length > 30 ? (
                      <p className="text-gray-600 text-sm lg:text-base">
                        {note.Body.substring(0, 30)}...
                      </p>
                    ) : (
                      <p className="text-gray-600 text-sm lg:text-base">
                        {note.Body}
                      </p>
                    )}
                    <div className="lg:opacity-0 lg:group-hover:opacity-100 duration-300 flex justify-end gap-2 lg:gap-1 mt-6">
                      <button
                        className="p-2 rounded-full hover:bg-gray-300 duration-200"
                        onClick={() => handleDeleteNote(note)}
                        type="button"
                        title="Excluir"
                      >
                        {IconTrash}
                      </button>
                      <button
                        className="p-2 rounded-full hover:bg-gray-300 duration-200"
                        onClick={() => handleEditNote(note)}
                        type="button"
                        title="Editar"
                      >
                        {IconEdit}
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
