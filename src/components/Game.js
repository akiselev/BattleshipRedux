import React, { Component, PropTypes } from "react";
import GridRow from "./GridRow";
import miss from "../assets/Miss.png";

class Game extends Component {
    render() {
        let { state, onClick } = this.props;

        let rows = state.grid_state.map((row, index) => {
            let key = `row_${index}`;
            return (
                <GridRow y={index} cells={row} onClick={onClick} key={key} />
            );
        });

        let messages = state.messages.map(msg => {
            let text = `${msg.id}) ${msg.text}`;
            let key = `msg_${msg.id}`;
            return (
                <tr key={key}>
                    <td>
                        {text}
                    </td>
                </tr>
            );
        });

        return (
            <div>
                <table>
                    <tbody>
                        {rows}
                    </tbody>
                </table>

                <table>
                    <tbody>
                        {messages}
                    </tbody>
                </table>
            </div>
        );
    }
}

Game.propTypes = {
    state: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired
};

export default Game;
