import UserAnswer from "./UserAnswer";
import he from "he";
export default function Answers({ onAnswerClick, data, questionCounter }) {
  return (
    <ul className="answers">
      <UserAnswer onAnswerClick={onAnswerClick}>
        {he.decode(data[questionCounter].incorrect_answers[0])}
      </UserAnswer>
      <UserAnswer onAnswerClick={onAnswerClick}>
        {he.decode(data[questionCounter].incorrect_answers[1])}
      </UserAnswer>
      <UserAnswer onAnswerClick={onAnswerClick}>
        {he.decode(data[questionCounter].incorrect_answers[2])}
      </UserAnswer>
      <UserAnswer onAnswerClick={onAnswerClick}>
        {he.decode(data[questionCounter].correct_answer)}
      </UserAnswer>
    </ul>
  );
}
