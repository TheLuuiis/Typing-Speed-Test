import React from "react";
import './css/containerApp.css';
import Header from './components/Header';
import Main from './components/Main';

function App() {
    return (
        <div className="containerApp">
            <Header />
            <Main />
        </div>
    );
}

export default App;