import "../css/results.css";

function Results({ wpm, accuracy, correctChars, totalChars, onRestart }) {
  return (
    <div className="container-results">
      <div className="success-icon">
        <img src="/img/icon-completed.svg" alt="icon-results" />
      </div>
      <h2>Test completed!</h2>
      <p>Solid run. Keep pushing to beat your high score.</p>

      <div className="container-cards">
        <div className="card">
          <a href="#">WPM:</a>
          <span className="wpm-white">{wpm}</span>
        </div>
        <div className="card">
          <a href="#">Accuracy:</a>
          <span className="accuracy-red">{accuracy}%</span>
        </div>
        <div className="card">
          <a href="#">Characters:</a>
          <span className="charaters-green">
            {correctChars}/{totalChars}
          </span>
        </div>
      </div>

      <button onClick={onRestart}>
        Go again
        <img src="/img/rotate.png" alt="icon-restart" />
      </button>

      <img
        className="icon-left"
        src="/img/pattern-star-2.svg"
        alt="icon-results"
      />
      <img
        className="icon-right"
        src="/img/pattern-star-1.svg"
        alt="icon-results"
      />
    </div>
  );
}

export default Results;