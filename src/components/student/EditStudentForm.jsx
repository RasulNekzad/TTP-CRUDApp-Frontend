import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { updateStudentByIdThunk } from "../../redux/student/student.actions";

const EditStudentForm = () => {
  const { studentId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [gpa, setGpa] = useState(0.0);
  const [CampusId, setCampusId] = useState(null);

  const updatedStudent = {
    firstName,
    lastName,
    email,
    imageUrl,
    gpa,
    CampusId,
  };

  async function fetchStudentInfo(id) {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/student/${id}`
      );
      const studentData = response.data.student;
      setFirstName(studentData.firstName);
      setLastName(studentData.lastName);
      setEmail(studentData.email);
      setImageUrl(studentData.imageUrl);
      setGpa(studentData.gpa);
      setCampusId(studentData.CampusId);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchStudentInfo(studentId);
  }, []);

  const handleSubmit = () => {
    dispatch(updateStudentByIdThunk(studentId, updatedStudent));
    navigate(`/students/${studentId}`);
  };

  return (
    <div>
      <h1>Update Student</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            onChange={(e) => setFirstName(e.target.value)}
            placeholder={firstName}
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            onChange={(e) => setLastName(e.target.value)}
            placeholder={lastName}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder={email}
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
          <label htmlFor="gpa">GPA:</label>
          <input
            type="text"
            id="gpa"
            onChange={(e) => setGpa(e.target.value)}
            placeholder={gpa}
          />
        </div>
        <div>
          <label htmlFor="CampusId">Campus ID:</label>
          <input
            type="text"
            id="CampusId"
            onChange={(e) => setCampusId(e.target.value)}
            placeholder={CampusId}
          />
        </div>
        <button type="submit">Update Campus</button>
      </form>
    </div>
  );
};

export default EditStudentForm;
