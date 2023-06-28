import Button from "./Button";

export function NextQuestion({
  questionCounter,
  showAnswer,
  onChangeQuestion,
}) {
  return (
    <>
      {questionCounter < 9 && showAnswer && (
        <Button classStyle="next-question-button" callback={onChangeQuestion}>
          Next question
        </Button>
      )}
    </>
  );
}
