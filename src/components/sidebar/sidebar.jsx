import React, { useContext } from "react";
import "./sidebar.css";
import { NotesContext } from "../../contexts/notescontextprovider";

const Sidebar = () => {
  const { notes, handleNoteClick } = useContext(NotesContext);

  return (
    <section className="sidebar">
      <ul>
        {notes.map((note) => (
          <li key={note.id} onClick={() => handleNoteClick(note)}>
            <span>{note.text.substring(0, 20)}...</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Sidebar;
