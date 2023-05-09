import React, { createContext, useState, useEffect } from "react";
import { openDB } from "idb";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  addAllNotesRedux,
  addNoteRedux,
  editNoteRedux,
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
          const reworkedObject = response.data.records.map((obj) => ({
            index: obj.id,
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
  const toggleShowRemoveModal = () => {
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
        const payloadObj = {
          entity_id: `${TABLE_ID}`,
          crWPqcW5bfW4uWmJrVuwH8: note.text,
        };
        const payload = {
          rest_api_key: API_KEY,
          values: payloadObj,
        };
        const res = await axios.post(
          `https://quintadb.com/apps/${ENTITY_ID}/dtypes.json`,
          payload,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        if (res) {
          dispatch(
            addNoteRedux({
              text: res.data.record.values.crWPqcW5bfW4uWmJrVuwH8,
              index: res.data.record.id,
            })
          );
        }
      } catch (error) {
        console.error("Failed to add data to remote database", error);
      }
    }
  };

  useEffect(() => {
    remoteDatabaseIsOn && setNotes(reduxNotes);
  }, [remoteDatabaseIsOn, reduxNotes]);


  const updateNote = async (note) => {
    if (!remoteDatabaseIsOn) {
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
    } else if (remoteDatabaseIsOn) {
      try {
        const payload = {
          values: {
            crWPqcW5bfW4uWmJrVuwH8: note.text,
          },
        };
        await axios
          .put(
            `https://quintadb.com/apps/${ENTITY_ID}/dtypes/${selectedNote.index}.json?rest_api_key=${API_KEY}`,
            payload,
            { headers: { "Content-Type": "application/json" } }
          )
          .then(() => {
            dispatch(editNoteRedux(note));
          })
          .then(() => {
            console.log("Data updated successfully.");
          });
      } catch (error) {
        console.error("Failed to update data in remote database", error);
      }
    }
  };

  const deleteNote = async () => {
    if (!remoteDatabaseIsOn) {
      console.log(selectedNote);
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
        toggleShowRemoveModal();
      } catch (error) {
        console.error("Failed to delete note from database", error);
      }
    } else if (remoteDatabaseIsOn) {
      try {
        const payload = {};
        axios
          .delete(
            `https://quintadb.com/apps/${ENTITY_ID}/dtypes/${selectedNote.index}.json?rest_api_key=${API_KEY}`,
            { headers: { "Content-Type": "application/json" }, data: payload }
          )
          .then(() => {
            dispatch(removeNoteRedux(selectedNote.index));
            setSelectedNote(null);
            toggleShowRemoveModal();
          })
          .then(() => {
            console.log("Data deleted successfully.");
          });
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
    // getRemoteNotes();
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
    toggleShowRemoveModal,
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
