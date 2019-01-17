import React from "react"

import { titleize } from "../util"

import ice from "../icons/mhw-ice-damage.png"
import water from "../icons/mhw-water-elemental-damage.png"
import thunder from "../icons/mhw-thunder-damage.png"
import dragon from "../icons/mhw-dragon-damage.png"
import poison from "../icons/Poison.png"
import fire from "../icons/mhw-fire-damage.png"
import paralysis from "../icons/Paralysis.png"
import sleep from "../icons/Sleep.png"
import blast from "../icons/Blastblight.png"

import colors from "../colors"

export default ({ value, color, style, makeTitle }) => {
  let imageSrc = false

  if (typeof value === "string") {
    switch (value.substring(0, value.indexOf(" "))) {
      case "ice":
        imageSrc = ice
        break
      case "fire":
        imageSrc = fire
        break
      case "water":
        imageSrc = water
        break
      case "thunder":
        imageSrc = thunder
        break
      case "poison":
        imageSrc = poison
        break
      case "paralysis":
        imageSrc = paralysis
        break
      case "sleep":
        imageSrc = sleep
        break
      case "blast":
        imageSrc = blast
        break
      case "dragon":
        imageSrc = dragon
        break
      default:
        break
    }
  }

  return (
    <div
      style={{
        ...style,
        color: color ? color : colors.lightGrey,
        fontSize: "12px",
        display: "flex",
        alignItems: "center"
      }}>
      {makeTitle ? titleize(value) : value}
      {imageSrc && (
        <img
          src={imageSrc}
          alt={`Icon of ${value} status effect`}
          style={{ width: "20px", height: "20px", objectFit: "contain" }}
        />
      )}
    </div>
  )
}
