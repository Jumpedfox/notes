import "./App.css";
import AppWrapper from "./components/appwrapper/appwrapper";
import NotesContextProvider from "./contexts/notescontextprovider";

function App() {
  return (
    <div className="App">
      <NotesContextProvider>
        <AppWrapper />
      </NotesContextProvider>
    </div>
  );
}

export default App;
