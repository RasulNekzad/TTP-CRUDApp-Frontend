import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { updateCampusByIdThunk } from "../../redux/campus/campus.actions";
import {
  fetchAllStudentsThunk,
  updateStudentByIdThunk,
} from "../../redux/student/student.actions";

const EditCampusForm = () => {
  const { campusId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allStudents = useSelector((state) => state.student.allStudents);

  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const updatedCampus = {
    name,
    imageUrl,
    address,
    description,
  };

  async function fetchCampusInfo(id) {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/campus/${id}`
      );
      const campusData = response.data.campus;
      setName(campusData.name);
      setImageUrl(campusData.imageUrl);
      setAddress(campusData.address);
      setDescription(campusData.description);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchCampusInfo(campusId);
  }, []);

  useEffect(() => {
    dispatch(fetchAllStudentsThunk());
  }, []);

  const handleSubmit = () => {
    dispatch(updateCampusByIdThunk(campusId, updatedCampus));
    navigate(`/campuses/${campusId}`);
  };

  const handleAdd = async (studentId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/student/${studentId}`
      );
      const student = response.data.student;
      student.CampusId = campusId;
      dispatch(updateStudentByIdThunk(studentId, student));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Update Campus</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            onChange={(e) => setName(e.target.value)}
            placeholder={name}
          />
        </div>
        <div>
          <label htmlFor="imageUrl">Image URL:</label>
          <input
            type="text"
            id="imageUrl"
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder={imageUrl}
          />
        </div>
        <div>
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            onChange={(e) => setAddress(e.target.value)}
            placeholder={address}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            onChange={(e) => setDescription(e.target.value)}
            placeholder={description}
          />
        </div>
        <button type="submit">Update Campus</button>
      </form>
      <h1>Students Not Enrolled In Any Campus</h1>
      {allStudents.filter((s) => !s.CampusId).length > 0 ? (
        allStudents.map((student, index) => {
          if (student.CampusId === null) {
            return (
              <div key={index}>
                <h2>
                  {student.firstName} {student.lastName}
                  <button
                    onClick={() => {
                      handleAdd(student.id);
                    }}
                  >
                    add
                  </button>
                </h2>
              </div>
            );
          }
        })
      ) : (
        <h2>No students available.</h2>
      )}
    </div>
  );
};

export default EditCampusForm;
