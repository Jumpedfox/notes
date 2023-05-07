import React, { useContext } from "react";
import "./removebutton.css";
import { NotesContext } from "../../contexts/notescontextprovider";

const RemoveButton = () => {
  const { selectedNote, toggleShowRemoveModadl } = useContext(NotesContext);
  return (
    <button className="remove-button" disabled={!selectedNote} onClick={toggleShowRemoveModadl}>
      rem
    </button>
  );
};

export default RemoveButton;
