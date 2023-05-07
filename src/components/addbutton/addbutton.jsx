import { useContext } from "react";
import "./addbutton.css";
import { NotesContext } from "../../contexts/notescontextprovider";

const AddButton = () => {
  const { openNewNote, newNoteIsOpen } = useContext(NotesContext);
  return (
    <button
      onClick={openNewNote}
      className={`add-button ${newNoteIsOpen && "active-button"}`}
    >
    </button>
  ); 
};

export default AddButton;
