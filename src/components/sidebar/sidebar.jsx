import React, { useContext } from "react";
import "./sidebar.css";
import { NotesContext } from "../../contexts/notescontextprovider";

const Sidebar = () => {
  const { handleNoteClick, filteredNotes, setSelectedNote } =
    useContext(NotesContext);

  const handleClick = (event) => {
    event.target.tagName !== "LI" &&
      event.target.tagName !== "SPAN" &&
      setSelectedNote(null)
  };

  return (
    <section className="sidebar" onClick={handleClick}>
      <ul>
        {filteredNotes.map((note) => (
          <li key={note.id} onClick={() => handleNoteClick(note)}>
            <span>{note.text.substring(0, 20)}...</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Sidebar;
