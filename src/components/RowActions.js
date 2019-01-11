import React from "react"
import colors from "../colors"

export default ({
  isCompared,
  isFavorite,
  toggleComparison,
  toggleFavorite,
  item,
  style,
  open
}) => (
  <div style={style}>
    <button
      className="no-active no-pad"
      style={{
        marginLeft: "10px",
        color: isCompared ? "#287CD8" : "",
        border: "none"
      }}
      onClick={e => toggleComparison(e, item.id)}>
      <i className="fas fa-clipboard-list" />
    </button>

    <button
      className="no-active no-pad"
      style={{
        marginLeft: "10px",
        color: isFavorite ? "#DB9839" : "",
        border: "none"
      }}
      onClick={e => toggleFavorite(e, item.id)}>
      <i className={isFavorite ? "fas fa-star" : "far fa-star"} />
    </button>

    <button
      className="no-active no-pad"
      style={{
        marginLeft: "10px",
        border: "none"
      }}
      onClick={() => {}}>
      <i
        className="fas fa-caret-down"
        style={{
          color: open ? colors.blue : "inherit",
          transition: "all 0.25s ease-out",
          transform: open ? "rotateX(180deg)" : ""
        }}
      />
    </button>
  </div>
)
