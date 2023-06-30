import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddStudentForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({
    email: null,
    firstName: null,
    lastName: null,
  });
  const navigate = useNavigate();

  const emailPattern = /^\w+@[a-zA-Z]+\.(com|net|ru|gov|io|edu)+$/;
  const firstNamePattern = /^[a-zA-Z]+$/;
  const lastNamePattern = /^[a-zA-Z]+$/;

  useEffect(() => {
    // ERRORS: {email: null ...}
    if (!emailPattern.test(email) && email.length !== 0) {
      setErrors({ ...errors, email: "Invalid email input" });
    } else {
      // Cleanup previous email errors
      setErrors({ ...errors, email: null });
    }
  }, [email]);

  useEffect(() => {
    if (!firstNamePattern.test(firstName) && firstName.length !== 0) {
      setErrors({ ...errors, firstName: "Invalid first name input" });
    } else {
      setErrors({ ...errors, firstName: null });
    }
  }, [firstName]);

  useEffect(() => {
    if (!lastNamePattern.test(lastName) && lastName.length !== 0) {
      setErrors({ ...errors, lastName: "Invalid last name input" });
    } else {
      setErrors({ ...errors, lastName: null });
    }
  }, [lastName]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(errors);
    const newStudent = {
      firstName,
      lastName,
      email,
    };

    for (const key in errors) {
      if (errors[key] !== null) {
        console.log(`Error found with ${key}, can't submit`);
        return;
      }
    }

    axios
      .post("http://localhost:8080/api/student", newStudent)
      .then((response) => {
        console.log("Student created:", response.data);
      })
      .catch((error) => {
        console.error("Error creating student:", error);
      });
    navigate("/students");
  };

  return (
    <div>
      <h2>Add a New Student</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            required
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            required
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit">Add Student</button>
        {errors && (
          <>
            {errors["email"] && <h3>Invalid email input!</h3>}
            {errors["firstName"] && <h3>Invalid first name input!</h3>}
            {errors["lastName"] && <h3>Invalid last name input!</h3>}
          </>
        )}
      </form>
    </div>
  );
};

export default AddStudentForm;
