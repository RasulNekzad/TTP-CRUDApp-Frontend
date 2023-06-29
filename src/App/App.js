import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Home, Students, Campuses } from "../pages";
import { Campus } from "../components";
import "./App.css";

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/students">Students</Link>
          </li>
          <li>
            <Link to="/campuses">Campuses</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/students" element={<Students />} />
        <Route path="/campuses" element={<Campuses />} />
        <Route path="/campuses/:campusId" element={<Campus />} />
        <Route path="/*" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
