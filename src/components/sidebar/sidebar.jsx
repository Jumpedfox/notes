import React, { useContext } from "react";
import "./sidebar.css";
import { NotesContext } from "../../contexts/notescontextprovider";

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
              selectedNote && selectedNote.id === listItem.id && "selected-li"
            }`}
            key={listItem.id}
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
