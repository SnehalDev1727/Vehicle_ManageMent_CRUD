import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom"; // Import useNavigate

const EditVehicle = () => {
  const [carModel, setCarModel] = useState("");
  const [carMake, setCarMake] = useState("");
  const [yearOfMfg, setYearOfMfg] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const { id } = useParams();
  const navigate = useNavigate(); // Use navigate

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const response = await axios.get(`http://localhost:5205/api/vehicle/${id}`);
        const vehicle = response.data;
        setCarModel(vehicle.carModel);
        setCarMake(vehicle.carMake);
        setYearOfMfg(vehicle.yearOfMfg);
        setBasePrice(vehicle.basePrice);
      } catch (error) {
        console.error("There was an error fetching the vehicle details!", error);
      }
    };

    fetchVehicle();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedVehicle = {
        id,
      carModel,
      carMake,
      yearOfMfg,
      basePrice,
    };

    try {
      await axios.put(`http://localhost:5205/api/vehicle/${id}`, updatedVehicle);
      navigate("/"); // Use navigate to redirect
    } catch (error) {
      console.error("There was an error updating the vehicle!", error);
    }
  };

  return (
    <div>
      <h2>Edit Vehicle</h2>
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
        <button type="submit">Update Vehicle</button>
      </form>
    </div>
  );
};

export default EditVehicle;
