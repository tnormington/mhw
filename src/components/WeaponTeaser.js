import React, { Component, PureComponent } from "react"

import Meta from "./Meta"
import ElementsMeta from "./ElementsMeta"
import "./Teaser.css"
import SharpnessMeter from "./SharpnessMeter"
import ItemList from "./ItemList"

import colors from "../colors"

import Collapsible from "react-collapsible"
import RowActions from "./RowActions"
import WeaponTeaserMeta from "./WeaponTeaserMeta"
import Teaser from "./Teaser"

// import "./Teaser.css"

export default class WeaponTeaser extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      weapons,
      weapon,
      toggleFavorite,
      toggleWishlist,
      toggleComparison,
      userOptions,
      style,
      selectedMaterials,
      handleCollapseClick,
      handleWeaponClick,
      selectedWeapon,
      open,
      highlight
    } = this.props

    // setup flag variables
    let isFavorite = false,
      isCompared = false,
      isWishlist = false

    // check favorites
    if (userOptions.has("favorites"))
      isFavorite = userOptions
        .get("favorites")
        .get("weapons")
        .includes(weapon.id)

    // check comparisons
    if (userOptions.has("comparisons"))
      isCompared = userOptions
        .get("comparisons")
        .get("weapons")
        .includes(weapon.id)

    // check wishlist
    if (userOptions.has("wishlist"))
      isWishlist = userOptions
        .get("wishlist")
        .get("weapons")
        .includes(weapon.id)

    const hasIcon = weapon.assets && weapon.assets.icon

    return (
      <Teaser
        onClick={() => handleWeaponClick(weapon.id)}
        highlight={highlight}
        style={style}>
        <React.Fragment>
          {hasIcon && (
            <img
              style={{
                marginRight: "10px",
                width: "30px",
                height: "30px",
                objectFit: "contain",
                flex: "0 0 30px"
              }}
              src={weapon.assets.icon}
              alt={`Icon for ${weapon.name}`}
            />
          )}

          <div style={{ marginLeft: hasIcon ? "" : "40px", width: "100%" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                // borderBottom: `2px solid ${
                //   highlight ? colors.lightGrey : colors.grey
                // }`,
                marginBottom: "4px",
                paddingBottom: "4px",
                transition: "all 0.15s ease-out",
                position: "relative"
              }}>
              {weapon.name}
              <div
                style={{
                  position: "absolute",
                  flex: 1,
                  top: "2px",
                  right: 0
                }}>
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
                  item={weapon}
                />
              </div>
            </div>
            <WeaponTeaserMeta weapon={weapon} selectedWeapon={selectedWeapon} />
          </div>
        </React.Fragment>
      </Teaser>
    )
  }
}
