import React from "react";
import "./App.css"

export const App = () => {
    const [counter, setcounter] = React.useState(0);
    return (
        <div className="App-header">
            <h2>@neutral/JSX Webpack</h2>
            <p className="App-paragraph">Render count: {counter}</p>
            <button
                className="App-button"
                onClick={() => setcounter(counter + 1)}
            >
                Counter <span role="emoji">🧐</span>
            </button>
            <a href="https://github.com/rodzy/neutral" target="_blank">
                GitHub
            </a>
        </div>
    );
};
