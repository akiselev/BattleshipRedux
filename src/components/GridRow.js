import React, { Component, PropTypes } from "react";
import miss from "../assets/Miss.png";

class GridCell extends Component {
    render() {
        let { state, onClick } = this.props;
        let text;
        if (state === false) {
            text = "O";
        } else if (state === true) {
            text = "x";
        } else {
            text = "X";
        }
        return (
            <td>
                <button width="50" height="50" onClick={onClick}>
                    {text}
                </button>
            </td>
        );
    }
}

GridCell.propTypes = {
    state: PropTypes.any.isRequired,
    onClick: PropTypes.func.isRequired
};

class GridRow extends Component {
    render() {
        let { y, cells, onClick } = this.props;
        let grid_cells = cells.map((cell, x) => {
            let clickFn = () => onClick(x, y);
            let key = `${y}_${x}`;
            return <GridCell state={cell} onClick={clickFn} key={key} />;
        });
        return (
            <tr className="grid-row">
                {grid_cells}
            </tr>
        );
    }
}

GridRow.propTypes = {
    y: PropTypes.number.isRequired,
    cells: PropTypes.array.isRequired,
    onClick: PropTypes.func.isRequired
};

export default GridRow;
