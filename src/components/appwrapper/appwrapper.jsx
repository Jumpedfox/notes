import { useContext } from "react";
import { NotesContext } from "../../contexts/notescontextprovider";
import Header from "../header/header";
import Sidebar from "../sidebar/sidebar";
import Workspace from "../workspace/workspace";
import RemoveModal from "../removemodal/removemodal";

const AppWrapper = () => {
  const {
    notes,
    showRemoveModal,
    browserNotes,
    setNotes,
    remoteDatabaseIsOn,
    setRemoteDatabaseIsOn,
    reduxNotes,
  } = useContext(NotesContext);

  const hanldeClick = () => {
    setRemoteDatabaseIsOn(!remoteDatabaseIsOn);
    if (remoteDatabaseIsOn) {
      setNotes(browserNotes);
    } else {
      setNotes(reduxNotes);
    }
  };

  return (
    <div className="app-wrapper">
      {showRemoveModal && <RemoveModal />}
      <button onClick={hanldeClick}>
        {remoteDatabaseIsOn ? "remote" : "browser"} database
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
