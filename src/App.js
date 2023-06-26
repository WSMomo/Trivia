import { useEffect, useState } from "react";
import Quiz from "./components/Quiz";
import Categories from "./components/Categories";
function App() {
  const [categoryUrl, setCategoryUrl] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  function handleCategory(name) {
    setSelectedCategory(name);
  }

  function handleCategoryUrl(id) {
    if (id === null) {
      setCategoryUrl(`https://opentdb.com/api.php?amount=10&type=multiple`);
      return;
    }
    setCategoryUrl(
      () => `https://opentdb.com/api.php?amount=10&category=${id}&type=multiple`
    );
  }

  useEffect(() => {
    console.log(categoryUrl);
  }, [categoryUrl]);

  return (
    <div className="App">
      {categoryUrl ? (
        <Quiz
          categoryUrl={categoryUrl}
          setCategoryUrl={setCategoryUrl}
          selectedCategory={selectedCategory}
        />
      ) : (
        <Categories
          onCategoryUrl={handleCategoryUrl}
          categoryUrl={categoryUrl}
          onCategory={handleCategory}
        />
      )}
    </div>
  );
}

export default App;
