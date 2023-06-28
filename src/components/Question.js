import he from "he";

export function Question({ data, questionCounter }) {
  return (
    <div className="question">{he.decode(data[questionCounter].question)}</div>
  );
}
