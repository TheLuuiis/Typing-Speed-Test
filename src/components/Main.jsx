import { useState, useEffect, useRef } from "react";
import "../css/main.css";

const INITIAL_TEXT = `software is an essential part of modern technology, it allows computers and devices to perform specific tasks, from simple calculations to complex systems that manage data and communication, developers write code to create software that is efficient, reliable, and easy to use, as technology evolves, software continues to improve the way people work, learn, and connect with the world through innovative digital solutions globally`;

// Función helper para calcular estadísticas
function calculateStats(userInput, elapsedSeconds, text) {
  const totalChars = text.length;
  const totalTyped = userInput.length;

  let correctChars = 0;
  for (let i = 0; i < totalTyped && i < totalChars; i += 1) {
    if (userInput[i] === text[i]) {
      correctChars += 1;
    }
  }

  const minutes = elapsedSeconds > 0 ? elapsedSeconds / 60 : 0;
  const wpm =
    minutes > 0 ? Math.round((correctChars / 5) / minutes) : 0;

  const accuracy =
    totalTyped > 0 ? Math.round((correctChars / totalTyped) * 100) : 0;

  return { wpm, accuracy, correctChars, totalChars };
}

function Main({ onTestEnd }) {
  const [text] = useState(INITIAL_TEXT);
  const [userInput, setUserInput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const inputRef = useRef(null);

  // Refs para evitar dobles finales y leer siempre el último input
  const userInputRef = useRef("");
  const hasFinishedRef = useRef(false);

  // Timer de 60s
  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;

    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(intervalId);

          if (!hasFinishedRef.current && onTestEnd) {
            hasFinishedRef.current = true;

            const elapsedSeconds = 60; // todo el minuto
            const { wpm, accuracy, correctChars, totalChars } =
              calculateStats(userInputRef.current, elapsedSeconds, text);

            onTestEnd({
              wpm,
              accuracy,
              correctChars,
              totalChars,
            });
          }

          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isRunning, timeLeft, onTestEnd, text]);

  // Manejo de entrada del usuario
  const handleChange = (event) => {
    const { value } = event.target;

    if (!isRunning && value.length > 0 && timeLeft === 60) {
      setIsRunning(true);
    }

    // Si ya terminó o no queda tiempo, no seguimos escribiendo
    if (timeLeft === 0 || hasFinishedRef.current) return;

    // Limitamos al tamaño del texto objetivo
    const newValue = value.slice(0, text.length);
    setUserInput(newValue);
    userInputRef.current = newValue;

    // ¿Terminó todo el texto?
    const finishedText = newValue.length === text.length;
    if (finishedText && !hasFinishedRef.current && onTestEnd) {
      hasFinishedRef.current = true;
      setIsRunning(false); // detenemos el timer

      const elapsedSeconds = 60 - timeLeft;
      const { wpm, accuracy, correctChars, totalChars } =
        calculateStats(newValue, elapsedSeconds, text);

      onTestEnd({
        wpm,
        accuracy,
        correctChars,
        totalChars,
      });
    }
  };

  // Reiniciar test desde Main (botón "Restart Test")
  const handleRestart = () => {
    setUserInput("");
    userInputRef.current = "";
    hasFinishedRef.current = false;
    setIsRunning(false);
    setTimeLeft(60);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Estadísticas en vivo
  const elapsedSecondsLive = 60 - timeLeft;
  const { wpm, accuracy } = calculateStats(
    userInput,
    elapsedSecondsLive,
    text
  );

  return (
    <main className="main">
      <div className="container-options">
        <div className="statistics">
          <span>
            WPM: <span style={{ color: "white" }}>{wpm}</span>
          </span>
          <span>
            Accuracy: <span style={{ color: "red" }}>{accuracy}%</span>
          </span>
          <span>
            Time: <span style={{ color: "yellow" }}>{timeLeft}</span>
          </span>
        </div>

        <div className="statistics-aditional">
          <div className="container-difficulties">
            <span>Difficulty:</span>
            <a href="#">Easy</a>
            <a href="#">Medium</a>
            <a href="#">Hard</a>
          </div>
          <div className="container-mode">
            <span>Mode:</span>
            <a href="#">Timed (60s)</a>
            <a href="#">Passage</a>
          </div>
        </div>
      </div>

      <div
        className="container-Words"
        onClick={() => inputRef.current && inputRef.current.focus()}
      >
        <p>
          {text.split("").map((char, index) => {
            let className = "char";

            if (index < userInput.length) {
              className +=
                userInput[index] === char ? " correct" : " incorrect";
            }

            const isCurrentPosition = index === userInput.length;

            return (
              <span key={index} className={className}>
                {isCurrentPosition && <span className="caret" />}
                {char}
              </span>
            );
          })}

          {userInput.length === text.length && (
            <span className="caret caret-end" />
          )}
        </p>

        <input
          ref={inputRef}
          type="text"
          className="hidden-input"
          value={userInput}
          onChange={handleChange}
          autoFocus
        />
      </div>

      <div className="container-restart-test">
        <button onClick={handleRestart}>
          Restart Test
          <img src="/img/icon-restart.svg" alt="icon-restart" />
        </button>
      </div>
    </main>
  );
}

export default Main;