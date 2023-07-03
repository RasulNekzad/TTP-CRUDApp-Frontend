import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Home, Campuses, Students } from "../pages";
import {
  AddCampusForm,
  AddStudentForm,
  Campus,
  Student,
  EditCampusForm,
  EditStudentForm,
} from "../components";
import "./App.css";

function App() {
  return (
    <Router>
      <nav className="navbar">
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
        <Route path="/students/:studentId" element={<Student />} />
        <Route path="/add-campus" element={<AddCampusForm />} />
        <Route path="/add-student" element={<AddStudentForm />} />
        <Route path="/edit-campus/:campusId" element={<EditCampusForm />} />
        <Route path="/edit-student/:studentId" element={<EditStudentForm />} />
        <Route path="/*" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
