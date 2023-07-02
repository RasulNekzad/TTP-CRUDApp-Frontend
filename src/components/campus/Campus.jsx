import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { deleteStudentByIdThunk } from "../../redux/student/student.actions";
import { deleteCampusByIdThunk } from "../../redux/campus/campus.actions";
import { updateStudentByIdThunk } from "../../redux/student/student.actions";

const Campus = () => {
  const allStudents = useSelector((state) => state.student.allStudents);
  const { campusId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    dispatch(deleteCampusByIdThunk(campusId));
    navigate("/campuses");
  };

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
    console.log("fetching campus info");
    fetchCampusInfo(campusId);
  }, []);

  useEffect(() => {
    fetchCampusInfo(campusId);
  }, [allStudents]);

  const handleRemove = async (studentId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/student/${studentId}`
      );
      const student = response.data.student;
      student.CampusId = null;
      dispatch(updateStudentByIdThunk(studentId, student));
    } catch (error) {
      console.log(error);
    }
  };

  if (!campus["name"]) {
    return <h1>Invalid Campus ID.</h1>;
  }

  return (
    <div>
      <h1>
        {campus.name}
        <button onClick={handleClick}>delete</button>
        <Link to={`/edit-campus/${campusId}`}>edit</Link>
      </h1>
      <img src={campus.imageUrl} />
      <h2>{campus.address}</h2>
      <p>{campus.description}</p>
      <h2>Enrolled Students</h2>
      {students.length > 0 ? (
        students.map((student, index) => {
          return (
            <div key={index}>
              <Link to={`/students/${student.id}`}>
                {student.firstName} {student.lastName}
              </Link>
              <button
                onClick={() => {
                  handleRemove(student.id);
                }}
              >
                remove
              </button>
            </div>
          );
        })
      ) : (
        <h2>No enrolled students.</h2>
      )}
    </div>
  );
};

export default Campus;
