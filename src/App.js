import "./App.css";
import Sidebar from "./sidebar/sidebar";
import Header from "./header/header.jsx";
import Workspace from "./workspace/workspace.jsx";

function App() {
  return (
    <div className="App">
      <div className="app-wrapper">
        <Header />
        <div className="content-wrapper">
          <Sidebar />
          <Workspace />
        </div>
      </div>
    </div>
  );
}

export default App;
