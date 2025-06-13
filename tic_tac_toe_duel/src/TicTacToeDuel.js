import React, { useState } from "react";

// PUBLIC_INTERFACE
function TicTacToeDuel() {
  /**
   * This component displays and manages a TicTacToe game: board, player turns,
   * win-draw detection, and restart functionality.
   * It follows the provided light theme, color scheme, and UI layout.
   */

  // --- Game constants ---
  const emptyBoard = Array(9).fill(null); // 3x3 grid as flat array
  const WIN_PATTERNS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6],            // diagonals
  ];

  // --- Theme Colors (from requirements) ---
  const colorPrimary = "#ffffff";
  const colorSecondary = "#222222";
  const colorAccent = "#4caf50";

  // --- State Hooks ---
  const [board, setBoard] = useState(emptyBoard);
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [isDraw, setIsDraw] = useState(false);
  const [winningLine, setWinningLine] = useState([]);

  // --- Core logic for move, win & draw detection ---
  function handleCellClick(idx) {
    if (board[idx] || winner) return; // Ignore filled or after game end
    const nextBoard = board.slice();
    nextBoard[idx] = xIsNext ? "X" : "O";
    setBoard(nextBoard);

    const result = calculateWinner(nextBoard);
    if (result) {
      setWinner(result.winner);
      setWinningLine(result.line);
    } else if (nextBoard.every(Boolean)) {
      setIsDraw(true);
    }
    setXIsNext((prev) => !prev);
  }

  // Determines winner and winning line, or null if none
  // PUBLIC_INTERFACE
  function calculateWinner(squares) {
    for (let line of WIN_PATTERNS) {
      const [a, b, c] = line;
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return { winner: squares[a], line };
      }
    }
    return null;
  }

  // PUBLIC_INTERFACE
  function restartGame() {
    setBoard(emptyBoard);
    setXIsNext(true);
    setWinner(null);
    setWinningLine([]);
    setIsDraw(false);
  }

  // --- Board rendering helpers ---
  function renderCell(idx) {
    const value = board[idx];
    const highlight =
      winner && winningLine.includes(idx)
        ? { color: colorAccent, textShadow: "0 0 4px #333" }
        : {};

    return (
      <button
        key={idx}
        className="ttt-cell"
        onClick={() => handleCellClick(idx)}
        style={{
          background: colorPrimary,
          color: value === "X" ? colorSecondary : colorAccent,
          fontWeight: "bold",
          fontSize: "2.3rem",
          border: "2px solid #dedede",
          borderRadius: "8px",
          outline: "none",
          transition: "box-shadow 0.1s, background 0.2s",
          cursor: value || winner ? "not-allowed" : "pointer",
          boxShadow: highlight.color
            ? `0 0 12px 2px ${colorAccent}`
            : "0 2px 10px rgba(68,68,68,0.08)",
          ...highlight,
        }}
        disabled={!!value || !!winner}
        aria-label={`cell ${idx}`}
      >
        {value}
      </button>
    );
  }

  // --- Status Message ---
  let statusMsg = "";
  if (winner) {
    statusMsg = `🎉 Player ${winner} wins!`;
  } else if (isDraw) {
    statusMsg = "It's a draw!";
  } else {
    statusMsg = `Turn: Player ${xIsNext ? "X" : "O"}`;
  }

  // --- Styles for layout and board ---
  const outerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "85vh",
    fontFamily:
      "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
  };
  const boardStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(3, 68px)",
    gridTemplateRows: "repeat(3, 68px)",
    gap: "10px",
    background: "#e6e7ed",
    borderRadius: "16px",
    padding: "16px",
    margin: "0 auto 22px auto",
    boxShadow:
      "0 4px 25px rgba(0,0,0,0.05), 0 0 0 4px #fff inset",
  };
  const statusStyle = {
    marginBottom: "20px",
    fontWeight: 600,
    fontSize: "1.25rem",
    color:
      winner
        ? colorAccent
        : isDraw
        ? colorSecondary
        : xIsNext
        ? colorSecondary
        : colorAccent,
    textAlign: "center",
    letterSpacing: "1px",
    minHeight: "30px",
  };
  const restartBtnStyle = {
    background: colorAccent,
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    padding: "9px 26px",
    fontSize: "1.1rem",
    fontWeight: 500,
    marginTop: "6px",
    cursor: "pointer",
    boxShadow: "0 2px 8px rgba(76,175,80,0.09)",
    letterSpacing: "0.03em",
    transition: "background 0.2s",
  };

  return (
    <div style={outerStyle}>
      <div style={statusStyle} data-testid="status-message">
        {statusMsg}
      </div>
      <div style={boardStyle}>
        {Array(9)
          .fill(null)
          .map((_, idx) => renderCell(idx))}
      </div>
      <button
        onClick={restartGame}
        style={restartBtnStyle}
        className="ttt-restart-btn"
        aria-label="Restart game"
        data-testid="restart-btn"
      >
        Restart Game
      </button>
    </div>
  );
}

export default TicTacToeDuel;
