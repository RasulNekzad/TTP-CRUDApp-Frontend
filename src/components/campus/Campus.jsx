import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const Campus = () => {
  const { campusId } = useParams();

  useEffect(() => console.log(campusId), []);

  const [campus, setCampus] = useState({});
  const [students, setStudents] = useState([]);

  async function fetchCampusInfo(id) {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/campus/${id}`
      );
      setCampus(response.data.campus);
      setStudents(response.data.students);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchCampusInfo(campusId);
  }, []);

  return (
    <div>
      <h1>{campusId}</h1>
      <h1>{campus.name}</h1>
      <img src={campus.imageUrl} />
      <h2>{campus.address}</h2>
      <p>{campus.description}</p>
      {students.length > 0 ? (
        students.map((student, index) => {
          return (
            <div key={index}>
              <Link to={`/students/${student.id}`}>
                {student.firstName} {student.lastName}
              </Link>
            </div>
          );
        })
      ) : (
        <h2>No students available.</h2>
      )}
    </div>
  );
};

export default Campus;
