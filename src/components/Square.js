import React from 'react';
import '../index.css';
import Promote from './Promote'
export default function Square(props) {
    return (
      <div className={"square " + props.shade}>
      <button className={"square " + props.shade}
      onClick={props.onClick}
      style={props.style}>
      </button>
      {props.promotePossible? <Promote/>:null}
      </div>
    );
  
}