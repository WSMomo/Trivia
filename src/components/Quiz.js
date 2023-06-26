import { useEffect, useState } from "react";
import Answers from "./Answers";
import he from "he"; // trasforma simboli in html leggibile
import { useFetch } from "../hooks/useFetch";

export default function Quiz({ categoryUrl, setCategoryUrl }) {
  const [userAnswer, setUserAnswer] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [questionCounter, setQuestionCounter] = useState(0);
  const [countAnswer, setCountAnswer] = useState(0);
  const [countCorrectAnswer, setCountCorrectAnswer] = useState(0);
  const [data, setData] = useState([]);

  // quando l'utente clicca su una risposta setta la risposta utente e setta il showAnswer su true per visualizzarla
  function handleAnswerClick(selectedAnswer) {
    setCountAnswer(() => countAnswer + 1);

    setShowAnswer(true);
    setUserAnswer(() => selectedAnswer);
  }

  // quando si aggiorna la risposta utente restituisci il risultato
  useEffect(() => {
    function checkAnswer() {
      if (userAnswer === correctAnswer) {
        setCountCorrectAnswer(() => countCorrectAnswer + 1);
        setIsCorrectAnswer(true);
      } else {
        setIsCorrectAnswer(false);
      }
    }
    checkAnswer();
  }, [userAnswer]);

  // al caricamento della pagina cerca le domande e le riposte e salvale in data
  useFetch(setData, categoryUrl, "results");

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
  }

  return (
    <div className="main">
      {questionCounter < 9 && showAnswer && (
        <button className="next-question-button" onClick={handleChangeQuestion}>
          Next question
        </button>
      )}

      {countAnswer <= 9 ? (
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
                />
              </>
            ) : (
              <p>Loading question...</p>
            )}
          </div>

          <div className={`result ${showAnswer ? "" : "hide"}`}>
            <p>Your answer is: {userAnswer}.</p>
            <p>
              The correct answer is {correctAnswer}.{" "}
              {isCorrectAnswer ? "Good Job!" : ""}
            </p>
          </div>
        </>
      ) : (
        <>
          <div>
            You have successfully answered {countCorrectAnswer} questions
            correctly.
          </div>
          <button
            className="play-again-button"
            onClick={() => setCategoryUrl(false)}
          >
            Play again
          </button>
        </>
      )}
    </div>
  );
}
