// 9 squares, symbols, X n O, each dude can go the other turn
// let variable declaration, can take any form or shape
// const variable declaration, cannot change after initialized
// array: sort of data-structure that allows for a collection to be saved,
//    you can imagine it as a sentence, e.g.: "i am big" in an array you could write it as: ["i", " ", "a", "m", " ", "b", "i", "g"]

//initialisation squares, which will be our board

// class in javascript
class Player {
  //constructor: when a new object is made you need to give it a name and a symbol;
  constructor(name, symbol) {
    this._name = name;
    this._symbol = symbol;
    this._score = 0;
  }
  //setters
  set name(value) {
    this._name = value;
  }
  set symbol(value) {
    this._symbol = value;
  }
  set score(value) {
    this._score = value;
  }

  //getters
  get symbol() {
    return this._symbol;
  }
  get name() {
    return this._name;
  }
  get score() {
    return this._score;
  }
}

class TicTacToe {
  constructor(player1, player2) {
    this._player1 = player1;
    this._player2 = player2;
    this._board = [["", "", ""], ["", "", ""], ["", "", ""]];
  }
  //setters
  set board(value) {
    this._board = value;
  }
  set player2(value) {
    this._player2 = value;
  }
  set player1(value) {
    this._player1 = value;
  }

  //getters
  get player1() {
    return this._player1;
  }
  get player2() {
    return this._player2;
  }
  get board() {
    return this._board;
  }

  hasWon() {
    let row = [];
    let column = [];
    let diagonalArray1 = [];
    let diagonalArray2 = [];
    let p1 = null,
      p2 = null;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        row[j] = this._board[i][j];
        column[j] = this._board[j][i];
      }

      p1 = checkWithArrayIfGameWon(row, this._player1, this._player2);
      p2 = checkWithArrayIfGameWon(column, this._player1, this._player2);
      if (p1 != null) {
        return p1;
      }
      if (p2 != null) {
        return p2;
      }
    }
    diagonalArray1[0] = this._board[0][0];
    diagonalArray1[1] = this._board[1][1];
    diagonalArray1[2] = this._board[2][2];
    p1 = checkWithArrayIfGameWon(diagonalArray1, this._player1, this._player2);
    diagonalArray2[0] = this._board[0][2];
    diagonalArray2[1] = this._board[1][1];
    diagonalArray2[2] = this._board[2][0];
    p2 = checkWithArrayIfGameWon(diagonalArray2, this._player1, this._player2);
    if (p1 != null) {
      return p1;
    }
    if (p2 != null) {
      return p2;
    }
  }

  gameOver() {
    let player = this.hasWon();
    if (player != null) {
      alert(`${player.name} is the winner!`);
      player.score++;
    } else if (this.isEqual()) {
      alert(`Sadly this game is a draw!`);
    } else {
    }
  }

  isEqual() {
    let output = true;
    for (let i = 0; i < 3; i++) {
      this._board[i].forEach(element => {
        if (element == "" || element == null) {
          output = false;
        }
      });
    }
    return output;
  }
}

function checkIfPlayerWon(array, symbol) {
  let output = false;
  if (array[1] == symbol && array[2] == symbol) {
    output = true;
  }
  return output;
}

function checkWithArrayIfGameWon(array, player1, player2) {
  let player = null;
  let won = false;
  player = checkFirstPlayerInArray(array, player1, player2);
  if (player != null) {
    won = checkIfPlayerWon(array, player.symbol);
    if (won) {
      return player;
    }
  }
}

function checkFirstPlayerInArray(array, player1, player2) {
  let playerSymbol = null;
  if (array[0] == player1.symbol) {
    return player1;
  } else if (array[0] == player2.symbol) {
    return player2;
  } else {
    return playerSymbol;
  }
}

const init = () => {
  const player1 = new Player("sterre", "X");
  const player2 = new Player("reeven", "O");
  const game = new TicTacToe(player1, player2);
  const players = [player1, player2];
  let divBody = document.getElementById("body");

  let divScore = document.createElement("div");
  // let Element = document.createElement("div");
  // players.forEach(player => {
  //   let scoreText = document.createTextNode(
  //     `The score of ${player.name} = ${player.score}`
  //   );
  //   pElement.append(scoreText);
  // });
  // divScore.append(pElement);
  divBody.append(divScore);

  // console.table(game.board);
  // game.gameOver();
};
window.onload = init;
