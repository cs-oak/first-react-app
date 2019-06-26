import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return ([
        <Game/>
    ]);
  }
}

class Square extends Component {
    render() {
        return (
            <button className={"square"} onClick={() => this.props.onClick()}>
                {this.props.value}
            </button>
        );
    }
}

class Board extends Component {
    renderSquare(i) {
        return (
            <Square value={this.props.squares[i]} onClick={() => this.props.onClick(i)}/>
        );
    }

    render() {
        return(
            <div>
                <div className={"board-row"}>
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                    {this.renderSquare(3)}
                </div>
                <div className={"board-row"}>
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                    {this.renderSquare(6)}
                </div>
                <div className={"board-row"}>
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                    {this.renderSquare(9)}
                </div>
            </div>
        );
    }
}

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{squares: Array(9).fill(null)}],
            xIsNext: true,
            step: 0
        }
    }

    jumpTo(stepNumber) {
        this.setState({step: stepNumber, xIsNext: (stepNumber%2)===0})
    }

    handleClicked(i) {
        const history = this.state.history.slice(0, this.state.step+1);
        const current = history[this.state.step];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
            }]),
            xIsNext: !this.state.xIsNext,
            step: history.length
        });
    }

    render() {
        const history = this.state.history;
        const current = this.state.history[this.state.step];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const desc = move ?
                'Go to move #' + move :
                'Go to game start';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });

        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return(
          <div className={"game"}>
              <div className={"board"}>
                  <Board squares={current.squares} onClick={(i) => this.handleClicked(i)}/>
              </div>
              <div className={"game-info"}>
                  <div>{status}</div>
                  <div>{moves}</div>
              </div>
          </div>
        );
    }
}

function calculateWinner(squares) {
    const lines = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

export default App;
