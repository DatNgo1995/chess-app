import React from "react";
import "../index.css";
import Square from "./Square";
import Bishop from "./pieces/Bishop";
import Knight from "./pieces/Knight";
import Queen from "./pieces/Queen";
import Rook from "./pieces/Rook";
export default class Promote extends React.Component {
  renderSquare(square, i, squareShade) {
    return <Square piece={square} style={square.style} onClick = {this.selectPromotePieces.bind(this,square)}/>;
  }
  selectPromotePieces = (square) => {
      return square
  }
  promotePieces = [
    new Queen(this.props.player),
    new Rook(this.props.player),
    new Bishop(this.props.player),
    new Knight(this.props.player)
  ];
  render() {
    return (
      <div className="promote">
        <div className="board-row">
          { this.promotePieces.map((ws, index) =>
            this.renderSquare(ws, index)
          )}
        </div>
      
      </div>
    );
  }
}
