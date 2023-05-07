import React, { createContext, useState, useEffect } from "react";
import { openDB } from "idb";

const NOTES_STORE_NAME = "notes";
const NOTES_DB_NAME = "notes_db";
const NOTES_DB_VERSION = 1;

export const NotesContext = createContext();

function NotesContextProvider(props) {
  const [notes, setNotes] = useState([]);
  const [newNoteIsOpen, setNewNoteIsOpen] = useState(false);
  const [existingNoteIsOpen, setExistingNoteIsOpen] = useState(false);
  const openNewNote = () => {
    setNewNoteIsOpen(!newNoteIsOpen);
    setSelectedNote(null);
  };

  const [selectedNote, setSelectedNote] = useState(null);
  const handleNoteClick = (note) => {
    setSelectedNote(note);
    setNewNoteIsOpen(false);
  };
  const checkingF = () => {
    console.log(notes);
  };

  useEffect(() => {
    openDB(NOTES_DB_NAME, NOTES_DB_VERSION, {
      upgrade(db) {
        db.createObjectStore(NOTES_STORE_NAME, {
          keyPath: "id",
          autoIncrement: true,
        });
      },
    })
      .then((db) => {
        const transaction = db.transaction(NOTES_STORE_NAME, "readonly");
        const store = transaction.objectStore(NOTES_STORE_NAME);
        return store.getAll();
      })
      .then((notes) => {
        setNotes(notes);
      })
      .catch((error) => {
        console.error("Failed to open notes database", error);
      });
  }, []);

  const addNote = async (note) => {
    try {
      const db = await openDB(NOTES_DB_NAME, NOTES_DB_VERSION);
      const transaction = db.transaction(NOTES_STORE_NAME, "readwrite");
      const store = transaction.objectStore(NOTES_STORE_NAME);
      const id = await store.add(note);
      setNotes([...notes, { id, ...note }]);
    } catch (error) {
      console.error("Failed to add note to database", error);
    }
  };

  const updateNote = async (note) => {
    try {
      const db = await openDB(NOTES_DB_NAME, NOTES_DB_VERSION);
      const transaction = db.transaction(NOTES_STORE_NAME, "readwrite");
      const store = transaction.objectStore(NOTES_STORE_NAME);
      await store.put(note);
      const updatedNotes = notes.map((n) => (n.id === note.id ? note : n));
      setNotes(updatedNotes);
    } catch (error) {
      console.error("Failed to update note in database", error);
    }
  };

  const deleteNote = async (id) => {
    try {
      const db = await openDB(NOTES_DB_NAME, NOTES_DB_VERSION);
      const transaction = db.transaction(NOTES_STORE_NAME, "readwrite");
      const store = transaction.objectStore(NOTES_STORE_NAME);
      await store.delete(id);
      const remainingNotes = notes.filter((note) => note.id !== id);
      setNotes(remainingNotes);
    } catch (error) {
      console.error("Failed to delete note from database", error);
    }
  };

  const contextValue = {
    checkingF,
    notes,
    addNote,
    updateNote,
    deleteNote,
    openNewNote,
    newNoteIsOpen,
    setNewNoteIsOpen,
    existingNoteIsOpen,
    setExistingNoteIsOpen,
    handleNoteClick,
    selectedNote,
    setSelectedNote

  };

  return (
    <NotesContext.Provider value={contextValue}>
      {props.children}
    </NotesContext.Provider>
  );
}

export default NotesContextProvider;
