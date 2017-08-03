let ship_layout = [
    {
        ship: "carrier",
        positions: [[2, 9], [3, 9], [4, 9], [5, 9], [6, 9]],
        sunk: false
    },
    {
        ship: "battleship",
        positions: [[5, 2], [5, 3], [5, 4], [5, 5]],
        sunk: false
    },
    {
        ship: "cruiser",
        positions: [[8, 1], [8, 2], [8, 3]],
        sunk: false
    },
    {
        ship: "submarine",
        positions: [[3, 0], [3, 1], [3, 2]],
        sunk: false
    },
    {
        ship: "destroyer",
        positions: [[0, 0], [1, 0]],
        sunk: false
    }
];

let initial_state = {
    messages: [],
    message_counter: 0,
    shipTypes: {
        carrier: { size: 5, count: 1 },
        battleship: { size: 4, count: 1 },
        cruiser: { size: 3, count: 1 },
        submarine: { size: 3, count: 1 },
        destroyer: { size: 2, count: 1 }
    },
    layout: ship_layout,
    winning_score: ship_layout
        .map(ship => ship.positions.length)
        .reduce((sum, length) => sum + length),
    scores: [{ name: "Player 1", score: 0 }, { name: "Player 2", score: 0 }],
    // Since there are only three values we'll use false for empty, true for miss,
    // and the name of the ship if hit
    grid_state: [...Array(10).keys()].map(row => {
        return [...Array(10).keys()].map(col => false);
    }),
    counter: 0
};

function show_message(state, message) {
    let new_message = { text: message, id: state.message_counter };

    return {
        ...state,
        messages: [...state.messages, new_message],
        message_counter: state.message_counter + 1
    };
}

function fire(state, x, y) {
    // true if there was miss at this location, string if a hit
    if (state.grid_state[y][x]) {
        return show_message(state, "You already fired here!");
    }

    let ship = state.layout.find(ship => {
        let filter = pos => pos[0] === x && pos[1] === y;

        return ship.positions.find(filter);
    });

    // Redux state should be immutable so we'll recreate the grid state
    // map is optimized by JITs to be really fast in this case
    let grid = state.grid_state.map((grid_row, row) => {
        return grid_row.map((grid_col, col) => {
            if (row === y && col === x) return true;
            return grid_col;
        });
    });

    var new_state = { ...state, grid_state: grid };
    if (ship) {
        // grid is a reference to an array of arrays so we're still editing new_state
        grid[y][x] = ship.ship;

        let hits = ship.positions.filter(pos => grid[pos[1]][pos[0]]);

        if (hits.length === ship.positions.length) {
            let points = hits.length;
            let new_score = { ...new_state.scores[0] };
            new_score.score += points;

            let new_layout = new_state.layout.map(new_ship => {
                let is_sunk = new_ship.sunk;
                if (new_ship.positions === ship.positions) {
                    is_sunk = true;
                }
                return { ...new_ship, sunk: is_sunk };
            });

            new_state = show_message(
                {
                    ...new_state,
                    layout: new_layout,
                    scores: [new_score, new_state.scores[1]]
                },
                `You sunk a ${ship.ship}! ${points} points!`
            );

            if (new_score.score === new_state.winning_score) {
                new_state = show_message(new_state, "You won!");
            }
        } else {
            new_state = show_message(new_state, "You hit a ship!");
        }
    } else {
        new_state = show_message(new_state, "You missed!");
    }

    return new_state;
}

export default (state = initial_state, action) => {
    switch (action.type) {
        case "INCREMENT":
            return { ...state, counter: state.counter + 1 };
        case "DECREMENT":
            return { ...state, counter: state.counter - 1 };
        case "FIRE":
            return fire(state, action.x, action.y);
        case "MESSAGE_CLOSED":
            return {
                ...state,
                messages: state.filter(msg => msg.id != action.message_id)
            };
        default:
            return state;
    }
};
