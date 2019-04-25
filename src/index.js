import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

{/* Square function receives props as parameter, and shows value */}
function Square(props) {
    {/* This returns the result of handleClick which is in the parent component (Board) */}
    return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
  }

{/* Board begins with 9 null squares, and holds state management variable for player piece */}
class Board extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }
{/* handleClick responds to onClick prop from Square function */}
  handleClick(i){
    {/* We use slice() to create an array that's a copy of the first */}
    const squares = this.state.squares.slice();
    {/* call calculateWinner to determine if game is over, if so we escape the rest of function */}
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    {/* Otherwise: */}
    {/* Then we set the value to X or O for that position in the copy */}
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    {/* Finally we take the copy and overwrite the original squares array */}
    {/* We also change the xIsNext variable within the state */}
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }
  {/* renderSquare for initializing square component (now a function) and establishes handleClick as the handler */}
  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const winner = calculateWinner(this.state.squares);

    let status;

    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
