export default function UserAnswer({ children, onAnswerClick, showAnswer }) {
  return (
    <li
      className={showAnswer ? "disabled" : ""}
      onClick={(e) => {
        onAnswerClick(e.target.textContent);
      }}
    >
      {children}
    </li>
  );
}
