import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const AddVehicle = () => {
  const [carModel, setCarModel] = useState("");
  const [carMake, setCarMake] = useState("");
  const [yearOfMfg, setYearOfMfg] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const navigate = useNavigate(); // Use navigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newVehicle = {
      carModel,
      carMake,
      yearOfMfg,
      basePrice,
    };

    try {
      await axios.post("http://localhost:5205/api/vehicle", newVehicle);
      navigate("/"); // Use navigate to redirect
    } catch (error) {
      console.error("There was an error adding the vehicle!", error);
    }
  };

  return (
    <div>
      <h2>Add Vehicle</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Car Model:</label>
          <input
            type="text"
            value={carModel}
            onChange={(e) => setCarModel(e.target.value)}
          />
        </div>
        <div>
          <label>Car Make:</label>
          <input
            type="text"
            value={carMake}
            onChange={(e) => setCarMake(e.target.value)}
          />
        </div>
        <div>
          <label>Year of Manufacture:</label>
          <input
            type="number"
            value={yearOfMfg}
            onChange={(e) => setYearOfMfg(e.target.value)}
          />
        </div>
        <div>
          <label>Base Price:</label>
          <input
            type="number"
            value={basePrice}
            onChange={(e) => setBasePrice(e.target.value)}
          />
        </div>
        <button type="submit">Add Vehicle</button>
      </form>
    </div>
  );
};

export default AddVehicle;
