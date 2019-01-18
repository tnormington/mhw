import React from "react"
import MetaValue from "./MetaValue"

import "./ElementsMeta.css"

import { elementColors } from "../colors"

export default ({ elements, style }) => (
  <div>
    <label className="sm" style={{ display: "block" }}>
      Elements
    </label>
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {elements.map(e => {
        let color = null
        switch (e.type) {
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
          default:
            break
        }

        // const value = e.damage ? e.damage : e.

        return (
          <MetaValue
            style={style}
            key={e.type}
            color={color}
            value={e.type + " " + e.damage}
          />
        )
      })}
    </div>
  </div>
)
