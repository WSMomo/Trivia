import { useEffect, useState } from "react";
import Answers from "./Answers";
import he from "he"; // trasforma simboli in html leggibile

export default function Quiz() {
  const [userAnswer, setUserAnswer] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [questionCounter, setQuestionCounter] = useState(0);
  const [data, setData] = useState([]);

  // quando l'utente clicca su una risposta setta la risposta utente e setta il showAnswer su true per visualizzarla
  function handleAnswerClick(selectedAnswer) {
    setShowAnswer(true);
    setUserAnswer(() => selectedAnswer);
  }

  // quando si aggiorna la risposta utente restituisci il risultato
  useEffect(() => {
    function checkAnswer() {
      if (userAnswer === correctAnswer) {
        setIsCorrectAnswer(true);
      } else {
        setIsCorrectAnswer(false);
      }
    }
    checkAnswer();
  }, [userAnswer]);

  // al caricamento della pagina cerca le domande e le riposte e salvale in data
  useEffect(() => {
    async function fetchData() {
      const res = await fetch(
        `https://opentdb.com/api.php?amount=10&type=multiple`
      );
      const data = await res.json();
      setData(data.results);
    }
    fetchData();
  }, []);

  // aggiorna la risposta corretta al caricamento dei dati o al cambio domanda
  useEffect(() => {
    if (data.length > 0) {
      setCorrectAnswer(he.decode(data[questionCounter].correct_answer));
      console.log(data[questionCounter].question);
    }
  }, [data, questionCounter]);

  function handleChangeQuestion() {
    setShowAnswer(false);
    setCorrectAnswer(false);
    setQuestionCounter(questionCounter + 1);
  }

  return (
    <div className="main">
      <button onClick={handleChangeQuestion}>Next question</button>

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
            />
          </>
        ) : (
          <p>Loading question...</p>
        )}
      </div>

      <div className={`result ${showAnswer ? "" : "hide"}`}>
        <p>Your answer is: {userAnswer}.</p>
        <p>
          The correct answer is {he.decode(correctAnswer)}.{" "}
          {isCorrectAnswer ? "Good Job!" : "Try again"}
        </p>
      </div>
    </div>
  );
}
