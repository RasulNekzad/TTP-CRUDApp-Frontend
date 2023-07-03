import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateStudentByIdThunk } from "../../redux/student/student.actions";
import useValidatedFormInput from "../../hooks/useValidatedFormInput";
import FormInput from "../FormInput";
import axios from "axios";

const EditStudentForm = () => {
  const { studentId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const firstName = useValidatedFormInput("", /^[a-zA-Z]+[" "]*$/);
  const lastName = useValidatedFormInput("", /^[a-zA-Z]+[" "]*$/);
  const email = useValidatedFormInput(
    "",
    /^[\w-?:\/\.]+@[a-zA-Z]+\.(com|net|ru|gov|io|edu|org)+[" "]*$/
  );
  const imageUrl = useValidatedFormInput(
    "",
    /^.*\.(jpg|png|gif|webp|tiff|psd|raw|bmp|heif|indd|jpeg2000|svg)[" "]*$/
  );
  const gpa = useValidatedFormInput("", null, 0, 4.0);
  const CampusId = useValidatedFormInput("", /^[0-9]+$/);
  const [isValidForm, setIsValidForm] = useState(false);

  async function fetchStudentInfo(id) {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/student/${id}`
      );
      const studentData = response.data.student;
      firstName.setValue(studentData.firstName);
      lastName.setValue(studentData.lastName);
      email.setValue(studentData.email);
      imageUrl.setValue(studentData.imageUrl);
      gpa.setValue(studentData.gpa);
      CampusId.setValue(studentData.CampusId);
    } catch (error) {
      console.error(error);
    }
  }

  const handleSubmit = () => {
    const updatedStudent = {
      firstName: firstName.value.trim(),
      lastName: lastName.value.trim(),
      email: email.value.trim(),
      imageUrl: imageUrl.value.trim(),
      gpa: gpa.value,
      CampusId: CampusId.value,
    };
    dispatch(updateStudentByIdThunk(studentId, updatedStudent));
    navigate(`/students/${studentId}`);
  };

  useEffect(() => {
    fetchStudentInfo(studentId);
  }, []);

  useEffect(() => {
    let isValid = true;
    if (
      !firstName.isValid() ||
      !lastName.isValid() ||
      !email.isValid() ||
      !imageUrl.isValid() ||
      !gpa.isValid()
    ) {
      isValid = false;
    }
    setIsValidForm(isValid);
  }, [firstName, lastName, email, imageUrl, gpa, CampusId]);

  const handleClick = () => {
    navigate(`/students/${studentId}`);
  };

  return (
    <div className="editStudentContainer">
      <h1>Update Student</h1>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="First Name"
          type="text"
          inputProps={firstName}
          validationMessage="Invalid first name."
        />
        <FormInput
          label="Last Name"
          type="text"
          inputProps={lastName}
          validationMessage="Invalid last name."
        />
        <FormInput
          label="Email"
          type="text"
          inputProps={email}
          validationMessage="Invalid email input."
        />
        <FormInput
          label="Image URL"
          type="text"
          inputProps={imageUrl}
          validationMessage="Invalid image URL."
        />
        <FormInput
          label="GPA"
          type="text"
          inputProps={gpa}
          validationMessage="Invalid GPA input."
        />
        <FormInput
          label="Campus ID"
          type="text"
          inputProps={CampusId}
          validationMessage="Invalid Campus ID."
        />
        <button disabled={!isValidForm} type="submit">
          Update Student
        </button>
        <button onClick={handleClick}>Back</button>
      </form>
    </div>
  );
};

export default EditStudentForm;
