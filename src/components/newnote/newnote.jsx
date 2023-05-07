import React, { useContext, useEffect, useRef } from "react";
import "./newnote.css";
import { NotesContext } from "../../contexts/notescontextprovider";

const NewNote = () => {
  const { addNote } = useContext(NotesContext);
  const noteRef = useRef("");

  const handleAddNote = () => {
    addNote({ text: noteRef.current });
  };

  const handleInputChange = (event) => {
    noteRef.current = event.target.value;
  };

  useEffect(() => {
    return () => {
      handleAddNote();
    };
  }, []);

  return (
    <div className="new-note">
      <textarea name="note" onChange={handleInputChange}></textarea>
    </div>
  );
};

export default NewNote;