# Wagon Journey Game (Redux Practice)

This is a simple simulation of a wagon journey created to practice state management using **Redux**. The game involves managing a wagon's journey, including gathering supplies, traveling, handling events, and managing resources (cash and supplies).

## Features

- **Gathering supplies**: Increase the amount of supplies for the journey.
- **Traveling**: Spend supplies to travel a certain distance. You must manage your resources effectively to continue moving.
- **Tipped Wagon Event**: Sometimes the wagon tips over, and supplies are lost.
- **Buy/Sell Supplies**: Use your cash to buy supplies or sell excess supplies for more cash.
- **Theft Event**: Sometimes thieves steal half your cash!

The game state is managed using a **Redux reducer** function, simulating the management of actions like gathering, traveling, buying, and selling.

---

## Getting Started

### Prerequisites

To run this project, you'll need to have **Node.js** installed on your machine.

### Installation

1. Clone the repository to your local machine:
    ```bash
    git clone https://github.com/your-username/wagon-redux-game.git
    ```

2. Navigate into the project directory:
    ```bash
    cd wagon-redux-game
    ```

3. Install dependencies (if applicable):
    ```bash
    npm install
    ```

---

## Game Overview

The wagon starts with:
- 100 units of supplies
- 0 kilometers traveled
- 0 days passed
- 200 units of cash

### Actions
The game is driven by a series of actions that modify the state:

- **`gather`**: Adds 15 supplies and advances the game by 1 day.
- **`travel` (payload: number of days)**: For each day of travel, 20 units of supplies are consumed, 10 kilometers are traveled, and the number of days is updated. If there aren't enough supplies, no travel occurs.
- **`tippedWagon`**: A random event where the wagon tips over, losing 30 supplies and adding 1 day.
- **`sell`**: Sells 20 units of supplies for 5 units of cash. If fewer than 20 supplies are available, the action is ignored.
- **`buy`**: Buys 25 supplies for 15 units of cash. If less than 15 cash is available, the action is ignored.
- **`theft`**: Thieves steal half the cash.

---

## Code Example

### Initial Wagon State

The initial state of the wagon is defined as follows:


const initialWagonState = {
  supplies: 100,
  distance: 0,  
  days: 0,      
  cash: 200
};


### Reducer Function

The `gameReducer` function handles the different actions and updates the wagon's state accordingly:


const gameReducer = (state = initialWagonState, action) => {
  switch (action.type) {
    case 'gather':
      state.supplies += 15;
      state.days += 1;
      return state;

    case 'travel':
      if ((state.supplies - (action.payload * 20)) < 0) return state;
      state.supplies -= (action.payload * 20);
      state.distance += (action.payload * 10);
      state.days += action.payload;
      return state;

    case 'tippedWagon':
      state.supplies -= 30;
      state.days += 1;
      return state;

    case 'sell':
      if (state.supplies < 20) return state;
      state.supplies -= 20;
      state.cash += 5;
      return state;

    case 'buy':
      if (state.cash < 15) return state;
      state.supplies += 25;
      state.cash -= 15;
      return state;

    case 'theft':
      state.cash /= 2;
      return state;

    default:
      return state;
  }
};


### Example Usage

The following shows how the game progresses with different actions:


let wagon = gameReducer(undefined, {});

wagon = gameReducer(wagon, { type: 'travel', payload: 1 });
wagon = gameReducer(wagon, { type: 'gather' });
wagon = gameReducer(wagon, { type: 'tippedWagon' });
wagon = gameReducer(wagon, { type: 'sell' });
wagon = gameReducer(wagon, { type: 'buy' });
wagon = gameReducer(wagon, { type: 'theft' });




## How to Play

You can simulate the game by dispatching various actions and observing how the state changes. You can log the state after each action to track the progress of the wagon.

Example of dispatching actions and logging the state:


console.log(`Day ${wagon.days}, Distance: ${wagon.distance}, Supplies: ${wagon.supplies}, Cash: ${wagon.cash}`);




## Contributing

Feel free to fork this repository and submit pull requests. Contributions are welcome to enhance the gameplay or improve the code!



## License

This project is open source and available under the [MIT License](LICENSE).



## Acknowledgments

This project was created for the purpose of learning and practicing **Redux** state management principles in JavaScript.
