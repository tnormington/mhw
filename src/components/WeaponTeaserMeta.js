import React from "react"

import Meta from "./Meta"
import ElementsMeta from "./ElementsMeta"
import SharpnessMeter from "./SharpnessMeter"

export default ({ weapon, showSharpness }) => (
  <div style={{ display: "flex", flexWrap: "wrap" }}>
    <Meta label="Rarity" value={weapon.rarity} />
    <Meta label="Attack" value={weapon.attack.display} />
    <Meta label="Weapon Type" value={weapon.type} />
    <Meta label="Damage Type" value={weapon.attributes.damageType} />
    {weapon.elements.length > 0 && (
      <ElementsMeta
        style={{ marginRight: "10px" }}
        elements={weapon.elements}
      />
    )}
    {showSharpness && weapon.sharpness && (
      <div style={{ marginRight: "10px" }}>
        <label className="sm" style={{ marginBottom: "6px", display: "block" }}>
          Sharpness
        </label>
        <SharpnessMeter sharpness={weapon.sharpness} />
      </div>
    )}
  </div>
)
