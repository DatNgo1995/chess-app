import Piece from "./Pieces";

export default class King extends Piece {
  constructor(player) {
    super(
      player,
      player === 1
        ? "https://upload.wikimedia.org/wikipedia/commons/4/42/Chess_klt45.svg"
        : "https://upload.wikimedia.org/wikipedia/commons/f/f0/Chess_kdt45.svg"
    );
  }
  name = "king";

  isMovePossible(src, dest, enPassant, castleProperty) {
    let whiteCastleShort =
        src === 60 &&
        dest === 62 &&
        !castleProperty.kingE1Moved &&
        !castleProperty.rookH1Moved,
      whiteCastleLong =
        src === 60 &&
        dest === 58 &&
        !castleProperty.kingE1Moved &&
        !castleProperty.rookA1Moved,
      blackCastleShort =
        src === 4 &&
        dest === 6 &&
        !castleProperty.kingE8Moved &&
        !castleProperty.rookH8Moved,
      blackCastleLong =
        src === 4 &&
        dest === 2 &&
        !castleProperty.kingE1Moved &&
        !castleProperty.rookA8Moved;
        console.log(whiteCastleShort)
    return (
      src - 9 === dest ||
      src - 8 === dest ||
      src - 7 === dest ||
      src + 1 === dest ||
      src + 9 === dest ||
      src + 8 === dest ||
      src + 7 === dest ||
      src - 1 === dest ||
      whiteCastleShort ||
      whiteCastleLong ||
      blackCastleShort ||
      blackCastleLong
    );
  }

  /**
   * always returns empty array because of one step
   * @return {[]}
   */
  getSrcToDestPath(src, dest) {
    if (src - dest === 2) return [src - 1];
    if (src - dest === -2) return [src + 1];

    return [];
  }
}
