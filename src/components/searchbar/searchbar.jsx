import React, { useContext } from "react";
import "./searchbar.css";
import { NotesContext } from "../../contexts/notescontextprovider";

const Searchbar = () => {
  const {
    searchTerm,
    setSearchTerm,
    setNewNoteIsOpen,
    newNoteIsOpen,
    editingIsOn,
    setEditingIsOn,
  } = useContext(NotesContext);

  const handleInputClick = () => {
    newNoteIsOpen && setNewNoteIsOpen(false);
    editingIsOn && setEditingIsOn(false);
  };
  return (
    <div onClick={() => handleInputClick()}>
      <input
        className="searchbar"
        type="text"
        placeholder="Search notes"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default Searchbar;
