import React, { useContext } from "react";
import "./removebutton.css";
import { NotesContext } from "../../contexts/notescontextprovider";

const RemoveButton = () => {
  const { selectedNote, toggleShowRemoveModal } = useContext(NotesContext);
  return (
    <button
      className="remove-button"
      disabled={!selectedNote}
      onClick={toggleShowRemoveModal}
    ></button>
  );
};

export default RemoveButton;
