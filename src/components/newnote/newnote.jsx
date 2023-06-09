import React, { useContext, useEffect, useRef } from "react";
import "./newnote.css";
import { NotesContext } from "../../contexts/notescontextprovider";

const NewNote = () => {
  const { addNote } = useContext(NotesContext);
  const noteRef = useRef("");

  const handleAddNote = () => {
    noteRef.current.length > 0 && addNote({ text: noteRef.current });
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
      <textarea placeholder="Your note..." name="note" onChange={handleInputChange} ></textarea>
    </div>
  );
};

export default NewNote;
