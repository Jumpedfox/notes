import "./App.css";
import Header from "./components/header/header";
import Sidebar from "./components/sidebar/sidebar";
import Workspace from "./components/workspace/workspace";
import NotesContextProvider from "./contexts/notescontextprovider";

function App() {
  return (
    <div className="App">
      <NotesContextProvider>
        <div className="app-wrapper">
          <Header />
          <div className="content-wrapper">
            <Sidebar />
            <Workspace />
          </div>
        </div>
      </NotesContextProvider>
    </div>
  );
}

export default App;
