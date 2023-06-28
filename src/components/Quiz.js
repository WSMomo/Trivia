import { useEffect, useState } from "react";
import Answers from "./Answers";
import he from "he"; // trasforma simboli in html leggibile
import { useFetch } from "../hooks/useFetch";
import Loader from "./Loader";

export default function Quiz({
  url,
  setUrl,
  selectedCategory,
  selectedDifficulty,
  setDifficultyIsDefined,
  setCategoryIsDefined,
}) {
  const [userAnswer, setUserAnswer] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [questionCounter, setQuestionCounter] = useState(0);
  const [countAnswer, setCountAnswer] = useState(0);
  const [countCorrectAnswer, setCountCorrectAnswer] = useState(0);
  const [data, setData] = useState([]);
  const [answerClassname, setAnswerClassname] = useState("");
  const [showResult, setShowResult] = useState(false);
  // quando l'utente clicca su una risposta setta la risposta utente e setta il showAnswer su true per visualizzarla
  function handleAnswerClick(selectedAnswer) {
    setCountAnswer(() => countAnswer + 1);

    setShowAnswer(true);
    setUserAnswer(() => selectedAnswer);
  }

  // quando si aggiorna la risposta utente restituisci il risultato
  useEffect(() => {
    console.log(data);
    function checkAnswer() {
      if (userAnswer === correctAnswer) {
        setCountCorrectAnswer(() => countCorrectAnswer + 1);
        setIsCorrectAnswer(true);
      } else {
        setIsCorrectAnswer(false);
      }
    }
    checkAnswer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userAnswer]);

  // al caricamento della pagina cerca le domande e le riposte e salvale in data
  useFetch(setData, url, "results");

  // aggiorna la risposta corretta al caricamento dei dati o al cambio domanda
  useEffect(() => {
    if (data.length > 0) {
      setCorrectAnswer(he.decode(data[questionCounter].correct_answer));
      console.log(data[questionCounter].question);
      console.log(data);
    }
  }, [data, questionCounter]);

  function handleChangeQuestion() {
    setShowAnswer(false);
    setCorrectAnswer(false);
    setQuestionCounter(questionCounter + 1);
    setAnswerClassname("");
  }

  function handleReset() {
    setUrl(`https://opentdb.com/api.php?amount=10&type=multiple`);
    setCategoryIsDefined(false);
    setDifficultyIsDefined(false);
  }

  return (
    <div className="body">
      <h2 className="section-title">{selectedCategory || "Random Category"}</h2>
      <h3 className="section-subtitle">{selectedDifficulty}</h3>
      <button className="return-at-home-button" onClick={handleReset}>
        Return at home
      </button>
      <div className="main">
        {questionCounter < 9 && showAnswer && (
          <button
            className="next-question-button"
            onClick={handleChangeQuestion}
          >
            Next question
          </button>
        )}
        {questionCounter >= 9 && showAnswer && (
          <button
            className="next-question-button"
            onClick={() => setShowResult(true)}
          >
            Show result
          </button>
        )}

        {!showResult ? (
          <>
            <div className="question-number">
              {questionCounter + 1}/{data.length}
            </div>
            <div>
              {data.length > 0 ? (
                <>
                  <div className="question">
                    {he.decode(data[questionCounter].question)}
                  </div>
                  <Answers
                    onAnswerClick={handleAnswerClick}
                    data={data}
                    questionCounter={questionCounter}
                    showAnswer={showAnswer}
                    correctAnswer={correctAnswer}
                    answerClassname={answerClassname}
                    setAnswerClassname={setAnswerClassname}
                  />
                </>
              ) : (
                <Loader />
              )}
            </div>

            {/* <div
              className={`result ${
                !showAnswer
                  ? "hide"
                  : isCorrectAnswer
                  ? "correct-answer"
                  : "wrong-answer"
              }`}
            >
              <p>Your answer is: {userAnswer}.</p>
              <p>
                The correct answer is {correctAnswer}.{" "}
                {isCorrectAnswer ? "Good Job!" : ""}
              </p>
            </div> */}
          </>
        ) : (
          <>
            <div
              className={`summary ${
                countCorrectAnswer >= 6 ? "correct-answer" : "wrong-answer"
              }`}
            >
              You have successfully answered {countCorrectAnswer} questions
              correctly.
            </div>
            <button className="play-again-button" onClick={handleReset}>
              Play again
            </button>
          </>
        )}
      </div>
    </div>
  );
}
