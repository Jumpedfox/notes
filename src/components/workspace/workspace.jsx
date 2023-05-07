import React, { useContext } from "react";
import "./workspace.css";
import NewNote from "../newnote/newnote";
import { NotesContext } from "../../contexts/notescontextprovider";
import ExistingNote from "../existingnote/existingnote";

const Workspace = () => {
  const { newNoteIsOpen, selectedNote, setSelectedNote } =
    useContext(NotesContext);

  return (
    <div className="workspace">
      {newNoteIsOpen && <NewNote />}
      {selectedNote && (
        <ExistingNote
          onClose={() => setSelectedNote(null)}
          selectedNote={selectedNote}
        ></ExistingNote>
      )}
    </div>
  );
};

export default Workspace; 
