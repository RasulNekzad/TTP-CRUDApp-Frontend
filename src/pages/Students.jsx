import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllStudentsThunk } from "../redux/student/student.actions";
import { StudentCompact } from "../components";

const Students = () => {
  const allStudents = useSelector((state) => state.student.allStudents);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("in students");
    dispatch(fetchAllStudentsThunk());
  }, []);

  return (
    <div>
      <h1>Students</h1>
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
    </div>
  );
};

export default Students;
