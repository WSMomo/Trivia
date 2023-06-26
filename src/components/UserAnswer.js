export default function UserAnswer({ children, onAnswerClick }) {
  return (
    <li
      onClick={(e) => {
        onAnswerClick(e.target.textContent);
      }}
    >
      {children}
    </li>
  );
}
