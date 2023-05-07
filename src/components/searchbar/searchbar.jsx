import React, { useContext } from "react";
import "./searchbar.css";
import { NotesContext } from "../../contexts/notescontextprovider";

const Searchbar = () => {
  const { searchTerm, setSearchTerm } = useContext(NotesContext);
  return (
    <div>
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
