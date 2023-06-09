import Note from "../../core/Note";
import NoteRepository from "../../core/NoteRepository";
import db from "../config";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore";

export default class NoteCollection implements NoteRepository {
  private conversor = {
    toFirestore(note: Note) {
      return {
        title: note.Title,
        body: note.Body,
        date: new Date(),
      };
    },
    fromFirestore(snapshot: any, options: any) {
      const data = snapshot.data(options);
      return new Note(data.title, data.body, snapshot.id);
    },
  };

  async addNote(note: Note): Promise<Note> {
    if (note?.Id) {
      await this.updateNote(note);
    } else {
      await this.collection(note);
    }

    return note;
  }

  async updateNote(note: Note): Promise<void> {
    try {
      await setDoc(
        doc(db, "notes", note.Id).withConverter(this.conversor),
        note
      );
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  }

  async deleteNote(note: Note): Promise<void> {
    try {
      await deleteDoc(doc(db, "notes", note.Id));
    } catch (error) {
      console.error("Error removing document: ", error);
    }
  }

  async getNotes(): Promise<Note[]> {
    const notes: Note[] = [];
    const notesRef = collection(db, "notes").withConverter(this.conversor);
    const querySnapshot = await getDocs(
      query(notesRef, orderBy("date", "desc"))
    );

    querySnapshot.forEach((doc) => {
      notes.push(doc.data());
    });

    return notes;
  }

  private async collection(note: Note): Promise<any> {
    try {
      const docRef = await addDoc(
        collection(db, "notes").withConverter(this.conversor),
        note
      );
      // console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }
}
