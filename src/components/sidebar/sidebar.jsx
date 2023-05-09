import React, { useContext } from "react";
import "./sidebar.css";
import { NotesContext } from "../../contexts/notescontextprovider";
import { nanoid } from "nanoid";

const Sidebar = () => {
  const {
    handleNoteClick,
    filteredNotes,
    setSelectedNote,
    selectedNote,
    setNewNoteIsOpen,
  } = useContext(NotesContext);

  const handleClick = (event) => {
    event.target.tagName !== "LI" &&
      event.target.tagName !== "SPAN" &&
      setSelectedNote(null);
    setNewNoteIsOpen(false);
  };

  return (
    <section className="sidebar" onClick={handleClick}>
      <ul>
        {filteredNotes.map((listItem) => (
          <li
            className={`${
              selectedNote && selectedNote.index === listItem.index && "selected-li"
            }`}
            key={nanoid(4)}
            onClick={() => handleNoteClick(listItem)}
          >
            <span>
              {listItem.text.length <= 20
                ? listItem.text
                : listItem.text.substring(0, 20) + "..."}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Sidebar;
