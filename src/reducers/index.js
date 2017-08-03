let initial_state = {
  "messages": [],
  "layout": [
    { "ship": "carrier", "positions": [[2,9], [3,9], [4,9], [5,9], [6,9]] },
    { "ship": "battleship", "positions": [[5,2], [5,3], [5,4], [5,5]] },
    { "ship": "cruiser", "positions": [[8,1], [8,2], [8,3]] },
    { "ship": "submarine", "positions": [[3,0], [3,1], [3,2]] },
    { "ship": "destroyer", "positions": [[0,0], [1,0]] }
  ]
}

export default (state = initial_state, action) => {
  switch (action.type) {
    case 'ATTACK':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
};
