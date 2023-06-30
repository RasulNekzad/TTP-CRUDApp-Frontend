import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddCampusForm = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newCampus = {
      name,
      address,
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

  return (
    <div>
      <h2>Add a New Campus</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <button type="submit">Add Campus</button>
      </form>
    </div>
  );
};

export default AddCampusForm;
