import React, { PureComponent } from "react"

import "./Teaser.css"

import colors from "../colors"

import RowActions from "./RowActions"

import ArmorTeaserMeta from "./ArmorTeaserMeta"
// import Meta from './Meta'
// import TeaserMeta from "./WeaponTeaserMeta"

// Icons
import head from "../icons/mhw-helm-headgear-wiki.png"
import waist from "../icons/mhw-waist-belt-wiki.png"
import legs from "../icons/mhw-feet-boots-greaves.png"
import gloves from "../icons/mhw-arm-gauntlets-wiki.png"
import chest from "../icons/mhw-torso-chest-plate-wiki.png"

// import charms from "../icons/mhw-charms-wiki.png"
// import decorations from "../icons/mhw-decorations-wiki.png"
// import palico from "../icons/mhw-palico-equipment-skills.png"

export default class ArmorTeaser extends PureComponent {
  constructor(props) {
    super(props)

    this.imageSrc = false
    switch (this.props.armorPiece.type) {
      case "waist":
        this.imageSrc = waist
        break
      case "legs":
        this.imageSrc = legs
        break
      case "head":
        this.imageSrc = head
        break
      case "head":
        this.imageSrc = head
        break
      case "gloves":
        this.imageSrc = gloves
        break
      case "chest":
        this.imageSrc = chest
        break
      default:
        break
    }
  }

  render() {
    const { armor, armorPiece, style, handleArmorClick, highlight } = this.props

    // setup flag variables
    let isFavorite = false,
      isCompared = false

    // // check favorites
    // if (userOptions.has("favorites")) {
    //   isFavorite = userOptions.get("favorites").includes(weapon.id)
    // }

    // // check comparisons
    // if (userOptions.has("comparisons")) {
    //   isCompared = userOptions.get("comparisons").includes(weapon.id)
    // }

    // const hasIcon = armorPiece.assets && armorPiece.assets.icon

    return (
      <div
        onClick={() => handleArmorClick(armorPiece.id)}
        className="weapon-teaser"
        style={{
          ...style,
          display: "flex",
          color: "#fff",
          backgroundColor: highlight ? colors.medGrey : ""
        }}>
        {this.imageSrc && (
          <img
            style={{
              marginRight: "10px",
              width: "30px",
              height: "30px",
              objectFit: "contain",
              flex: "0 0 30px"
            }}
            src={this.imageSrc}
            alt={`Icon for ${armorPiece.name}`}
          />
        )}

        <div style={{ marginLeft: this.imageSrc ? "" : "40px", width: "100%" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              borderBottom: `2px solid ${
                highlight ? colors.lightGrey : colors.grey
              }`,
              marginBottom: "4px",
              paddingBottom: "4px",
              transition: "all 0.15s ease-out",
              position: "relative"
            }}>
            {armorPiece.name}
            <div
              style={{
                position: "absolute",
                flex: 1,
                top: "2px",
                right: 0
              }}>
              {/* <RowActions
                style={{
                  display: "flex",
                  justifyContent: "flex-end"
                }}
                isCompared={isCompared}
                isFavorite={isFavorite}
                toggleComparison={toggleComparison}
                toggleFavorite={toggleFavorite}
                item={armorPiece}
                open={open}
              /> */}
            </div>
          </div>
          <ArmorTeaserMeta
            armorPiece={armorPiece}
            selectedArmorPiece={armorPiece}
          />
        </div>
      </div>
    )
  }
}
