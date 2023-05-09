import React, { useContext } from "react";
import "./removemodal.css";
import { NotesContext } from "../../contexts/notescontextprovider";

const RemoveModal = () => {
  const {
    deleteNote,
    toggleShowRemoveModal,
  } = useContext(NotesContext);
  return (
    <section className="remove-modal">
      <div className="remove-modal-wrapper">
        <span>Remove the note?</span>
        <div>
          <button onClick={deleteNote}>yes</button>
          <button onClick={toggleShowRemoveModal}>no</button>
        </div>
      </div>
    </section>
  );
};

export default RemoveModal;
