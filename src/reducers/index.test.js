import reducer from "./index";

function fire(x, y) {
    return {
        type: "FIRE",
        x: x,
        y: y
    };
}

test("hitting a cruiser", () => {
    let state = reducer(undefined, {});

    state = reducer(state, fire(8, 1));
    let grid = state.grid_state;
    expect(grid[1][8]).toEqual("cruiser");
});

test("sinking a cruiser", () => {
    let state = reducer(undefined, {});
    let positions = [[8, 1], [8, 2], [8, 3]];
    for (let pos of positions) {
        state = reducer(state, fire(pos[0], pos[1]));
    }

    let grid = state.grid_state;

    // grid.forEach();

    expect(grid[1][8]).toEqual("cruiser");
    expect(grid[2][8]).toEqual("cruiser");
    expect(grid[3][8]).toEqual("cruiser");
    expect(state.scores[0].score).toEqual(3);

    let messages = [
        "You hit a ship!",
        "You hit a ship!",
        "You sunk a cruiser! 3 points!"
    ];
    expect(state.messages.map(msg => msg.text)).toEqual(
        expect.arrayContaining(messages)
    );
});

test("misses, hits, and repeat", () => {
    let state = reducer(undefined, {});
    let positions = [
        [7, 1, true, "You missed!"],
        [3, 9, "carrier", "You hit a ship!"],
        [2, 5, true, "You missed!"],
        [2, 5, true, "You already fired here!"],
        [2, 7, true, "You missed!"],
        [2, 9, "carrier", "You hit a ship!"],
        [4, 9, "carrier", "You hit a ship!"],
        [0, 2, true, "You missed!"],
        [3, 3, true, "You missed!"],
        [5, 9, "carrier", "You hit a ship!"],
        [6, 9, "carrier", "You sunk a carrier! 5 points!"],
        [6, 7, true, "You missed!"]
    ];
    for (let pos of positions) {
        state = reducer(state, fire(pos[0], pos[1]));
        expect(state.grid_state[pos[1]][pos[0]]).toEqual(pos[2]);
        expect(state.messages.slice(-1)[0].text).toEqual(pos[3]);
    }

    expect(state.layout[0].sunk).toEqual(true);
});

test("winning the game", () => {
    let state = reducer(undefined, {});

    let positions = [];
    for (let ship of state.layout)
        for (let pos of ship.positions) positions.push(pos);

    for (let pos of positions) {
        state = reducer(state, fire(pos[0], pos[1]));
    }

    expect(state.messages.slice(-1)[0].text).toEqual("You won!");
});
