import MealItem from "./MealItem";
import useHttp from "../hooks/useHttp";
import Error from "./Error";

const requestConfig = {};

export default function Meals() {
  // const [loadedMeals, setLoadedMeals] = useState([]);
  //   const [error, setError] = useState(false);
  // useEffect(() => {
  //   async function fetchMeals() {
  //     const meals = await fetchAvailableMeals();
  //     setLoadedMeals(meals);
  //   }

  //   fetchMeals();
  // }, []);

  //   if (error) {
  //     return <p>{error.message}</p>;
  //   }

  const {
    data: loadedMeals,
    isLoading,
    error,
  } = useHttp("http://localhost:3000/meals", requestConfig, []);

  if (isLoading) {
    return <p className="center">Fetching meals...</p>;
  }

  if (error) {
    return <Error title="Failed to fetch meals." message={error} />;
  }

  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}
