import React from "react"
// import "./Tab.css"

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

export default ({ label, onClick, active, clean, style }) => {
  let icon = false,
    color = false,
    faIcon = false

  switch (label) {
    case "great-sword":
      icon = greatSword
      break
    case "long-sword":
      icon = longSword
      break
    case "sword-and-shield":
      icon = swordAndShield
      break
    case "dual-blades":
      icon = dualBlades
      break
    case "hammer":
      icon = hammer
      break
    case "hunting-horn":
      icon = huntingHorn
      break
    case "lance":
      icon = lance
      break
    case "gunlance":
      icon = gunlance
      break
    case "light-bowgun":
      icon = lightBowgun
      break
    case "switch-axe":
      icon = switchAxe
      break
    case "charge-blade":
      icon = chargeBlade
      break
    case "insect-glaive":
      icon = insectGlaive
      break
    case "heavy-bowgun":
      icon = heavyBowgun
      break
    case "bow":
      icon = bow
      break
    case "fire":
      color = "#DB9839"
      break
    case "dragon":
      color = "#7551D4"
      break
    case "blast":
      color = "#D96060"
      break
    case "sleep":
      color = "#1046C8"
      break
    case "water":
      color = "#287CD8"
      break
    case "ice":
      color = "#51C1D4"
      break
    case "thunder":
      color = "#D9C660"
      break
    case "paralysis":
      color = "#F3FFB1"
      break
    case "poison":
      color = "#539A1B"
      break
    case "favorites":
      faIcon = <i style={{ marginLeft: "10px" }} className="fas fa-star" />
      break
    case "comparisons":
      faIcon = (
        <i style={{ marginLeft: "10px" }} className="fas fa-clipboard-list" />
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
      {icon && (
        <img
          style={{
            transition: "all 0.15s ease-out",
            width: "30px",
            height: "30px",
            objectFit: "contain",
            marginLeft: "6px",
            filter: active ? "invert(100%)" : ""
          }}
          src={icon}
          alt={`icon for ${label}`}
        />
      )}
      {faIcon}
    </button>
  )
}
