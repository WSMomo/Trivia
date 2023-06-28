import Button from "./Button";
export default function Summary({ countCorrectAnswer, onReset }) {
  return (
    <>
      <div
        className={`summary ${
          countCorrectAnswer >= 6 ? "correct-answer" : "wrong-answer"
        }`}
      >
        You have successfully answered {countCorrectAnswer} questions correctly.
      </div>
      <Button classStyle="play-again-button" callback={onReset}>
        Play again
      </Button>
    </>
  );
}
