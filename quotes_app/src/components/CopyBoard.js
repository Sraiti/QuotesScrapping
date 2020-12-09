import React, { useState, useRef } from "react";
import "../App.css";

export function CopyBoard({ quote }) {
  function handleClick(e) {
    e.preventDefault();
    navigator.clipboard.writeText(quote);
  }
  return (
    <button className="btn" onClick={handleClick}>
      Copy
    </button>
  );
}

export default CopyBoard;
