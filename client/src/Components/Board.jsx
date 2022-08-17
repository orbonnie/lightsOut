import React, {Component, useState, useEffect} from "react";
import Cell from "./Cell.jsx";
import './Board.css';



const Board = ({nrows = 5, ncols = 5, chanceLightStartsOn = 0.25}) => {
  const [board, setBoard] = useState(createBoard());
  const [hasWon, setHasWon] = useState(false);
  // const [isLit, setIsLit] = useState(false);

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

  function createBoard() {
    let board = [];
    // TODO: create array-of-arrays of true/false values
    for (let y = 0; y < nrows; y++) {
      let row = [];
      for (let x = 0; x < ncols; x++) {
        row.push(Math.random() < chanceLightStartsOn);
      }
      board.push(row);
    }
    return board;
  }

  /** handle changing a cell: update board & determine if winner */

  const flipCellsAround = (coord) => {
    let newBoard = [...board];
    let [y, x] = coord.split("-").map(Number);
    // console.log(y, x)

    const flipCell = (y, x) => {
      // if this coord is actually on board, flip it

      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
      setBoard(newBoard);
    }

    // TODO: flip this cell and the cells around it
    flipCell(y, x); //Flip initial cell
    flipCell(y, x - 1); //flip left
    flipCell(y, x + 1); //flip right
    flipCell(y - 1, x); //flip below
    flipCell(y + 1, x); //flip above

    // win when every cell is turned off
    // TODO: determine is the game has been won
    let won = board.every(row => row.every(cell => !cell));
    setHasWon(won);
  }

  /** Render game board or winning message. */
  let tableBoard = [];
  for (let y = 0; y < nrows; y++) {
    let row = [];
    for (let x = 0; x < ncols; x++) {
      let coord = `${y}-${x}`;
      row.push( <Cell key={coord} coord={coord} flipCellsAroundMe={flipCellsAround} isLit={board[y][x]}/> )
    }
    tableBoard.push(<tr key={y} >{row}</tr>);
  }

  return (
    <div>
      <div>
        <span className="neon-orange">Lights</span>
        <span className="neon-blue">Out</span>
      </div>
      {hasWon && <h1 className="won">
          <div className="neon-blue">You</div>
          <div className="neon-orange">Won!!</div>
        </h1>}

      {!hasWon &&  <table className="Board">
        <tbody>
          {tableBoard}
        </tbody>
      </table>}
    </div>
  )
}


export default Board;