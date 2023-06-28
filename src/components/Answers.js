import UserAnswer from "./UserAnswer";
import he from "he";
export default function Answers({
  onAnswerClick,
  data,
  questionCounter,
  showAnswer,
  correctAnswer,
  answerClassname,
  setAnswerClassname,
}) {
  const answers = [
    he.decode(data[questionCounter].incorrect_answers[0]),
    he.decode(data[questionCounter].incorrect_answers[1]),
    he.decode(data[questionCounter].incorrect_answers[2]),
    he.decode(data[questionCounter].correct_answer),
  ];

  function handleAnswer(answer) {
    if (answer === correctAnswer) {
      setAnswerClassname((index) =>
        index === 3 ? "correct-answer" : "wrong-answer"
      );
    } else {
      setAnswerClassname((index) =>
        index !== 3 ? "wrong-answer" : "correct-answer"
      );
    }
  }

  answers.sort();
  return (
    <ul className="answers">
      {answers.map((answer, index) => {
        return (
          <UserAnswer
            key={index}
            onAnswerClick={onAnswerClick}
            showAnswer={showAnswer}
            correctAnswer={correctAnswer}
            answerClassname={answerClassname}
            setAnswerClassname={setAnswerClassname}
            handleAnswer={handleAnswer}
          >
            {answer}
          </UserAnswer>
        );
      })}
    </ul>
  );
}
