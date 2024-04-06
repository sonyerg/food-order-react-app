import { useState, useEffect } from "react";
import { fetchAvailableMeals } from "../http";
import MealItem from "./MealItem";

export default function Meals() {
  const [loadedMeals, setLoadedMeals] = useState([]);
  //   const [error, setError] = useState(false);
  useEffect(() => {
    async function fetchMeals() {
      const meals = await fetchAvailableMeals();
      setLoadedMeals(meals);
    }

    fetchMeals();
  }, []);

  //   if (error) {
  //     return <p>{error.message}</p>;
  //   }

  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}
