import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import FormInput from "../FormInput";
import useValidatedFormInput from "../../hooks/useValidatedFormInput";
import { BASE_URL } from "../../Api/baseUrl";

const AddStudentForm = () => {
  const firstName = useValidatedFormInput("", /^[a-zA-Z]+[" "]*$/);
  const lastName = useValidatedFormInput("", /^[a-zA-Z]+[" "]*$/);
  const email = useValidatedFormInput(
    "",
    /^\w+@[a-zA-Z]+\.(com|net|ru|gov|io|edu|org)+[" "]*$/
  );

  const navigate = useNavigate();

  const [isValidForm, setIsValidForm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newStudent = {
      firstName: firstName.value.trim(),
      lastName: lastName.value.trim(),
      email: email.value.trim(),
    };

    axios
      .post(`${BASE_URL}/api/student`, newStudent)
      .then((response) => {
        console.log("Student created:", response.data);
      })
      .catch((error) => {
        console.error("Error creating student:", error);
      });
    navigate("/students");
  };

  useEffect(() => {
    let isValid = true;
    if (!firstName.isValid() || !lastName.isValid() || !email.isValid()) {
      isValid = false;
    }
    setIsValidForm(isValid);
  }, [firstName, lastName, email]);

  return (
    <div className="addStudentForm">
      <h2>Add a New Student</h2>
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
        <button disabled={!isValidForm} type="submit">
          Add Student
        </button>
      </form>
    </div>
  );
};

export default AddStudentForm;
