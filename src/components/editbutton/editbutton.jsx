import React, { useContext } from "react";
import "./editbutton.css";
import { NotesContext } from "../../contexts/notescontextprovider";

const EditButton = () => {
  const {selectedNote, handleEditButton, editingIsOn} = useContext(NotesContext)
  return <button disabled={!selectedNote} onClick={handleEditButton} className={`edit-button ${editingIsOn && "active-button"}`}>edi</button>;
};

export default EditButton;
