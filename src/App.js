import { Provider } from "react-redux";
import "./App.css";
import AppWrapper from "./components/appwrapper/appwrapper";
import NotesContextProvider from "./contexts/notescontextprovider";
import {store, persistor } from "../src/redux/store.ts";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NotesContextProvider>
            <AppWrapper />
          </NotesContextProvider>
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
