import React, { useContext } from "react";
import "./removebutton.css";
import { NotesContext } from "../../contexts/notescontextprovider";

const RemoveButton = () => {
  const { deleteNote } = useContext(NotesContext);
  return (
    <button className="remove-button" onClick={deleteNote}>
      rem
    </button>
  );
};

export default RemoveButton;
