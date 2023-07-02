import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateStudentByIdThunk } from "../../redux/student/student.actions";
import useValidatedFormInput from "../../hooks/useValidatedFormInput";
import FormInput from "../FormInput";
import { useLocation } from "react-router-dom";

const EditStudentForm = () => {
  const location = useLocation();
  const { student } = location.state;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const firstName = useValidatedFormInput(
    student.firstName,
    /^[a-zA-Z]+[" "]*$/
  );
  const lastName = useValidatedFormInput(student.lastName, /^[a-zA-Z]+[" "]*$/);
  const email = useValidatedFormInput(
    student.email,
    /^[\w-?:\/\.]+@[a-zA-Z]+\.(com|net|ru|gov|io|edu)+[" "]*$/
  );
  const imageUrl = useValidatedFormInput(
    student.imageUrl,
    /^.*\.(jpg|png|gif|webp|tiff|psd|raw|bmp|heif|indd|jpeg2000|svg)[" "]*$/
  );
  const gpa = useValidatedFormInput(student.gpa, null, 0, 4.0);
  const CampusId = useValidatedFormInput(student.CampusId, /^[0-9]+$/);

  const updatedStudent = {
    firstName: firstName.value.trim(),
    lastName: lastName.value.trim(),
    email: email.value.trim(),
    imageUrl: imageUrl.value.trim(),
    gpa: gpa.value,
    CampusId: CampusId.value,
  };

  const [isValidForm, setIsValidForm] = useState(false);

  useEffect(() => {
    let isValid = true;
    if (
      !firstName.isValid() ||
      !lastName.isValid() ||
      !email.isValid() ||
      !imageUrl.isValid() ||
      !gpa.isValid() ||
      !CampusId.isValid()
    ) {
      isValid = false;
    }
    setIsValidForm(isValid);
  }, [firstName, lastName, email]);

  const handleSubmit = () => {
    dispatch(updateStudentByIdThunk(student.id, updatedStudent));
    navigate(`/students/${student.id}`);
  };

  return (
    <div>
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
          Update Campus
        </button>
      </form>
    </div>
  );
};

export default EditStudentForm;
