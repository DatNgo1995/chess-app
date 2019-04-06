import React from "react";
import "../index.css";
import Board from "./Board";
import FallenSoldierBlock from "./FallenSoldierBlock";
import initialiseChessBoard from "./helper";
import Rook from "./pieces/Rook";

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
      enPassantPossible: -1, // for black : 24-31, for white 32-39
      //check for castle
      castlePosibility: {
        rookA1Moved: false, //check if white left rook moved
        rookA8Moved: false, //check if black right rook moved
        rookH1Moved: false, //check if white left rook moved
        rookH8Moved: false, //check if black right rook moved
        kingE1Moved: false, //check if white king moved
        kingE8Moved: false //check if black king moved
      },
      promotePiece: "",
      promotePossible: false
    };
  }

  handleClick(i) {
    let { sourceSelection, enPassantPossible, player } = this.state;
    const squares = this.state.squares.slice();
    const isSourceSelectionnotCorrect = !squares[i] || squares[i].player !== player
    if (sourceSelection === -1) {
      if (isSourceSelectionnotCorrect) {
        this.setState({
          status: "Wrong selection. Choose player " + player + " pieces."
        });
      } else {
        this.setState({
          status: "Choose destination for the selected piece",
          sourceSelection: i
        });
      }
    } else if (sourceSelection > -1) {
      if (squares[i] && squares[i].player === player) {
        this.setState({
          status: "Wrong selection. Choose valid source and destination again.",
          sourceSelection: -1
        });
      } else {
        const squares = this.state.squares.slice();
        const whiteFallenSoldiers = this.state.whiteFallenSoldiers.slice();
        const blackFallenSoldiers = this.state.blackFallenSoldiers.slice();
        const isDestEnemyOccupied = squares[i] ? true : false;
        const isMovePossible = squares[sourceSelection].isMovePossible(
          sourceSelection,
          i,
          isDestEnemyOccupied,
          enPassantPossible === i - 8 || enPassantPossible === i + 8
        );
        const srcToDestPath = squares[sourceSelection].getSrcToDestPath(
          sourceSelection,
          i
        );
        const isMoveLegal = this.isMoveLegal(srcToDestPath);

        const canEnPassant =
          ((enPassantPossible >= 24 &&
            enPassantPossible <= 31 &&
            i === enPassantPossible - 8) ||
            (enPassantPossible >= 32 &&
              enPassantPossible <= 39 &&
              i === enPassantPossible + 8)) &&
          squares[sourceSelection].name === "pawn";
        const castleThisMove =
          squares[sourceSelection].name === "king" &&
          srcToDestPath.length === 1;
        const enableEnPassant =
          srcToDestPath.length === 1 &&
          squares[sourceSelection].name === "pawn";

        if (isMovePossible && isMoveLegal) {
          if (squares[i]) {
            if (squares[i].player === 1) {
              whiteFallenSoldiers.push(squares[i]);
            } else {
              blackFallenSoldiers.push(squares[i]);
            }
          }
          // implement en passant
          else if (canEnPassant) {
            squares[enPassantPossible] = null;
          }
          // implement castle
          else if (castleThisMove) {
            this.castleImplement(i,sourceSelection,player,squares)
          }
          //set enPassantPossible
          enableEnPassant
            ? this.setState({ enPassantPossible: i })
            : this.setState({ enPassantPossible: -1 });

          //implement Promote
          if (squares[sourceSelection].name === "pawn") {
            this.promoteImplement(player,i) 
          }

          squares[i] = !this.state.promotePossible
            ? squares[sourceSelection]
            : squares[i];
          squares[sourceSelection] = null;
          let newPlayer = player === 1 ? 2 : 1;
          let turn = this.state.turn === "white" ? "black" : "white";
          this.castleSetState(sourceSelection);

          this.setState({
            sourceSelection: -1,
            squares: squares,
            whiteFallenSoldiers: whiteFallenSoldiers,
            blackFallenSoldiers: blackFallenSoldiers,
            player: newPlayer,
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

  castleSetState = (sourceSelection) => {
    
    // check castle conditions
    if (sourceSelection === 0) {
      this.setState({
        castlePosibility: {
          ...this.state.castlePosibility,
          rookA8Moved: true
        }
      });
    }
    if (sourceSelection === 7) {
      this.setState({
        castlePosibility: {
          ...this.state.castlePosibility,
          rookH8Moved: true
        }
      });
    }
    if (sourceSelection === 56) {
      this.setState({
        castlePosibility: {
          ...this.state.castlePosibility,
          rookA1Moved: true
        }
      });
    }
    if (sourceSelection === 63) {
      this.setState({
        castlePosibility: {
          ...this.state.castlePosibility,
          rookH1Moved: true
        }
      });
    }
    if (sourceSelection === 4) {
      this.setState({
        castlePosibility: {
          ...this.state.castlePosibility,
          kingE8Moved: true
        }
      });
    }
    if (sourceSelection === 60) {
      this.setState({
        castlePosibility: {
          ...this.state.castlePosibility,
          kingE1Moved: true
        }
      });
    }
  };
  
  promoteHandle = piece => {
    this.setState({ promotePiece: piece }, () => {
      document.getElementById(
        "promote-" + this.state.destination
      ).style.display = "none";
      let squares = this.state.squares.slice();
      squares[this.state.destination] = this.state.promotePiece;
      this.setState({ squares: squares });
    });
  };
  castleImplement = (i,sourceSelection,player,squares) => {
    if (i > sourceSelection) {
      squares[i + 1] = null;
      squares[i - 1] = new Rook(player);
      console.log(i, squares[i + 3], squares[i + 1]);
    } else {
      squares[i - 2] = null;
      squares[i + 1] = new Rook(player);
    }
  }
  promoteImplement = (player,i) => {
    if (player === 1 && [0, 1, 2, 3, 4, 5, 6, 7].indexOf(i) > 0) {
      document.getElementById("promote-" + i).style.display = "flex";
      this.setState({ destination: i, promotePossible: true });
    }
    if (
      player === 2 &&
      [56, 57, 58, 59, 60, 61, 62, 63].indexOf(i) > 0
    ) {
      document.getElementById("promote-" + i).style.display = "flex";
      this.setState({ destination: i, promotePossible: true });
    }
  }
  render() {
    return (
      <div>
        <div className="game">
          <div className="game-board">
            <Board
              squares={this.state.squares}
              onClick={i => this.handleClick(i)}
              promoteHandle={this.promoteHandle}
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
