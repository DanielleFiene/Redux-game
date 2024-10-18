// Initial state of the wagon
const initialWagonState = {
  supplies: 100, // supplies
  distance: 0,   // kilometers
  days: 0,       // days
  cash: 200      // money
};

// The gameReducer function manages the game state based on different actions
const gameReducer = (state = initialWagonState, action) => {
  switch (action.type) {
    // Case for gathering supplies (adds 15 supplies, takes 1 day)
    case 'gather': {
      state.supplies += 15;
      state.days += 1; 
      return state;
    }
    // Case for traveling (each day of travel costs 20 supplies, adds 10 km per day)
    case 'travel': {
      if ((state.supplies - (action.payload * 20)) < 0) {  // If not enough supplies, no travel
        return state;
      }
      state.supplies -= (action.payload * 20);  // Subtract supplies for each day of travel
      state.distance += (action.payload * 10);  // Increase distance by 10 km per day
      state.days += action.payload;  // Add the number of days traveled
      return state;
    }
    // Case for a tipped wagon (lose 30 supplies, takes 1 day)
    case 'tippedWagon': {
      state.supplies -= 30;
      state.days += 1;
      return state;
    }
    // Case for selling supplies (lose 20 supplies, gain 5 cash)
    case 'sell': {
      if (state.supplies < 20) {  // Must have at least 20 supplies to sell
        return state;
      }
      state.supplies -= 20;
      state.cash += 5;
      return state;
    }
    // Case for buying supplies (gain 25 supplies, costs 15 cash)
    case 'buy': {
      if (state.cash < 15) {  // Must have at least 15 cash to buy
        return state;
      }
      state.supplies += 25;
      state.cash -= 15;
      return state;
    }
    // Case for theft (lose half the cash)
    case 'theft': {
      state.cash /= 2;
      return state;
    }
    // If action type doesn't match, return the current state
    default: return state;
  }
};

// Initial state
let wagon = gameReducer(undefined, {});

console.log('---Initial State---')
console.log(
  `Day ${wagon.days} 
  distance traveled: ${wagon.distance} km
  remaining supplies: ${wagon.supplies} pieces
  remaining money: ${wagon.cash} \$\n\n`
);

// 1 day of travel
wagon = gameReducer(wagon, {type: 'travel', payload: 1});

console.log('---1 day of travel---')
console.log(
  `Day ${wagon.days} 
  distance traveled: ${wagon.distance} km
  remaining supplies: ${wagon.supplies} pieces
  remaining money: ${wagon.cash} \$\n\n`
);

// 2nd day gathering supplies
wagon = gameReducer(wagon, {type: 'gather'});

console.log('---Gathering supplies---')
console.log(
  `Day ${wagon.days} 
  distance traveled: ${wagon.distance} km
  remaining supplies: ${wagon.supplies} pieces
  remaining money: ${wagon.cash} \$\n\n`
);

// 3rd day crossing a dangerous river (tipped wagon)
wagon = gameReducer(wagon, {type: 'tippedWagon'});

console.log('---Crossing a dangerous river---')
console.log(
  `Day ${wagon.days} 
  distance traveled: ${wagon.distance} km
  remaining supplies: ${wagon.supplies} pieces
  remaining money: ${wagon.cash} \$\n\n`
);

// 4th day, travel for 3 days
wagon = gameReducer(wagon, {type: 'travel', payload: 3});

console.log('---3 days of travel---')
console.log(
  `Day ${wagon.days} 
  distance traveled: ${wagon.distance} km
  remaining supplies: ${wagon.supplies} pieces
  remaining money: ${wagon.cash} \$\n\n`
);

// 7th day, attempt to travel again
wagon = gameReducer(wagon, {type: 'travel', payload: 1});

console.log('---1 day of travel---')
console.log(
  `Day ${wagon.days} 
  distance traveled: ${wagon.distance} km
  remaining supplies: ${wagon.supplies} pieces
  remaining money: ${wagon.cash} \$\n\n`
);

// 7th day again, gathering resources
wagon = gameReducer(wagon, {type: 'gather'});

console.log('---Gathering supplies---')
console.log(
  `Day ${wagon.days} 
  distance traveled: ${wagon.distance} km
  remaining supplies: ${wagon.supplies} pieces
  remaining money: ${wagon.cash} \$\n\n`
);

// 8th day, gathering resources again
wagon = gameReducer(wagon, {type: 'gather'});

console.log('---Gathering supplies---')
console.log(
  `Day ${wagon.days} 
  distance traveled: ${wagon.distance} km
  remaining supplies: ${wagon.supplies} pieces
  remaining money: ${wagon.cash} \$\n\n`
);

// 9th day, selling supplies
wagon = gameReducer(wagon, {type: 'sell'});

console.log('---Selling supplies---')
console.log(
  `Day ${wagon.days} 
  distance traveled: ${wagon.distance} km
  remaining supplies: ${wagon.supplies} pieces
  remaining money: ${wagon.cash} \$\n\n`
);

// 8th day again, buying supplies
wagon = gameReducer(wagon, {type: 'buy'});

console.log('---Buying supplies---')
console.log(
  `Day ${wagon.days} 
  distance traveled: ${wagon.distance} km
  remaining supplies: ${wagon.supplies} pieces
  remaining money: ${wagon.cash} \$\n\n`
);

// 8th day again, thieves steal from us
wagon = gameReducer(wagon, {type: 'theft'});

console.log('---Thieves steal from us---')
console.log(
  `Day ${wagon.days} 
  distance traveled: ${wagon.distance} km
  remaining supplies: ${wagon.supplies} pieces
  remaining money: ${wagon.cash} \$\n\n`
);
