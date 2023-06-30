import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddCampusForm = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState({
    name: null,
    address: null,
  });
  const navigate = useNavigate();

  const namePattern = /^[a-zA-Z]+$/;
  const addressPattern = /^[0-9a-zA-Z" "]+[a-zA-Z" "]+$/;

  useEffect(() => {
    if (!namePattern.test(name) && name.length !== 0) {
      setErrors({ ...errors, name: "Invalid name input" });
    } else {
      setErrors({ ...errors, name: null });
    }
  }, [name]);

  useEffect(() => {
    if (!addressPattern.test(address) && address.length !== 0) {
      setErrors({ ...errors, address: "Invalid address input" });
    } else {
      setErrors({ ...errors, address: null });
    }
  }, [address]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newCampus = {
      name,
      address,
    };

    for (const key in errors) {
      if (errors[key] !== null) {
        console.log(`Error found with ${key}, can't submit`);
        return;
      }
    }

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
            required
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <button type="submit">Add Campus</button>
        {errors && (
          <>
            {" "}
            {errors["name"] && <h3>Invalid name input!</h3>}
            {errors["address"] && <h3>Invalid address input!</h3>}
          </>
        )}
      </form>
    </div>
  );
};

export default AddCampusForm;
