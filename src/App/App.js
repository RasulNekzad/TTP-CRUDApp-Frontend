import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Home, Students, Campuses } from "../pages";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/students" element={<Students />} />
        <Route path="/campuses" element={<Campuses />} />
        <Route path="/*" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
