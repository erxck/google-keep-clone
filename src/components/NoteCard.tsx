import Note from "../core/Note";
import { IconDocumentCheck } from "./Icons";

type NoteCardProps = {
  notes: Note[];
};

export default function NoteCard({ notes }: NoteCardProps): JSX.Element {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold text-black">Notas</h1>
      {notes.length === 0 && notes.length >= 0 ? (
        <p className="text-xl text-gray-500">Carregando...</p>
      ) : (
        <>
          <div>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5 xl:grid-cols-4">
              {notes.map((note) => (
                <li key={note.Id} className="flex-1 duration-300">
                  <div className="rounded-lg border border-gray-400 shadow-lg pt-4 pb-14 px-4">
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
