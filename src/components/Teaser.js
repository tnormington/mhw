import React from "react"
import "./Teaser.css"

export default ({ children, onClick, highlight, style }) => {
  return (
    <div
      onClick={onClick}
      className={`teaser ${highlight ? "active" : ""}`}
      style={{
        ...style,
        display: "flex",
        color: "#fff"
      }}>
      {children}
    </div>
  )
}
