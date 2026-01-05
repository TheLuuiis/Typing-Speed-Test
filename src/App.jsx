import React, { useState, useEffect } from "react";
import './css/containerApp.css';
import Header from './components/Header';
import Main from './components/Main';
import Results from "./components/Results";
import ResultsNewPersonal  from "./components/ResultsNewPersonal";

function App() {

    const [bestWpm, setBestWpm] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [showNewPersonal, setShowNewPersonal] = useState(false);
    const [isNewPersonalBest, setIsNewPersonalBest] = useState(false);
    const [results, setResults] = useState({
    wpm: 0,
    accuracy: 0,
    correctChars: 0,
    totalChars: 0,
    });

    const handleTestEnd = ({ wpm, accuracy, correctChars, totalChars }) => {
    setResults({ wpm, accuracy, correctChars, totalChars });

    setBestWpm((prevBest) => {
        const isNew = wpm > prevBest;
        setIsNewPersonalBest(isNew);
        return isNew ? wpm : prevBest;
    });

    setShowResults(true);
    setShowNewPersonal(false);
    };

    useEffect(() => {
    if (!showResults) return;
        const timeoutId = setTimeout(() => {
            if (isNewPersonalBest) {
            setShowResults(false);
            setShowNewPersonal(true);
            }
        }, 5000);

        return () => clearTimeout(timeoutId);
    }, [showResults, isNewPersonalBest]);

    const handleRestart = () => {
        setShowResults(false);
        setShowNewPersonal(false);
        setIsNewPersonalBest(false);
    };

    return (
        <div className="containerApp">
            <Header bestWpm={bestWpm} />

            {!showResults && !showNewPersonal && (
            <Main onTestEnd={handleTestEnd} />
            )}

            {showResults && (
            <Results
                wpm={results.wpm}
                accuracy={results.accuracy}
                correctChars={results.correctChars}
                totalChars={results.totalChars}
                onRestart={handleRestart}
            />
            )}

            {showNewPersonal && (
            <ResultsNewPersonal
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