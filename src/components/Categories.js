import { useState } from "react";
import { useFetch } from "../hooks/useFetch";
export default function Categories({ onCategoryUrl, onCategory }) {
  const [categories, setCategories] = useState([]);
  useFetch(
    setCategories,
    `https://opentdb.com/api_category.php`,
    "trivia_categories"
  );

  return (
    <div>
      <h2 className="section-title">Select the category</h2>
      {categories.length > 0 ? (
        <ul className="categories">
          <li onClick={() => onCategoryUrl(null)}>Any</li>
          {categories.map((category) => {
            return (
              <li
                key={category.id}
                onClick={() => {
                  onCategoryUrl(category.id);
                  onCategory(category.name);
                }}
              >
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
