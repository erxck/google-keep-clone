import Note from "./Note";

export default interface NoteRepo {
  addNote(note: Note): Promise<Note>;
  getNotes(): Promise<Note[]>; // Promise is a type that represents a value that may not be available yet
}
