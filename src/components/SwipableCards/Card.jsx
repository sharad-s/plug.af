import React from "react";

const cardStyles = {
  cursor: "pointer",
  userSelect: "none",
  position: "fixed",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  top: 0
};

const Card = ({ zIndex = 0, children }) => (
  <div style={{ ...cardStyles, zIndex }} id="CARD">{children}</div>
);

export default Card;