import { useState, useEffect } from "react";
import { fetchAvailableProducts } from "../http";

export default function Products() {
  const [loadedMeals, setLoadedMeals] = useState([]);
  //   const [error, setError] = useState(false);
  useEffect(() => {
    async function fetchMeals() {
      const meals = await fetchAvailableProducts();
      setLoadedMeals(meals);
    }

    fetchMeals();
  }, []);

  //   if (error) {
  //     return <p>{error.message}</p>;
  //   }

  return (
    <div>
      <ul id="meals">
        {loadedMeals.map((meal) => (
          <li key={meal.id}>
            <p>{meal.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
