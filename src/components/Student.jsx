import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const Student = () => {
  const { studentId } = useParams();

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
    console.log("mounting student WITH ID:::::", studentId);
    fetchStudentInfo(studentId);
  }, []);

  return (
    <div>
      <h1>
        {student.firstName} {student.lastName}
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
