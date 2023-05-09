import { useContext } from "react";
import { NotesContext } from "../../contexts/notescontextprovider";
import Header from "../header/header";
import Sidebar from "../sidebar/sidebar";
import Workspace from "../workspace/workspace";
import RemoveModal from "../removemodal/removemodal";

const AppWrapper = () => {
  const {
    showRemoveModal,
    browserNotes,
    setNotes,
    remoteDatabaseIsOn,
    setRemoteDatabaseIsOn,
    reduxNotes,
    newNoteIsOpen,
    setNewNoteIsOpen,
    editingIsOn,
    setEditingIsOn,
    setSelectedNote
  } = useContext(NotesContext);

  const hanldeClick = () => {
    setRemoteDatabaseIsOn(!remoteDatabaseIsOn);
    newNoteIsOpen && setNewNoteIsOpen(false);
    editingIsOn && setEditingIsOn(false)
    setSelectedNote(null);
    if (remoteDatabaseIsOn) {
      setNotes(browserNotes);
    } else {
      setNotes(reduxNotes);
    }
  };

  return (
    <div className="app-wrapper">
      {showRemoveModal && <RemoveModal />}
      <button className="switch-db-button" onClick={hanldeClick}>
        {remoteDatabaseIsOn ? "Remote" : "Browser"} DB, click to switch to {!remoteDatabaseIsOn ? "Remote" : "Browser"} DB
      </button>
      <Header />
      <div className="content-wrapper">
        <Sidebar />
        <Workspace />
      </div>
    </div>
  );
};

export default AppWrapper;
