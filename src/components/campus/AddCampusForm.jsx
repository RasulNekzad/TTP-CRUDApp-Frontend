import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useValidatedFormInput from "../../hooks/useValidatedFormInput";
import FormInput from "../FormInput";

const AddCampusForm = () => {
  const name = useValidatedFormInput("", /^[a-zA-Z0-9" "]+$/);
  const address = useValidatedFormInput("", /^[0-9a-zA-Z" "]+[a-zA-Z" "]+$/);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newCampus = {
      name: name.value.trim(),
      address: address.value.trim(),
    };

    axios
      .post("http://localhost:8080/api/campus", newCampus)
      .then((response) => {
        console.log("Campus created:", response.data);
      })
      .catch((error) => {
        console.error("Error creating campus:", error);
      });
    navigate("/campuses");
  };

  const [isValidForm, setIsValidForm] = useState(false);

  useEffect(() => {
    let isValid = true;
    if (!name.isValid() || !address.isValid()) {
      isValid = false;
    }
    setIsValidForm(isValid);
  }, [name, address]);

  return (
    <div>
      <h2>Add a New Campus</h2>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Name"
          type="text"
          inputProps={name}
          validationMessage="Invalid campus name."
        />
        <FormInput
          label="Address"
          type="text"
          inputProps={address}
          validationMessage="Invalid address input."
        />
        <button disabled={!isValidForm} type="submit">
          Add Campus
        </button>
      </form>
    </div>
  );
};

export default AddCampusForm;
