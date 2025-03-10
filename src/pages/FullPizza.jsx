import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const FullPizza = () => {
  const { id } = useParams();
  console.log("Current ID:", id);

  const navigate = useNavigate();

  const [pizza, setPizza] = useState();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          `https://679cf40b87618946e653f32e.mockapi.io/items/` + id
        );
        setPizza(data);
      } catch (error) {
        alert("Error: " + error.message);
        navigate("/")
      }
    }

    fetchPizza();
  }, [id, navigate]);
  return (
    <div className="container">
      {pizza ? (
        <>
          <img src={pizza.imageUrl} alt="" />
          <h2>{pizza.title}</h2>
          <h4>{pizza.price} $</h4>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default FullPizza;
