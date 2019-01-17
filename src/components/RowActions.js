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
  <div style={{ ...style, position: "relative" }}>
    <ReactTooltip
      id={`row-action-tooltip_${item.id}`}
      effect="solid"
      getContent={tip => tip}
    />

    <button
      data-for={`row-action-tooltip_${item.id}`}
      data-tip={`${isCompared ? "Remove from" : "Add to"} comparison list`}
      className="no-active no-pad"
      style={{
        marginLeft: "10px",
        color: isCompared ? "#287CD8" : "",
        border: "none",
        zIndex: 10
      }}
      onClick={e => toggleComparison(e, item.id)}>
      <i className="fas fa-clipboard-list" />
    </button>

    <button
      data-for={`row-action-tooltip_${item.id}`}
      data-tip={`${isFavorite ? "Remove from" : "Add to"} favorite list`}
      className="no-active no-pad"
      style={{
        marginLeft: "10px",
        color: isFavorite ? "#DB9839" : "",
        border: "none",
        zIndex: 10
      }}
      onClick={e => toggleFavorite(e, item.id)}>
      <i className={isFavorite ? "fas fa-star" : "far fa-star"} />
    </button>
  </div>
)
