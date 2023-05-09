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
    remoteDatabaseIsOn,
  } = useContext(NotesContext);

  const handleClick = (event) => {
    event.target.tagName !== "LI" &&
      event.target.tagName !== "SPAN" &&
      setSelectedNote(null);
    setNewNoteIsOpen(false);
  };

  const handleLiSelection = (listItem) => {
    if (
      !remoteDatabaseIsOn &&
      selectedNote &&
      selectedNote.id === listItem.id
    ) {
      return "selected-li";
    } else if (
      remoteDatabaseIsOn &&
      selectedNote &&
      selectedNote.index === listItem.index
    ) {
      return "selected-li";
    }
  };

  return (
    <section className="sidebar" onClick={handleClick}>
      <ul>
        {filteredNotes.map((listItem) => (
          <li
            className={`${handleLiSelection(listItem)}`}
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
