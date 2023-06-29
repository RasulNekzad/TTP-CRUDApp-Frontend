import React from "react";
import { Link } from "react-router-dom";

const StudentCompact = ({ student }) => {
  return (
    <>
      <div>
        <h1>
          <Link to={`/students/${student.id}`}>
            <div>
              {student.firstName} {student.lastName}
            </div>
          </Link>
        </h1>
      </div>
      <hr />
    </>
  );
};

export default StudentCompact;
