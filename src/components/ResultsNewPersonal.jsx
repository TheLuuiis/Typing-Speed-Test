import '../css/resultsNewPersonal.css';

function ResultsNewPersonal({ wpm, accuracy, correctChars, totalChars, onRestart }) {
    return (
        <div className="container-results">
            <img className='logo-new' src="/img/icon-new-pb.svg" alt="icon-new-pb" />

            <h2>High score smashed!</h2>
            <p>You're getting faster. That was incredible typing.</p>

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
                Beat This Score
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

export default ResultsNewPersonal;