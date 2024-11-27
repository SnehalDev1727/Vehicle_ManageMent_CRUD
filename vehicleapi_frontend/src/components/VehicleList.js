import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const VehicleList = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const response = await axios.get("http://localhost:5205/api/vehicle");
      setVehicles(response.data);
    } catch (error) {
      console.error("There was an error fetching the vehicles!", error);
    }
  };

  const deleteVehicle = async (id) => {
    try {
      await axios.delete(`http://localhost:5205/api/vehicle/${id}`);
      fetchVehicles(); // Refresh the list after deletion
    } catch (error) {
      console.error("There was an error deleting the vehicle!", error);
    }
  };

  return (
    <div>
      <h2>Vehicle List</h2>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Car Model</th>
            <th>Car Make</th>
            <th>Year of Manufacture</th>
            <th>Base Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle) => (
            <tr key={vehicle.id}>
              <td>{vehicle.id}</td>
              <td>{vehicle.carModel}</td>
              <td>{vehicle.carMake}</td>
              <td>{vehicle.yearOfMfg}</td>
              <td>{vehicle.basePrice}</td>
              <td>
                <Link to={`/edit/${vehicle.id}`}>Edit</Link> |{" "}
                <button onClick={() => deleteVehicle(vehicle.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <Link to="/add">Add New Vehicle</Link>
    </div>
  );
};

export default VehicleList;
