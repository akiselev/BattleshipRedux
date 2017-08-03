import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import Game from "./components/Game";
import state from "./reducers";

const store = createStore(
    state,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
const rootEl = document.getElementById("root");

const render = () => {
    let onClick = (x, y) => {
        store.dispatch({
            type: "FIRE",
            x: x,
            y: y
        });
        console.log(`Fired at (${x}, ${y})`);
    };

    ReactDOM.render(
        <Game state={store.getState()} onClick={onClick} />,
        rootEl
    );
};
render();
store.subscribe(render);
