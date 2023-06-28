export function QuestionNumber({ data, questionCounter }) {
  return (
    <div className="question-number">
      {questionCounter + 1}/{data.length}
    </div>
  );
}
