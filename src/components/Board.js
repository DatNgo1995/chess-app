import React from "react";
import { Square } from "./Square";

export default class Board extends React.Component {
  renderSquare = (i, squareShade, promotePossible, player) => (
    <Square
      piece={this.props.squares[i]}
      style={this.props.squares[i] ? this.props.squares[i].style : null}
      shade={squareShade}
      promotePossible={promotePossible}
      id={i}
      player={player}
      promoteHandle={this.props.promoteHandle}
      onClick={() => this.props.onClick(i)}
    />
  );

  render() {
    const board = [];
    for (let i = 0; i < 8; i++) {
      const squareRows = [];
      for (let j = 0; j < 8; j++) {
        const squareShade =
          (isEven(i) && isEven(j)) || (!isEven(i) && !isEven(j))
            ? "light-square"
            : "dark-square";
        let promotePossible = i === 0 || i === 7;
        let player = i === 0 ? 1 : 2;
        squareRows.push(
          this.renderSquare(i * 8 + j, squareShade, promotePossible, player)
        );
      }
      board.push(<div className="board-row">{squareRows}</div>);
    }

    return <div className="gameboard">{board}</div>;
  }
}

const isEven = num => num % 2 === 0;
