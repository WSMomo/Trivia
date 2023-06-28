import { useEffect, useState } from "react";
import Quiz from "./components/Quiz";
import Categories from "./components/Categories";
import Difficulty from "./components/Difficulty";

function App() {
  const [url, setUrl] = useState(
    "https://opentdb.com/api.php?amount=10&type=multiple"
  );
  const [categoryIsDefined, setCategoryIsDefined] = useState(false);
  const [difficultyIsDefined, setDifficultyIsDefined] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");

  function handleCategory(name) {
    setSelectedCategory(name);
  }

  function handleDifficulty(name) {
    setSelectedDifficulty(name);
  }

  function handleCategoryUrl(categoryId) {
    if (categoryId) {
      setUrl(() => url + `&category=${categoryId}`);
    }
    console.log(url);
    setCategoryIsDefined(true);
  }

  function handleDifficultyUrl(difficultyType) {
    if (difficultyType) {
      setUrl(() => url + `&difficulty=${difficultyType}`);
    }
    setDifficultyIsDefined(true);
    console.log(url);
  }

  useEffect(() => {
    console.log(url);
  }, [url]);

  return (
    <div className="App">
      {difficultyIsDefined || (
        <Difficulty
          onDifficultyUrl={handleDifficultyUrl}
          onDifficulty={handleDifficulty}
        />
      )}

      {difficultyIsDefined && !categoryIsDefined && (
        <Categories
          onCategoryUrl={handleCategoryUrl}
          categoryUrl={url}
          onCategory={handleCategory}
        />
      )}

      {categoryIsDefined && (
        <Quiz
          url={url}
          setUrl={setUrl}
          selectedCategory={selectedCategory}
          selectedDifficulty={selectedDifficulty}
          setDifficultyIsDefined={setDifficultyIsDefined}
          setCategoryIsDefined={setCategoryIsDefined}
        />
      )}
    </div>
  );
}

export default App;
