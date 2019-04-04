import React from "react";
import "../index.css";
import Square from "./Square";
import Bishop from "./pieces/Bishop";
import Knight from "./pieces/Knight";
import Queen from "./pieces/Queen";
import Rook from "./pieces/Rook";
export default class Promote extends React.Component {
  renderSquare(square) {
    return <Square piece={square} style={square.style} onClick={this.props.promoteHandle.bind(this,square)}/>;
  }
 
  promotePieces = [
    new Queen(this.props.player),
    new Rook(this.props.player),
    new Bishop(this.props.player),
    new Knight(this.props.player)
  ];
  render() {
      let promoteColor = this.props.player===1 ?"white":"black"
    return (
      <div className={"promote promote-"+ promoteColor} id={"promote-"+this.props.id}>
        
          { this.promotePieces.map((ws, index) =>
            this.renderSquare(ws, index)
          )}
        </div>
      
    
    );
  }
}
