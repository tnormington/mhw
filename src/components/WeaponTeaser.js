import React, { Component, PureComponent } from "react"

import Meta from "./Meta"
import ElementsMeta from "./ElementsMeta"
import "./WeaponTeaser.css"
import SharpnessMeter from "./SharpnessMeter"
import ItemList from "./ItemList"

import colors from "../colors"

import Collapsible from "react-collapsible"
import RowActions from "./RowActions"
import WeaponTeaserMeta from "./WeaponTeaserMeta"

export default class WeaponTeaser extends PureComponent {
  constructor(props) {
    super(props)

    // this.ref = React.createRef()
    // this.props.addHeight(this.ref.clientHeight)
  }

  componentDidMount() {
    // console.log(this.ref)
  }

  render() {
    const {
      weapons,
      weapon,
      toggleFavorite,
      userOptions,
      toggleComparison,
      style,
      selectedMaterials,
      handleCollapseClick,
      handleWeaponClick,
      open,
      highlight
    } = this.props

    // setup flag variables
    let isFavorite = false,
      isCompared = false

    // check favorites
    if (userOptions.has("favorites")) {
      isFavorite = userOptions.get("favorites").includes(weapon.id)
    }

    // check comparisons
    if (userOptions.has("comparisons")) {
      isCompared = userOptions.get("comparisons").includes(weapon.id)
    }

    const hasIcon = weapon.assets && weapon.assets.icon

    return (
      <div
        onClick={() => handleWeaponClick(weapon.id)}
        className="weapon-teaser"
        style={{
          ...style,
          display: "flex",
          color: "#fff",
          backgroundColor: highlight ? colors.medGrey : ""
        }}>
        {1 === 0 && hasIcon && (
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
              borderBottom: `2px solid ${
                highlight ? colors.lightGrey : colors.grey
              }`,
              marginBottom: "4px",
              paddingBottom: "4px",
              transition: "all 0.15s ease-out"
            }}>
            {weapon.name}
            <RowActions
              style={{
                display: "flex",
                justifyContent: "flex-end",
                flex: 1
              }}
              isCompared={isCompared}
              isFavorite={isFavorite}
              toggleComparison={toggleComparison}
              toggleFavorite={toggleFavorite}
              item={weapon}
              open={open}
            />
          </div>
          <WeaponTeaserMeta weapon={weapon} />
        </div>
      </div>
    )
  }
}
