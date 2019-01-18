import React from "react"
import colors from "../colors"

import ReactTooltip from "react-tooltip"

const RowActionButton = ({
  active,
  item,
  listName,
  activeColor,
  icon,
  onClick
}) => (
  <button
    data-for={`row-action-tooltip_${item.id}`}
    data-tip={`${active ? "Remove from" : "Add to"} ${listName}`}
    className="no-pad"
    style={{
      marginLeft: "10px",
      color: active ? activeColor : "",
      border: "none",
      zIndex: 10
    }}
    onClick={onClick}>
    <i className={`${icon}`} />
  </button>
)

export default ({
  isCompared,
  isFavorite,
  isWishlist,
  toggleComparison,
  toggleFavorite,
  toggleWishlist,
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

    <RowActionButton
      onClick={e => toggleComparison(e, item.id)}
      active={isCompared}
      item={item}
      listName="comparisons list"
      activeColor={colors.blue}
      icon="fas fa-exchange-alt"
    />

    <RowActionButton
      onClick={e => toggleFavorite(e, item.id)}
      active={isFavorite}
      item={item}
      listName="favorites"
      activeColor={colors.orange}
      icon={isFavorite ? "fas fa-star" : "far fa-star"}
    />

    <RowActionButton
      onClick={e => toggleWishlist(e, item.id)}
      active={isWishlist}
      item={item}
      listName="wishlist"
      activeColor={colors.green}
      icon="fas fa-clipboard-list"
    />
  </div>
)
