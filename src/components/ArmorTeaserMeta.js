import React from "react"

import Meta from "./Meta"
import MetaValue from "./MetaValue"

import { elementColors } from "../colors"

export default ({ armorPiece, full, selectedArmorPiece }) => {
  const { defense, rank, resistances: r, type } = armorPiece

  return (
    <div style={{ display: "flex", flexWrap: full ? "wrap" : "nowrap" }}>
      {defense && <Meta label="Defense" value={defense.base} />}
      <div>
        <label className="sm" style={{ marginRight: "10px", display: "block" }}>
          Resistances
        </label>
        <div>
          <MetaValue
            value={`Dragon ${r.dragon}`}
            color={elementColors.dragon}
            style={{ marginRight: "6px" }}
          />
          <MetaValue
            value={`Fire ${r.fire}`}
            color={elementColors.fire}
            style={{ marginRight: "6px" }}
          />
          <MetaValue
            value={`Ice ${r.ice}`}
            color={elementColors.ice}
            style={{ marginRight: "6px" }}
          />
          <MetaValue
            value={`Thunder ${r.thunder}`}
            color={elementColors.thunder}
            style={{ marginRight: "6px" }}
          />
          <MetaValue
            value={`Water ${r.water}`}
            color={elementColors.water}
            style={{ marginRight: "6px" }}
          />
        </div>
      </div>
      <Meta label="Rank" value={rank} />
    </div>
  )
}
