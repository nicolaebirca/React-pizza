import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();
  const { id } = useParams();
  const navigate = useNavigate();


  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          `https://679cf40b87618946e653f32e.mockapi.io/items/` + id
        );
        setPizza(data);
      } catch (error) {
        alert("Pizzas not finded");
        navigate("/")
      }
    }

    fetchPizza();
  }, [id, navigate]);

  if (!pizza) {
    return <>Loading...</>
  }

  return (
    <div className="container">
          <img src={pizza.imageUrl} alt={pizza.title} />
          <h2>{pizza.title}</h2>
          <h4>{pizza.price} $</h4>
        
    </div>
  );
};

export default FullPizza;
