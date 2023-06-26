import { useState } from "react";
import { useFetch } from "../hooks/useFetch";
export default function Categories({ onCategoryUrl }) {
  const [categories, setCategories] = useState([]);
  useFetch(
    setCategories,
    `https://opentdb.com/api_category.php`,
    "trivia_categories"
  );

  return (
    <div>
      {categories.length > 0 ? (
        <ul className="categories">
          <li onClick={() => onCategoryUrl(null)}>Any</li>
          {categories.map((category) => {
            return (
              <li key={category.id} onClick={() => onCategoryUrl(category.id)}>
                {category.name}
              </li>
            );
          })}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
