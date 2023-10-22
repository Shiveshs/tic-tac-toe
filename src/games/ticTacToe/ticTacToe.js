import React, { useState } from "react";

const TicTacToe = () => {
  const createBoard = (size) => {
    const newBoard = [];

    for (let i = 0; i < size; i++) {
      newBoard.push([...Array(size)]);
    }
    return newBoard;
  };

  const horizontalWin = (board) => {
    for (let i = 0; i < board.length; i++) {
      const newRow = new Set(board[i]);
      if (newRow.size === 1 && !newRow.has(undefined)) {
        return true;
      }
    }
    return false;
  };

  const changeVerticalToHorizontal = (board) => {
    let newBoard = [];

    for (let i = 0; i < board.length; i++) {
      let newRow = [];
      for (let j = 0; j < board.length; j++) {
        newRow.push(board[j][i]);
      }
      newBoard.push(...[newRow]);
    }
    return newBoard;
  };

  const changeDiagonalToHorizontal = (board) => {
    let newBoard = [[], []];
    let j = board.length - 1;
    for (let i = 0; i < board.length; i++) {
      newBoard[0].push(board[i][i]);
      newBoard[1].push(board[i][j]);
      j--;
    }
    return newBoard;
  };

  const checkWin = (board) => {
    //Check horizontal win
    if (horizontalWin(board)) return true;
    //Check verticalWin
    if (horizontalWin(changeVerticalToHorizontal(board))) return true;
    //Check diagonalWin
    if (horizontalWin(changeDiagonalToHorizontal(board))) return true;
  };

  const [board, setBoard] = useState(createBoard(3));
  const [currUser, setCurrUser] = useState("X");
  const [winner, setWinner] = useState("");

  const clickHandler = (row, column) => {
    // console.log("row", row, "column", column, "board", board);
    board[row][column] = currUser;
    if (checkWin(board)) {
      setBoard(createBoard(3));
      setCurrUser("X");
      setWinner(currUser);
      console.log(`${currUser} Wins`);
    } else {
      currUser === "X" ? setCurrUser("O") : setCurrUser("X");
      setBoard(...[board]);
    }
  };

  return (
    <div style={{ paddingTop: "20%" }}>
      <h1>TIC TAC TOE</h1>
      {board.map((row, rowIndex) => {
        return (
          <div
            key={rowIndex}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {row.map((cell, columnIndex) => {
              return (
                <div
                  key={columnIndex}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    border: "1px solid white",
                    height: "50px",
                    width: "50px",
                    color: "white",
                  }}
                  onClick={() => clickHandler(rowIndex, columnIndex)}
                >
                  {cell}
                </div>
              );
            })}
          </div>
        );
      })}
      {winner && <h1>Player {winner} Wins</h1>}
    </div>
  );
};

export default TicTacToe;
