import React, { useState } from "react";
import "./tiktaetoe.css";
import sound from "./clickS.wav";
export default function Tiktactoe() {
  /*
  UseStates
  */
  const [board, setBoard] = useState(Array(9).fill(""));
  const [move, setMove] = useState("X");
  const [game, setGame] = useState("Game Started");
  const [clickDisable, setClickDisable] = useState(false);

  //Click Sound
  const playAudio = () => {
    let play = new Audio(sound);
    play.play();
  };

  //Player on Click Listener method
  //Respone based on cell id
  const handleOnClick = (id) => {
    if (clickDisable === true) {
      setMove("X");
      return;
    }
    //Play sound for each click
    playAudio();
    setGame("Game Continued");

    //If current cell value already changed not need to do anything
    if (board[id] !== "") return;

    //create a copy of board in square
    let square = [...board];

    //set current cell with current move
    square[id] = move;
    //Current board is square replacing previous board
    setBoard(square);

    // set alternative move
    if (move === "X") {
      setMove("O");
    } else {
      setMove("X");
    }

    //Check to find winning condiotions
    if (checkWin(square) === true) {
      setGame("Winner is: " + move);
      setClickDisable(true);
    }

    //Check for draw condition
    else if (checkDraw(square)) setGame("Game Draw");
  };

  //Function to check for winning conditions
  const checkWin = (board) => {
    const conditions = [
      [0, 1, 2], //1 row
      [3, 4, 5], //2 row
      [6, 7, 8], //3 row
      [0, 4, 8], //diagonal
      [2, 4, 6], //diagonal
      [2, 5, 8], //column
      [1, 4, 7], //column
      [0, 3, 6], //column
    ];
    let flag = false;
    conditions.forEach((element) => {
      if (
        board[element[0]] !== "" &&
        board[element[1]] !== "" &&
        board[element[2]] !== "" &&
        board[element[3]] !== ""
      ) {
        if (
          board[element[0]] === board[element[1]] &&
          board[element[1]] === board[element[2]]
        ) {
          flag = true;
        }
      }
    });
    return flag;
  };

  //Function to check draw conditions
  const checkDraw = (board) => {
    let count = 0;
    board.forEach((element) => {
      if (element !== "") count++;
    });
    return count === 9;
  };

  //handle new game button
  const handleNewGame = () => {
    setGame("Game Started");
    setMove("X");
    setBoard(Array(9).fill(""));
    setClickDisable(false);
  };
  return (
    <div>
      <h1 className="text-centre">Tik Tae Toe</h1>
      <h3 className="game">{game}</h3>
      <div className="nextMove div box">Next Move: {move}</div>
      <table className="glow black">
        <tbody>
          <tr>
            <td onClick={() => handleOnClick(0)}>{board[0]}</td>
            <td onClick={() => handleOnClick(1)}>{board[1]}</td>
            <td onClick={() => handleOnClick(2)}>{board[2]}</td>
          </tr>
          <tr>
            <td onClick={() => handleOnClick(3)}>{board[3]} </td>
            <td onClick={() => handleOnClick(4)}>{board[4]}</td>
            <td onClick={() => handleOnClick(5)}>{board[5]}</td>
          </tr>
          <tr>
            <td onClick={() => handleOnClick(6)}>{board[6]}</td>
            <td onClick={() => handleOnClick(7)}>{board[7]}</td>
            <td onClick={() => handleOnClick(8)}>{board[8]}</td>
          </tr>
        </tbody>
      </table>
      <button className="btn btn-warning" onClick={handleNewGame}>
        New Game
      </button>
    </div>
  );
}
