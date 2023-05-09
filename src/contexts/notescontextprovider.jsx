import React, { createContext, useState, useEffect } from "react";
import { openDB } from "idb";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  addAllNotesRedux,
  addNoteRedux,
  removeNoteRedux,
} from "../redux/reducers/index.ts";
import { nanoid } from "nanoid";

const NOTES_STORE_NAME = "notes";
const NOTES_DB_NAME = "notes_db";
const NOTES_DB_VERSION = 1;

const API_KEY = "cuba7cQcrdOOo6WR3cTSoe";
const TABLE_ID = "dcRCoRrCjjWQ1CWPFdKYOD";
const ENTITY_ID = "cBt8oQWPDdS4oqj8oiW68l";
// const VALUE_HELPER = "ddNSkUB8nfuyoKjatdSYnM"

export const NotesContext = createContext();

function NotesContextProvider(props) {
  const dispatch = useDispatch();
  const reduxNotes = useSelector((state) => state.interfaceSlice.notes);
  const [remoteDatabaseIsOn, setRemoteDatabaseIsOn] = useState(false);

  const getRemoteNotes = async () => {
    try {
      await axios
        .get(
          `https://quintadb.com/apps/${ENTITY_ID}/dtypes/entity/${TABLE_ID}.json?rest_api_key=${API_KEY}&view=&per_page=200`
        )
        .then((response) => {
          console.log(response.data.records);
          const reworkedObject = response.data.records.map((obj) => ({
            index: obj.values.adW51WWQfdVRldOMJcJ8kL,
            text: obj.values.crWPqcW5bfW4uWmJrVuwH8,
          }));
          dispatch(addAllNotesRedux(reworkedObject));
        })
        .then(() => {
          setRemoteNotes(reduxNotes);
        });
    } catch (error) {
      console.error(error);
    }
  };

  console.log(reduxNotes);

  const [remoteNotes, setRemoteNotes] = useState([]);
  const [browserNotes, setBrowserNotes] = useState([]);
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

  const [editingIsOn, setEditingIsOn] = useState(false);
  const handleEditButton = () => {
    setEditingIsOn(!editingIsOn);
  };

  const [searchTerm, setSearchTerm] = useState("");

  const filteredNotes = notes.filter((note) =>
    note.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const toggleShowRemoveModadl = () => {
    setShowRemoveModal(!showRemoveModal);
  };

  const addNote = async (note) => {
    if (!remoteDatabaseIsOn) {
      try {
        const db = await openDB(NOTES_DB_NAME, NOTES_DB_VERSION);
        const transaction = db.transaction(NOTES_STORE_NAME, "readwrite");
        const store = transaction.objectStore(NOTES_STORE_NAME);
        const id = await store.add(note);
        setNotes([...notes, { id, ...note }]);
      } catch (error) {
        console.error("Failed to add note to database", error);
      }
    } else if (remoteDatabaseIsOn) {
      try {
        const qwe = {
          entity_id: `${ENTITY_ID}`,
            crWPqcW5bfW4uWmJrVuwH8: note.text,
            adW51WWQfdVRldOMJcJ8kL: nanoid(10)
        }
        const payload = {
          rest_api_key: API_KEY,
          values: qwe
          // values: {
          //   entity_id: "ddLJldJSjaW4ddQf1nC8og",
          //   crWPqcW5bfW4uWmJrVuwH8: note.text,
          //   adW51WWQfdVRldOMJcJ8kL: nanoid(10)
          // },
        };
        axios
          .post(
            `https://quintadb.com/apps/${ENTITY_ID}/dtypes.json`,
            payload,
            { headers: { "Content-Type": "application/json" } }
          )
          .then(() => {
            dispatch(addNoteRedux({ text: qwe.crWPqcW5bfW4uWmJrVuwH8, id: qwe.adW51WWQfdVRldOMJcJ8kL }));
          });
      } catch (error) {
        console.error("Failed to add data to remote database", error);
      }
    }
  };

  useEffect(() => {
    remoteDatabaseIsOn && setNotes(reduxNotes);
  }, [remoteDatabaseIsOn, reduxNotes]);

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
    if (!remoteDatabaseIsOn) {
      try {
        const db = await openDB(NOTES_DB_NAME, NOTES_DB_VERSION);
        const transaction = db.transaction(NOTES_STORE_NAME, "readwrite");
        const store = transaction.objectStore(NOTES_STORE_NAME);
        await store.delete(selectedNote.id);
        const remainingNotes = notes.filter(
          (note) => note.id !== selectedNote.id
        );
        setNotes(remainingNotes);
        setSelectedNote(null);
        toggleShowRemoveModadl();
      } catch (error) {
        console.error("Failed to delete note from database", error);
      }
    } else if (remoteDatabaseIsOn) {
      try {
        const noteToDeleteId = id;
        const payload = {
          rest_api_key: API_KEY,
          filters: {
            ddLJldJSjaW4ddQf1nC8og: {
              op: "=",
              value: noteToDeleteId,
            },
          },
        };
        axios
          .delete(
            "https://quintadb.com/apps/bdW41eqGHeWQy5gCkbimkq/dtypes.json",
            { headers: { "Content-Type": "application/json" }, data: payload }
          )
      } catch (error) {
        console.error("Failed to delete data from remote database", error);
      }
    }
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
        setBrowserNotes(notes);
        setNotes(notes);
      })
      .catch((error) => {
        console.error("Failed to open notes database", error);
      });
    getRemoteNotes();
  }, []);

  const contextValue = {
    notes,
    setNotes,
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
    setSelectedNote,
    editingIsOn,
    setEditingIsOn,
    handleEditButton,
    searchTerm,
    setSearchTerm,
    filteredNotes,
    showRemoveModal,
    setShowRemoveModal,
    toggleShowRemoveModadl,
    browserNotes,
    setBrowserNotes,
    remoteNotes,
    remoteDatabaseIsOn,
    setRemoteDatabaseIsOn,
    reduxNotes,
  };

  return (
    <NotesContext.Provider value={contextValue}>
      {props.children}
    </NotesContext.Provider>
  );
}

export default NotesContextProvider;
