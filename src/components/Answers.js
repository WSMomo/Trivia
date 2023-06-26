import UserAnswer from "./UserAnswer";
import he from "he";
export default function Answers({
  onAnswerClick,
  data,
  questionCounter,
  showAnswer,
}) {
  const answers = [
    he.decode(data[questionCounter].incorrect_answers[0]),
    he.decode(data[questionCounter].incorrect_answers[1]),
    he.decode(data[questionCounter].incorrect_answers[2]),
    he.decode(data[questionCounter].correct_answer),
  ];

  answers.sort();
  return (
    <ul className="answers">
      {answers.map((answer, index) => {
        return (
          <UserAnswer
            key={index}
            onAnswerClick={onAnswerClick}
            showAnswer={showAnswer}
          >
            {answer}
          </UserAnswer>
        );
      })}
    </ul>
  );
}
