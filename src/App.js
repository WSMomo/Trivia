import { useEffect, useState } from "react";
import Quiz from "./components/Quiz";
import { useFetch } from "./hooks/useFetch";
import Categories from "./components/Categories";
function App() {
  const [categoryUrl, setCategoryUrl] = useState("");

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
        <Quiz categoryUrl={categoryUrl} setCategoryUrl={setCategoryUrl} />
      ) : (
        <Categories
          onCategoryUrl={handleCategoryUrl}
          categoryUrl={categoryUrl}
        />
      )}
    </div>
  );
}

export default App;
