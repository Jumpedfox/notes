import React, { useContext } from "react";
import "./removebutton.css";
import { NotesContext } from "../../contexts/notescontextprovider";

const RemoveButton = () => {
  const { deleteNote, selectedNote } = useContext(NotesContext);
  return (
    <button className="remove-button" disabled={!selectedNote} onClick={deleteNote}>
      rem
    </button>
  );
};

export default RemoveButton;
