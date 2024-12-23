import { BrowserRouter as Router, Routes, Route } from "react-router";
import Home from "./pages/Home.tsx";
import Active from "./pages/Active.tsx";
import Completed from "./pages/Completed.tsx";
import { PageLayout } from "./layouts/PageLayout.tsx";

function App() {
  return (
    <Router>
      <PageLayout>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/active" element={<Active />}></Route>
          <Route path="/completed" element={<Completed />}></Route>
        </Routes>
      </PageLayout>
    </Router>
  );
}

export default App;
