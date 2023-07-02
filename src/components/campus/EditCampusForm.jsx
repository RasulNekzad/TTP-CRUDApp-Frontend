import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { updateCampusByIdThunk } from "../../redux/campus/campus.actions";
import {
  fetchAllStudentsThunk,
  updateStudentByIdThunk,
} from "../../redux/student/student.actions";
import useValidatedFormInput from "../../hooks/useValidatedFormInput";
import FormInput from "../FormInput";

const EditCampusForm = () => {
  const { campusId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allStudents = useSelector((state) => state.student.allStudents);

  const name = useValidatedFormInput("", /^[a-zA-Z0-9" "]+$/);
  const imageUrl = useValidatedFormInput(
    "",
    /^.*\.(jpg|png|gif|webp|tiff|psd|raw|bmp|heif|indd|jpeg2000|svg)[" "]*$/
  );
  const address = useValidatedFormInput("", /^[0-9a-zA-Z" "]+[a-zA-Z" "]+$/);
  const description = useValidatedFormInput("", /.*/);

  const [isValidForm, setIsValidForm] = useState(false);

  async function fetchCampusInfo(id) {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/campus/${id}`
      );
      const campusData = response.data.campus;
      name.setValue(campusData.name);
      imageUrl.setValue(campusData.imageUrl);
      address.setValue(campusData.address);
      description.setValue(campusData.description);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchCampusInfo(campusId);
    dispatch(fetchAllStudentsThunk());
  }, []);

  useEffect(() => {
    let isValid = true;
    if (
      !name.isValid() ||
      !imageUrl.isValid() ||
      !address.isValid() ||
      !description.isValid()
    ) {
      isValid = false;
    }
    setIsValidForm(isValid);
  }, [name, imageUrl, address, description]);

  const handleSubmit = () => {
    const updatedCampus = {
      name: name.value.trim(),
      imageUrl: imageUrl.value,
      address: address.value.trim(),
      description: description.value.trim(),
    };
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

  const handleClick = () => {
    navigate(`/campuses/${campusId}`);
  };

  return (
    <div>
      <h1>Update Campus</h1>
      <h2>name is {name.value}</h2>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Name"
          type="text"
          placeholder={name.value}
          inputProps={name}
          validationMessage="Invalid campus name."
        />
        <FormInput
          label="Image URL"
          type="text"
          inputProps={imageUrl}
          validationMessage="Invalid image URL."
        />
        <FormInput
          label="Address"
          type="text"
          inputProps={address}
          validationMessage="Invalid address input."
        />
        <FormInput
          label="Description"
          type="text"
          inputProps={description}
          validationMessage="Invalid description input."
        />
        <button disabled={!isValidForm} type="submit">
          Update Campus
        </button>
        <button onClick={handleClick}>Back</button>
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
