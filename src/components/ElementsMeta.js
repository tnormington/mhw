import React from "react"
import MetaValue from "./MetaValue"

import "./ElementsMeta.css"

export default ({ elements, style }) => (
  <div>
    <label className="sm" style={{ display: 'block' }}>Elements</label>
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {elements.map(e => {
        let color = null
        switch (e.type) {
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
          default:
            break
        }

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
