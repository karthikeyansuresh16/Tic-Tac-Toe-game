import React, { useState } from "react";
import './TicTacToe.css';
import circle_icon from '../Assets/circle.png';
import Cross_icon from '../Assets/cross.png';

const TicTacToe = () => {
    const [board, setBoard] = useState(Array(9).fill(""));
    const [count, setCount] = useState(0);
    const [lock, setLock] = useState(false);
    const [winner, setWinner] = useState(null);

    function checkWinner(newBoard) {
        const winPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (
                newBoard[a] &&
                newBoard[a] === newBoard[b] &&
                newBoard[a] === newBoard[c]
            ) {
                return newBoard[a];
            }
        }
        return null;
    }

    function toggle(num) {
        if (lock || board[num] !== "" || winner) {
            return;
        }
        const newBoard = [...board];
        newBoard[num] = count % 2 === 0 ? "X" : "O";
        setBoard(newBoard);
        setCount(count + 1);

        const win = checkWinner(newBoard);
        if (win) {
            setWinner(win);
            setLock(true);
        }
    }

    function resetGame() {
        setBoard(Array(9).fill(""));
        setCount(0);
        setLock(false);
        setWinner(null);
    }

    function renderIcon(value) {
        if (value === "X") {
            return <img src={Cross_icon} alt="Cross" />;
        } else if (value === "O") {
            return <img src={circle_icon} alt="Circle" />;
        }
        return null;
    }

    return (
        <div className='container'>
            <h1 className='title'>Tic Tac Toe<span>React</span></h1>
            {winner && (
                <div style={{ color: "#3fa3e6", fontSize: "36px", margin: "20px" }}>
                    The winner is {winner}
                </div>
            )}
            <div className='game-board'>
                <div className="row1">
                    <div className="boxes" onClick={() => toggle(0)}>{renderIcon(board[0])}</div>
                    <div className="boxes" onClick={() => toggle(1)}>{renderIcon(board[1])}</div>
                    <div className="boxes" onClick={() => toggle(2)}>{renderIcon(board[2])}</div>
                </div>
                <div className="row2">
                    <div className="boxes" onClick={() => toggle(3)}>{renderIcon(board[3])}</div>
                    <div className="boxes" onClick={() => toggle(4)}>{renderIcon(board[4])}</div>
                    <div className="boxes" onClick={() => toggle(5)}>{renderIcon(board[5])}</div>
                </div>
                <div className="row3">
                    <div className="boxes" onClick={() => toggle(6)}>{renderIcon(board[6])}</div>
                    <div className="boxes" onClick={() => toggle(7)}>{renderIcon(board[7])}</div>
                    <div className="boxes" onClick={() => toggle(8)}>{renderIcon(board[8])}</div>
                </div>
            </div>
            <button className='reset-button' onClick={resetGame}>Reset Game</button>
        </div>
    );
};

export default TicTacToe;
