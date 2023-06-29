import React, { useState } from "react";

const AddCampusForm = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newCampus = {
      name,
      address,
    };

    setName("");
    setAddress("");
  };

  //   const queryParams = new URLSearchParams(newCampus).toString();

  //   // Perform the desired action with the new campus data (e.g., send it to the backend)
  //   fetch(`http://localhost:8080/api/campus?${queryParams}`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       // Handle the response from the backend
  //       console.log('Response:', data);
  //       // Reset the form fields
  //       setName('');
  //       setAddress('');
  //     })
  //     .catch((error) => {
  //       // Handle any errors that occurred during the request
  //       console.error('Error:', error);
  //     });
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
