export default class Piece {
  constructor(player, iconUrl) {
    this.player = player;
    this.style = { background: "url('" + iconUrl + "') center center/cover no-repeat" };
  }
}
