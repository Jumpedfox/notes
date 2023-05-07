import { useContext } from "react";
import { NotesContext } from "../../contexts/notescontextprovider";
import Header from "../header/header";
import Sidebar from "../sidebar/sidebar";
import Workspace from "../workspace/workspace";
import RemoveModal from "../removemodal/removemodal";

const AppWrapper = () => {
  const { showRemoveModal } = useContext(NotesContext);
  return (
    <div className="app-wrapper">
      {showRemoveModal && <RemoveModal />}
      <Header />
      <div className="content-wrapper">
        <Sidebar />
        <Workspace />
      </div>
    </div>
  );
};

export default AppWrapper;
