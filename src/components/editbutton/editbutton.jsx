import React, { useContext } from "react";
import "./editbutton.css";
import { NotesContext } from "../../contexts/notescontextprovider";

const EditButton = () => {
  const {checkingF} = useContext(NotesContext)
  return <button onClick={checkingF} className="edit-button">edi</button>;
};

export default EditButton;
