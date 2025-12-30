import '../css/main.css';

function Main() {
    return (
        <main className="main">
            <div className="container-options">
                <div className="statistics">
                    <span>WPM: 23</span>
                    <span>Accuracy: 23%</span>
                    <span>Time: 23.s</span>
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
            <div className="container-Words">
                <p>
                    Software is an essential part of modern technology. It allows computers and devices to perform specific tasks, from simple calculations to complex systems that manage data and communication. Developers write code to create software that is efficient, reliable, and easy to use. As technology evolves, software continues to improve the way people work, learn, and connect with the world through innovative digital solutions globally.
                </p>
            </div>
            <div className="container-restart-test">
                <button>
                    Restart Test
                    <img src="/img/icon-restart.svg" alt="icon-restart" />
                </button>
            </div>
        </main>
    );
}

export default Main;