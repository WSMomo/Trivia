export default function UserAnswer({
  children,
  onAnswerClick,
  showAnswer,
  correctAnswer,
  answerClassname,
  handleAnswer,
}) {
  const handleClick = (e) => {
    if (!showAnswer) {
      onAnswerClick(e.target.textContent);
      handleAnswer(e.target.textContent);
    }
  };

  const isCorrectAnswer = children === correctAnswer;
  const displayClassname =
    showAnswer && isCorrectAnswer ? "correct-answer" : answerClassname;

  return (
    <li
      className={`answer-elem ${displayClassname} ${
        showAnswer ? "disabled" : ""
      }`}
      onClick={handleClick}
    >
      {children}
    </li>
  );
}
