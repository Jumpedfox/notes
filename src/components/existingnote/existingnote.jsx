import React, { useContext, useState, useEffect } from "react";
import "./existingnote.css";
import { NotesContext } from "../../contexts/notescontextprovider";

const ExistingNote = () => {
  const { selectedNote, updateNote, editingIsOn, setEditingIsOn } = useContext(NotesContext);
  const [text, setText] = useState(selectedNote.text);

  useEffect(() => {
    setText(selectedNote.text);
  }, [selectedNote.text]);

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleBlur = () => {
    updateNote({
      ...selectedNote,
      text: text,
    });
    setEditingIsOn(false)
  };

  return (
    <div className="existing-note">
      <textarea disabled={!editingIsOn}  value={text} onChange={handleTextChange} onBlur={handleBlur} />
    </div>
  );
};

export default ExistingNote;