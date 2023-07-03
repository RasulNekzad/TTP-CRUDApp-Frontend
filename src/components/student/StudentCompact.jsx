import React from "react";
import { Link } from "react-router-dom";
import { deleteStudentByIdThunk } from "../../redux/student/student.actions";
import { useDispatch } from "react-redux";

const StudentCompact = ({ student }) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(deleteStudentByIdThunk(student.id));
  };

  return (
    <>
      <div>
        <h1 className="studentCompact">
          <Link to={`/students/${student.id}`}>
            <div>
              {student.firstName} {student.lastName}
            </div>
          </Link>
          <button onClick={handleClick}>X</button>
        </h1>
      </div>
      <hr style={{ backgroundColor: "red", height: "1px", border: "none" }} />
    </>
  );
};

export default StudentCompact;
