import React from "react";
import { useState } from "react";
import './css/containerApp.css';
import Header from './components/Header';
import Main from './components/Main';
import Results from "./components/Results";


function App() {

    const [showResults, setShowResults] = useState(false);
    const [results, setResults] = useState({
        wpm: 0,
        accuracy: 0,
        correctChars: 0,
        totalChars: 0,
    });

    const handleTestEnd = ({ wpm, accuracy, correctChars, totalChars }) => {
        setResults({ wpm, accuracy, correctChars, totalChars });
        setShowResults(true);
    };

    const handleRestart = () => {
        setShowResults(false); 
    };

    return (
        <div className="containerApp">
            <Header />
            {!showResults && <Main onTestEnd={handleTestEnd} />}
            {showResults && (
                <Results
                    wpm={results.wpm}
                    accuracy={results.accuracy}
                    correctChars={results.correctChars}
                    totalChars={results.totalChars}
                    onRestart={handleRestart}
                />
            )}
        </div>
    );
}

export default App;