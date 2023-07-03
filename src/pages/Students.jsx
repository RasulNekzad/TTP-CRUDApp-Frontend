import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllStudentsThunk } from "../redux/student/student.actions";
import { StudentCompact } from "../components";
import { useNavigate } from "react-router-dom";

const Students = () => {
  const allStudents = useSelector((state) => state.student.allStudents);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("in students");
    dispatch(fetchAllStudentsThunk());
  }, []);

  const handleClick = () => {
    navigate("/add-student");
  };

  return (
    <div>
      <div className="studentsHeader">
        <h1 style={{ fontSize: "50px" }}>All Students</h1>
        <button onClick={handleClick} className="addButton">
          Add Student
        </button>
      </div>
      <div className="studentListContainer">
        {allStudents
          .sort((a, b) => a.id - b.id)
          .map((student) => {
            console.log("im mapping this student obj:", student);
            return (
              <div key={student.id}>
                <StudentCompact student={student} />
              </div>
            );
          })}
      </div>
      {allStudents.length === 0 && (
        <h2 style={{ textAlign: "center" }}>
          There are currently no registered students.
        </h2>
      )}
    </div>
  );
};

export default Students;
