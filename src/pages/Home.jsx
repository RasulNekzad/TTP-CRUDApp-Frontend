import { React, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CampusCompact, StudentCompact } from "../components";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { fetchAllStudentsThunk } from "../redux/student/student.actions";
import { fetchAllCampusesThunk } from "../redux/campus/campus.actions";
import { useDispatch } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const allCampuses = useSelector((state) => state.campus.allCampuses);
  const allStudents = useSelector((state) => state.student.allStudents);
  useEffect(() => {
    dispatch(fetchAllStudentsThunk());
    dispatch(fetchAllCampusesThunk());
  }, []);

  const handleNavCampus = () => {
    navigate("/campuses");
  };
  const handleNavStudent = () => {
    navigate("/students");
  };

  return (
    <div id="homeDiv">
      <div id="homeCampusDiv">
        <button onClick={handleNavCampus} className="homeButton">
          View All Campuses
        </button>
        {allCampuses.length > 0 && allCampuses[0] && (
          <CampusCompact campus={allCampuses[0]} />
        )}
        {allCampuses.length > 0 && allCampuses[1] && (
          <CampusCompact campus={allCampuses[1]} />
        )}
        {allCampuses.length > 0 && allCampuses[2] && (
          <CampusCompact campus={allCampuses[2]} />
        )}
      </div>
      <div id="homeStudentDiv">
        <button onClick={handleNavStudent} className="homeButton">
          View All Students
        </button>
        {allStudents.length > 0 && allStudents[0] && (
          <StudentCompact student={allStudents[0]} />
        )}
        {allStudents.length > 0 && allStudents[1] && (
          <StudentCompact student={allStudents[1]} />
        )}
        {allStudents.length > 0 && allStudents[2] && (
          <StudentCompact student={allStudents[2]} />
        )}
        {allStudents.length > 0 && allStudents[3] && (
          <StudentCompact student={allStudents[3]} />
        )}
        {allStudents.length > 0 && allStudents[4] && (
          <StudentCompact student={allStudents[4]} />
        )}
      </div>
    </div>
  );
};

export default Home;
