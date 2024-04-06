import { currencyFormatter } from "../util/formatting";

export default function MealItem({ meal }) {
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
          <button>Add to cart</button>
        </p>
      </article>
    </li>
  );
}
