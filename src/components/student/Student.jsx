import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import { deleteStudentByIdThunk } from "../../redux/student/student.actions";

const Student = () => {
  const { studentId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = () => {
    dispatch(deleteStudentByIdThunk(studentId));
    navigate("/students");
  };

  useEffect(() => console.log(studentId), []);

  const [student, setStudent] = useState({});
  const [campus, setCampus] = useState({});

  async function fetchStudentInfo(id) {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/student/${id}`
      );
      setStudent(response.data.student);
      setCampus(response.data.campus);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchStudentInfo(studentId);
  }, []);

  return (
    <div>
      <h1>
        {student.firstName} {student.lastName}
        <button onClick={handleClick}>delete</button>
        <Link to={`/edit-student/${studentId}`} state={{ student: student }}>
          edit
        </Link>
      </h1>
      <img src={student.imageUrl} />
      <h2>
        {student.email}
        <br />
        {student.gpa}
      </h2>
      {campus ? (
        <Link to={`/campuses/${campus.id}`}>
          <h2>{campus.name}</h2>
        </Link>
      ) : (
        <h2>
          {student.firstName} {student.lastName} does not belong to a campus.
        </h2>
      )}
    </div>
  );
};

export default Student;
