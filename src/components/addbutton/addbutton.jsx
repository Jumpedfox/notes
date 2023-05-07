import { useContext } from "react";
import "./addbutton.css";
import { NotesContext } from "../../contexts/notescontextprovider";
 
const AddButton = () => {
  const { openNewNote } = useContext(NotesContext);
  return (
    <button onClick={openNewNote} className="add-button">
      add
    </button>
  );
};

export default AddButton;
