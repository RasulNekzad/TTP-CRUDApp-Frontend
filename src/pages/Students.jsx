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
      <h1>All Students</h1>
      <button onClick={handleClick}>Add Student</button>
      <div className="studentListDiv">
        {allStudents.map((student) => {
          console.log("im mapping this student obj:", student);
          return (
            <div key={student.id}>
              <StudentCompact student={student} />
            </div>
          );
        })}
      </div>
      {allStudents.length === 0 && (
        <h2>There are currently no registered students.</h2>
      )}
    </div>
  );
};

export default Students;
