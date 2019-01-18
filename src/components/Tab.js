import React from "react"
// import "./Tab.css"

import Icon from "./Icon"

import greatSword from "../icons/mhw_greatsword-icon.png"
import longSword from "../icons/mhw_longswords-icon.png"
import swordAndShield from "../icons/mhw_sword-shield-icon.png"
import dualBlades from "../icons/mhw_dual-blades-icon.png"
import hammer from "../icons/mhw_hammers-icon.png"
import huntingHorn from "../icons/mhw_hunting-horns-icon.png"
import lance from "../icons/mhw_lances-icon.png"
import gunlance from "../icons/mhw_gunlance-icon.png"
import lightBowgun from "../icons/mhw_light-bowgun-icon.png"
import switchAxe from "../icons/mhw_switch-axe-icon.png"
import chargeBlade from "../icons/mhw_charge-blade-icon.png"
import insectGlaive from "../icons/mhw_insect-glaive-icon.png"
import heavyBowgun from "../icons/mhw_heavy-bowgun-icon.png"
import bow from "../icons/mhw_bow-icon.png"
import { elementColors } from "../colors"

export default ({ label, onClick, active, clean, style }) => {
  let icon = false,
    color = false,
    faIcon = false

  switch (label) {
    case "fire":
      color = elementColors.fire
      break
    case "dragon":
      color = elementColors.dragon
      break
    case "blast":
      color = elementColors.blast
      break
    case "sleep":
      color = elementColors.sleep
      break
    case "water":
      color = elementColors.water
      break
    case "ice":
      color = elementColors.ice
      break
    case "thunder":
      color = elementColors.thunder
      break
    case "paralysis":
      color = elementColors.paralysis
      break
    case "poison":
      color = elementColors.poison
      break
    case "favorites":
      faIcon = <i style={{ marginLeft: "10px" }} className="fas fa-star" />
      break
    case "comparisons":
      faIcon = (
        <i style={{ marginLeft: "10px" }} className="fas fa-exchange-alt" />
      )
      break
    default:
      break
  }

  return (
    <button
      style={{ ...style, color: color }}
      className={`tab ${active ? "active" : ""}`}
      onClick={() => onClick(label)}>
      {clean ? label.replace(/-/g, " ") : label}
      <Icon style={{ marginLeft: "6px" }} icon={label} size={30} />
      {faIcon}
    </button>
  )
}
