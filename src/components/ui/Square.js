import React from "react";
import "../../index.css";
import Promote from "./Promote";
export const Square = props => 
  <div className={"square " + props.shade}>
    <button
      className={"square " + props.shade}
      onClick={props.onClick}
      style={props.style}
    />
    {props.promotePossible ? (
      <Promote
        player={props.player}
        id={props.id}
        promoteHandle={props.promoteHandle}
      />
    ) : null}
  </div>

