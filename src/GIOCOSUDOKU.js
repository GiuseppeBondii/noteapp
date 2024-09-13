import React, { useState, useEffect, useCallback } from 'react';
import './GIOCOSUDOKU.css';


const CompactSudoku = () => {
  const [difficulty, setDifficulty] = useState('easy');
  const [board, setBoard] = useState(Array(9).fill().map(() => Array(9).fill(0)));
  const [initialBoard, setInitialBoard] = useState(Array(9).fill().map(() => Array(9).fill(0)));
  const [selectedCell, setSelectedCell] = useState([null, null]);

  const fetchBoard = useCallback(() => {
    fetch(`https://sugoku.onrender.com/board?difficulty=${difficulty}`)
      .then(response => response.json())
      .then(data => {
        setBoard(data.board);
        setInitialBoard(data.board.map(row => [...row]));
      });
  }, [difficulty]);

  const updateCell = (row, col, number) => {
    if (initialBoard[row][col] === 0) {
      const newBoard = board.map(row => [...row]);
      newBoard[row][col] = number;
      setBoard(newBoard);
    }
  };

  useEffect(() => {
    fetchBoard();
  }, [fetchBoard]);

  const renderCell = (value, rowIndex, colIndex) => {
    const isSelected = selectedCell[0] === rowIndex && selectedCell[1] === colIndex;
    const isGiven = initialBoard[rowIndex][colIndex] !== 0;
    const isEditable = !isGiven;
    return (
      <div
        key={`${rowIndex}-${colIndex}`}
        className={`sudoku-cell ${isSelected ? 'selected' : ''} ${isGiven ? 'given' : ''} ${isEditable ? 'editable' : ''}`}
        onClick={() => isEditable && setSelectedCell([rowIndex, colIndex])}
      >
        {value !== 0 ? value : ''}
      </div>
    );
  };

  return (
    <div className="container py-4">
      <div className="row justify-content-center mb-4">
        <div className="col-6">
          <select 
            value={difficulty} 
            onChange={(e) => setDifficulty(e.target.value)}
            className="form-select me-2"
            style={{maxWidth: '200px'}}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
            <option value="random">Random</option>
          </select>
          <button onClick={fetchBoard} >New Game</button>
        </div>
      </div>
      <div className="sudoku-game-container">
        <div className="sudoku-board">
          {board.map((row, rowIndex) => (
            <div key={rowIndex} className="sudoku-row">
              {row.map((cell, colIndex) => renderCell(cell, rowIndex, colIndex))}
            </div>
          ))}
        </div>
        <div className="number-pad">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(number => (
            <button
              key={number}
              onClick={() => {
                if (selectedCell[0] !== null && selectedCell[1] !== null) {
                  updateCell(selectedCell[0], selectedCell[1], number);
                }
              }}
              className="btn btn-outline-primary number-btn"
            >
              {number}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompactSudoku;