export default function Difficulty({ onDifficultyUrl, onDifficulty }) {
  const difficultyTypes = ["Easy", "Medium", "Hard"];
  return (
    <div>
      <h2 className="section-title">Select the difficulty</h2>
      <ul className="difficulties">
        {difficultyTypes.map((diff) => {
          return (
            <li
              key={diff}
              onClick={() => {
                onDifficultyUrl(diff.toLowerCase());
                console.log(diff.toLocaleLowerCase());
                onDifficulty(diff);
              }}
            >
              {diff}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
