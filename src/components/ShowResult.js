import Button from "./Button";

export function ShowResult({
  questionCounter,
  showAnswer,
  showResult,
  setShowResult,
}) {
  return (
    <>
      {questionCounter >= 9 && showAnswer && !showResult && (
        <Button
          classStyle="show-result-button"
          callback={() => setShowResult(true)}
        >
          Show result
        </Button>
      )}
    </>
  );
}
