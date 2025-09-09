import { SearchBar } from "./components/SearchBar";
import { Dashboard } from "./components/Dashboard";
import "./scss/main.scss";
function App() {
  return (
    <>
      <div className="layout">
        <header>
          <SearchBar />
        </header>
        <main>
          <Dashboard />
        </main>
      </div>
    </>
  );
}

export default App;
