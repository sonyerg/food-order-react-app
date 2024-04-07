import { currencyFormatter } from "../util/formatting";
import Button from "./UI/Button";

export default function MealItem({ meal, onSelectMeal }) {
  const formattedCurrency = currencyFormatter.format(meal.price);

  return (
    <li className="meal-item">
      <article>
        <img
          src={`http://localhost:3000/${meal.image}`}
          alt={meal.description}
        />
        <div>
          <h3>{meal.name}</h3>
          <p className="meal-item-price">{formattedCurrency}</p>
          <p className="meal-item-description">{meal.description}</p>
        </div>
        <p className="meal-item-actions">
          <Button onClick={() => onSelectMeal(meal)}>Add to Cart</Button>
        </p>
      </article>
    </li>
  );
}
