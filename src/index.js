import React from "react";
import ReactDOM from "react-dom";
import { initialiseChessBoard } from "./components/ui/helper";
import "./index.css";
import Game from "./components/ui/Game";
import { Provider } from 'react-redux';
import storeFactory from './store'
/*
const initialState = (localStorage["redux-store"]) ?
JSON.parse(localStorage["redux-store"]) :{
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
  const saveState = () => 
  localStorage["redux-store"] = JSON.stringify(store.getState())
  const store = storeFactory(initialState)
store.subscribe(saveState)
window.store = store
 */
ReactDOM.render(
        <div>
        <Game />
       
        </div>
    
    , document.getElementById("root"));
