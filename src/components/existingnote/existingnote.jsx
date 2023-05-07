import React, { useContext } from "react";
import "./existingnote.css";
import { NotesContext } from "../../contexts/notescontextprovider";

const ExistingNote = ({selectedNote}) => {

  return (
    <div className="new-note">
      <span>{selectedNote.text}</span>
    </div>
  );
};

export default ExistingNote;
