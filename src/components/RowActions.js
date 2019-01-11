import React from "react"
import colors from "../colors"

import ReactTooltip from "react-tooltip"

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
    <ReactTooltip
      id="row-action-tooltip"
      effect="solid"
      getContent={tip => tip}
    />

    <button
      data-for="row-action-tooltip"
      data-tip={`${isCompared ? "Remove from" : "Add to"} comparison list`}
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
      data-for="row-action-tooltip"
      data-tip={`${isFavorite ? "Remove from" : "Add to"} favorite list`}
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
