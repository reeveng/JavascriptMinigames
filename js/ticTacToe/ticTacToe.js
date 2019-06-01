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
    this._board = [["h", "e", "y"], ["b", "e", "n"], ["j", "i", "j"]];
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
    } // else {
    // }
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

// function setAttributes(element, arrayOfAttributes) {
//   for (var key in arrayOfAttributes) {
//     element.setAttribute(key, arrayOfAttributes[key]);
//   }
// }

class TicTacToeComponent {
  constructor(window, player1, player2) {
    this._storage = window.localStorage;
    this._game = new TicTacToe(player1, player2);
  }
  //setters
  set game(value) {
    this._game = value;
  }
  set storage(value) {
    this._storage = value;
  }
  //getters
  get storage() {
    return this._storage;
  }
  get game() {
    return this._game;
  }

  boardToHtml() {
    document.getElementById("body").innerHTML = "";

    // is-ancestor element
    const divTileAncestor = document.createElement("div");
    divTileAncestor.setAttribute("class", "tile is-ancestor");

    //column1
    const divTileCol0 = document.createElement("div");
    divTileCol0.setAttribute("class", "tile is-4 is-vertical is-parent");

    //row1
    const divTileCol0Row0 = document.createElement("div");
    divTileCol0Row0.setAttribute("class", "tile is-child box");
    const pCol0Row0 = document.createElement("p");
    pCol0Row0.setAttribute("class", "has-text-centered");
    pCol0Row0.appendChild(document.createTextNode(`${this._game.board[0][0]}`));
    //row2
    const divTileCol0Row1 = document.createElement("div");
    divTileCol0Row1.setAttribute("class", "tile is-child box");
    const pCol0Row1 = document.createElement("p");
    pCol0Row1.setAttribute("class", "has-text-centered");
    pCol0Row1.appendChild(document.createTextNode(`${this._game.board[1][0]}`));
    //row3
    const divTileCol0Row2 = document.createElement("div");
    divTileCol0Row2.setAttribute("class", "tile is-child box");
    const pCol0Row2 = document.createElement("p");
    pCol0Row2.setAttribute("class", "has-text-centered");
    pCol0Row2.appendChild(document.createTextNode(`${this._game.board[2][0]}`));

    divTileCol0Row0.appendChild(pCol0Row0);
    divTileCol0Row1.appendChild(pCol0Row1);
    divTileCol0Row2.appendChild(pCol0Row2);

    //
    //column2
    const divTileCol1 = document.createElement("div");
    divTileCol1.setAttribute("class", "tile is-4 is-vertical is-parent");

    //row1
    const divTileCol1Row0 = document.createElement("div");
    divTileCol1Row0.setAttribute("class", "tile is-child box");
    const pCol1Row0 = document.createElement("p");
    pCol1Row0.setAttribute("class", "has-text-centered");
    pCol1Row0.appendChild(document.createTextNode(`${this._game.board[0][1]}`));
    //row2
    const divTileCol1Row1 = document.createElement("div");
    divTileCol1Row1.setAttribute("class", "tile is-child box");
    const pCol1Row1 = document.createElement("p");
    pCol1Row1.setAttribute("class", "has-text-centered");
    pCol1Row1.appendChild(document.createTextNode(`${this._game.board[1][1]}`));
    //row3
    const divTileCol1Row2 = document.createElement("div");
    divTileCol1Row2.setAttribute("class", "tile is-child box");
    const pCol1Row2 = document.createElement("p");
    pCol1Row2.setAttribute("class", "has-text-centered");
    pCol1Row2.appendChild(document.createTextNode(`${this._game.board[2][1]}`));

    divTileCol1Row0.appendChild(pCol1Row0);
    divTileCol1Row1.appendChild(pCol1Row1);
    divTileCol1Row2.appendChild(pCol1Row2);

    //
    //column3
    const divTileCol2 = document.createElement("div");
    divTileCol2.setAttribute("class", "tile is-4 is-vertical is-parent");

    //row1
    const divTileCol2Row0 = document.createElement("div");
    divTileCol2Row0.setAttribute("class", "tile is-child box");
    const pCol2Row0 = document.createElement("p");
    pCol2Row0.setAttribute("class", "has-text-centered");
    pCol2Row0.appendChild(document.createTextNode(`${this._game.board[0][2]}`));
    //row2
    const divTileCol2Row1 = document.createElement("div");
    divTileCol2Row1.setAttribute("class", "tile is-child box");
    const pCol2Row1 = document.createElement("p");
    pCol2Row1.setAttribute("class", "has-text-centered");
    pCol2Row1.appendChild(document.createTextNode(`${this._game.board[1][2]}`));
    //row3
    const divTileCol2Row2 = document.createElement("div");
    divTileCol2Row2.setAttribute("class", "tile is-child box");
    const pCol2Row2 = document.createElement("p");
    pCol2Row2.setAttribute("class", "has-text-centered");
    pCol2Row2.appendChild(document.createTextNode(`${this._game.board[2][2]}`));

    divTileCol2Row0.appendChild(pCol2Row0);
    divTileCol2Row1.appendChild(pCol2Row1);
    divTileCol2Row2.appendChild(pCol2Row2);

    //connecting all the divs and p elements
    divTileCol0.appendChild(divTileCol0Row0);
    divTileCol0.appendChild(divTileCol0Row1);
    divTileCol0.appendChild(divTileCol0Row2);
    divTileCol1.appendChild(divTileCol1Row0);
    divTileCol1.appendChild(divTileCol1Row1);
    divTileCol1.appendChild(divTileCol1Row2);
    divTileCol2.appendChild(divTileCol2Row0);
    divTileCol2.appendChild(divTileCol2Row1);
    divTileCol2.appendChild(divTileCol2Row2);

    divTileAncestor.appendChild(divTileCol0);
    divTileAncestor.appendChild(divTileCol1);
    divTileAncestor.appendChild(divTileCol2);

    document.getElementById("body").appendChild(divTileAncestor);
    document
      .getElementById("body")
      .setAttribute("class", "is-black has-text-centered container");
  }

  scorePanelToHtml() {}
  getGameFromStorage() {}
  setGameInStorage() {}
}

const init = () => {
  document.title = "TicTacToe";

  const player1 = new Player("sterre", "X");
  const player2 = new Player("reeven", "O");
  new TicTacToeComponent(this, player1, player2).boardToHtml();
  // console.table(game.board);
  // game.gameOver();
};
window.onload = init;
