import React, { PureComponent } from "react"

// import "./Teaser.css"

import colors from "../colors"

import RowActions from "./RowActions"

import ArmorTeaserMeta from "./ArmorTeaserMeta"
import Icon from "./Icon"
import Teaser from "./Teaser"

export default class ArmorTeaser extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      armor,
      armorPiece,
      style,
      handleArmorClick,
      highlight,
      toggleComparison,
      toggleFavorite,
      toggleWishlist,
      userOptions,
      skills
    } = this.props

    // setup flag variables
    let isFavorite = false,
      isCompared = false,
      isWishlist = false

    // check favorites
    if (userOptions.has("favorites")) {
      isFavorite = userOptions
        .get("favorites")
        .get("armor")
        .includes(armorPiece.id)
    }

    // check comparisons
    if (userOptions.has("comparisons")) {
      isCompared = userOptions
        .get("comparisons")
        .get("armor")
        .includes(armorPiece.id)
    }

    // check wishlist
    if (userOptions.has("wishlist")) {
      isWishlist = userOptions
        .get("wishlist")
        .get("armor")
        .includes(armorPiece.id)
    }

    // const hasIcon = armorPiece.assets && armorPiece.assets.icon

    return (
      <Teaser
        onClick={() => handleArmorClick(armorPiece.id)}
        highlight={highlight}
        style={style}>
        <Icon icon={armorPiece.type} size={30} />
        <div style={{ marginLeft: "10px", width: "100%" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "4px",
              paddingBottom: "4px",
              position: "relative"
            }}>
            {armorPiece.name}
            <RowActions
              style={{
                display: "flex",
                justifyContent: "flex-end"
              }}
              isCompared={isCompared}
              isFavorite={isFavorite}
              isWishlist={isWishlist}
              toggleComparison={toggleComparison}
              toggleFavorite={toggleFavorite}
              toggleWishlist={toggleWishlist}
              item={armorPiece}
            />
          </div>
          <ArmorTeaserMeta
            armorPiece={armorPiece}
            selectedArmorPiece={armorPiece}
            skills={skills}
          />
        </div>
      </Teaser>
    )
  }
}
