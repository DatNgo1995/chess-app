import React from "react";
import "../index.css";
import Board from "./Board";
import FallenSoldierBlock from "./FallenSoldierBlock";
import initialiseChessBoard from "./helper";
import Rook from "./pieces/Rook";
import Promote from "./Promote";
export default class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      squares: initialiseChessBoard(),
      whiteFallenSoldiers: [],
      blackFallenSoldiers: [],
      player: 1,
      sourceSelection: -1,
      status: "",
      turn: "white",
      enPassantPossible: -1, // for white : 24-31, for black 32-39
      //check for castle
      castlePosibility: {
        rookA1Moved: false, //check if white left rook moved
        rookA8Moved: false, //check if black right rook moved
        rookH1Moved: false, //check if white left rook moved
        rookH8Moved: false, //check if black right rook moved
        kingE1Moved: false, //check if white king moved
        kingE8Moved: false //check if black king moved
      },
      promotePiece : "",
      promotePossible: false
    };
  }
  promoteHandle = (piece)  => {
    console.log(piece, this.state.destination)
    this.setState({promotePiece : piece})
    document.getElementById("promote-" + this.state.destination).style.display = "none";
    let squares = this.state.squares.slice()
    squares[this.state.destination] = this.state.promotePiece
    this.setState({squares : squares})
  }
  handleClick(i) {
    const squares = this.state.squares.slice();
    if (this.state.sourceSelection === -1) {
      if (!squares[i] || squares[i].player !== this.state.player) {
        this.setState({
          status:
            "Wrong selection. Choose player " + this.state.player + " pieces."
        });
        //if (squares[i]) delete squares[i].style.backgroundColor
      } else {
        //squares[i].style = {...squares[i].style, backgroundColor: "RGB(111,143,114)"}; // Emerald from http://omgchess.blogspot.com/2015/09/chess-board-color-schemes.html
        this.setState({
          status: "Choose destination for the selected piece",
          sourceSelection: i
        });
      }
    } else if (this.state.sourceSelection > -1) {
      //delete squares[this.state.sourceSelection].style.backgroundColor;
      if (squares[i] && squares[i].player === this.state.player) {
        this.setState({
          status: "Wrong selection. Choose valid source and destination again.",
          sourceSelection: -1
        });
      } else {
        const squares = this.state.squares.slice();
        const whiteFallenSoldiers = this.state.whiteFallenSoldiers.slice();
        const blackFallenSoldiers = this.state.blackFallenSoldiers.slice();
        const isDestEnemyOccupied = squares[i] ? true : false;
        const isMovePossible = squares[
          this.state.sourceSelection
        ].isMovePossible(
          this.state.sourceSelection,
          i,
          isDestEnemyOccupied,
          this.state.enPassantPossible === i - 8 ||
            this.state.enPassantPossible === i + 8
        );
        const srcToDestPath = squares[
          this.state.sourceSelection
        ].getSrcToDestPath(this.state.sourceSelection, i);
        const isMoveLegal = this.isMoveLegal(srcToDestPath);
        let enPassantPossible = this.state.enPassantPossible;

        if (isMovePossible && isMoveLegal) {
          if (squares[i] !== null) {
            if (squares[i].player === 1) {
              whiteFallenSoldiers.push(squares[i]);
            } else {
              blackFallenSoldiers.push(squares[i]);
            }
          }
          // implement en passant
          else if (
            ((enPassantPossible >= 24 &&
              enPassantPossible <= 31 &&
              i === enPassantPossible - 8) ||
              (enPassantPossible >= 32 &&
                enPassantPossible <= 39 &&
                i === enPassantPossible + 8)) &&
            squares[this.state.sourceSelection].name === "pawn"
          ) {
            squares[enPassantPossible] = null;
          }
          // implement castle
          else if (
            squares[this.state.sourceSelection].name === "king" &&
            srcToDestPath.length === 1
          ) {
            if (i > this.state.sourceSelection) {
              squares[i + 1] = null;
              squares[i - 1] = new Rook(this.state.player);
              console.log(i, squares[i + 3], squares[i + 1]);
            } else {
              squares[i - 2] = null;
              squares[i + 1] = new Rook(this.state.player);
            }
          }
          //set enPassantPossible
          if (
            srcToDestPath.length === 1 &&
            squares[this.state.sourceSelection].name === "pawn"
          ) {
            this.setState({ enPassantPossible: i });
          } else {
            this.setState({ enPassantPossible: -1 });
          }
          //implement Promote
          if (squares[this.state.sourceSelection].name === "pawn") {
            if (
              this.state.player === 1 &&
              [0, 1, 2, 3, 4, 5, 6, 7].indexOf(i) > 0
            ) {
              document.getElementById("promote-" + i).style.display = "flex";
              this.setState ({destination: i, promotePossible:true})
              
              
            }
            if (
              this.state.player === 2 &&
              [56, 57, 58, 59, 60, 61, 62, 63].indexOf(i) > 0
            ) {
              document.getElementById("promote-" + i).style.display = "flex";
              this.setState ({destination: i, promotePossible:true})
              
              
            }
          }
          
          squares[i] = !this.state.promotePossible ?  squares[this.state.sourceSelection] : squares[i]
          squares[this.state.sourceSelection] = null;
          let player = this.state.player === 1 ? 2 : 1;
          let turn = this.state.turn === "white" ? "black" : "white";
          // check castle conditions
          if (this.state.sourceSelection === 0) {
            this.setState({
              castlePosibility: {
                ...this.state.castlePosibility,
                rookA8Moved: true
              }
            });
          }
          if (this.state.sourceSelection === 7) {
            this.setState({
              castlePosibility: {
                ...this.state.castlePosibility,
                rookH8Moved: true
              }
            });
          }
          if (this.state.sourceSelection === 56) {
            this.setState({
              castlePosibility: {
                ...this.state.castlePosibility,
                rookA1Moved: true
              }
            });
          }
          if (this.state.sourceSelection === 63) {
            this.setState({
              castlePosibility: {
                ...this.state.castlePosibility,
                rookH1Moved: true
              }
            });
          }
          if (this.state.sourceSelection === 4) {
            this.setState({
              castlePosibility: {
                ...this.state.castlePosibility,
                kingE8Moved: true
              }
            });
          }
          if (this.state.sourceSelection === 60) {
            this.setState({
              castlePosibility: {
                ...this.state.castlePosibility,
                kingE1Moved: true
              }
            });
          }

          this.setState({
            sourceSelection: -1,
            squares: squares,
            whiteFallenSoldiers: whiteFallenSoldiers,
            blackFallenSoldiers: blackFallenSoldiers,
            player: player,
            status: "",
            turn: turn,
            promotePossible: false
          });
        } else {
          this.setState({
            status:
              "Wrong selection. Choose valid source and destination again.",
            sourceSelection: -1
          });
        }
      }
    }
  }

  /**
   * Check all path indices are null. For one steps move of pawn/others or jumping moves of knight array is empty, so  move is legal.
   * @param  {[type]}  srcToDestPath [array of board indices comprising path between src and dest ]
   * @return {Boolean}
   */
  isMoveLegal(srcToDestPath) {
    let isLegal = true;
    for (let i = 0; i < srcToDestPath.length; i++) {
      if (this.state.squares[srcToDestPath[i]] !== null) {
        isLegal = false;
      }
    }
    return isLegal;
  }



  render() {
    return (
      <div>
        <div className="game">
          <div className="game-board">
            <Board
              squares={this.state.squares}
              onClick={i => this.handleClick(i)}
              promoteHandle = {this.promoteHandle}
            />
          </div>
          <div className="game-info">
            <h3>Turn</h3>
            <div
              id="player-turn-box"
              style={{ backgroundColor: this.state.turn }}
            />
            <div className="game-status">{this.state.status}</div>

            <div className="fallen-soldier-block">
              {
                <FallenSoldierBlock
                  whiteFallenSoldiers={this.state.whiteFallenSoldiers}
                  blackFallenSoldiers={this.state.blackFallenSoldiers}
                />
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}
