class Game {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
  }

  playMove(flipRow, flipColumn) {
    this._board.flipTile(flipRow, flipColumn);
    if(this._board.playerBoard[flipRow][flipColumn] === 'B') {
      console.log("The game is over");
      this._board.print();
    } else if (this._board.numberOfTiles !== this._board.numberOfBombs) {
      console.log("Congratulations!");
    } else {
      console.log("Current board: ");
      this._board.print();
    }
  }
}

class Board {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfRows * numberOfColumns;
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }

  get playerBoard() {
    return this._playerBoard;
  }

  //fuction that flip a tile
  flipTile(flipRow, flipColumn) {
    // Check if tile is already flipped, if so return
    if (this._playerBoard[flipRow][flipColumn] !== ' ') {
      console.log('This tile has already been flipped!');
      return; // this returns playerBoard[flipRow][flipColumn] - brief expression

    // Chek if tile is bomb, if so, place the bomb on the player board
    } else if (this._bombBoard[flipRow][flipColumn] === 'B') {
      this._playerBoard[flipRow][flipColumn] = ('B');

    // If tile is not a bomb, place the number of the surrounding bombs
    } else {
      this._playerBoard[flipRow][flipColumn] = this.getNumberOfNeighborBombs(flipRow, flipColumn);
    }

    this._numberOfTiles--;
  };

  //function displays the number of Bombs
  getNumberOfNeighborBombs(flipRow, flipColumn) {
    //variables
    const neighborOffsets = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1]
    ];
    const numberOfRows = this._bombBoard.length;
    const numberOfColumns = this._bombBoard[0].length;

    let numberOfBombs = 0; //counter

    //call the methods
    neighborOffsets.forEach(offset => {
      const neighborRowIndex = flipRow + offset[0];
      const neighborColumnIndex = flipColumn + offset[1];

      if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
        if (this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
          return numberOfBombs++;
        }
      }
    });
    return numberOfBombs;
  };

  hasSafeTiles() {
    return this._numberOfTiles !== this._numberOfBombs;
  }

  // print board
  print() {
    console.log(this._playerBoard.map(row => row.join(" | ")).join("\n"));
  }

  // This is a player board
  static generatePlayerBoard(numberOfRows, numberOfColumns) {
    const board = [];

    for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
      const row = [];
      for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
        row.push(' ');
      }
      board.push(row);
    };

    return board;
  }

  // This is a bomb board
  static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
    const board = [];

    for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
      const row = [];
      for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
        row.push(null);
      }
      board.push(row);
    }

    let numberOfBombsPlaced = 0;

    while (numberOfBombsPlaced < numberOfBombs) {
      // note about control flow
      const randomRowIndex = Math.floor(Math.random() * numberOfRows);
      const randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
      if (board[randomRowIndex][randomColumnIndex] !== 'B') {
        board[randomRowIndex][randomColumnIndex] = 'B';
        numberOfBombsPlaced++;
      }
    }

    return board;
  }

}

// Test the classes
const g = new Game(3, 3, 3);
g.playMove(0, 0);
