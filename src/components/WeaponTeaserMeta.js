import React from "react"

import Meta from "./Meta"
import ElementsMeta from "./ElementsMeta"
import SharpnessMeter from "./SharpnessMeter"

import colors from "../colors"

export default ({ weapon, full, selectedWeapon }) => {
  // let attackValue = 0
  // let attackDiff = 0,
  //   attackValue = weapon.attack ? weapon.attack.display : "",
  //   attackColor = ""

  let attackValue = weapon.attack.display,
    attackColor

  console.log(selectedWeapon)

  if (
    selectedWeapon &&
    selectedWeapon.attack &&
    selectedWeapon.attack.display
  ) {
    const selectedAttack = selectedWeapon.attack.display,
      attack = weapon.attack.display,
      diff = attack - selectedAttack

    console.log(selectedAttack, attack)

    if (diff != 0) {
      if (diff > 0) {
        attackValue = `${attack}(+${diff})`
        attackColor = colors.green
      } else {
        attackValue = `${attack}(-${Math.abs(diff)})`
        attackColor = colors.red
      }
    } else {
      attackValue = attack
      attackColor = "#fff"
    }
  }

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {full && <Meta label="Rarity" value={weapon.rarity} />}
      {attackValue && (
        <Meta label="Attack" value={attackValue} color={attackColor} />
      )}
      <Meta label="Weapon Type" value={weapon.type} makeTitle={true} />
      <Meta
        label="Damage Type"
        value={weapon.attributes.damageType}
        makeTitle={true}
      />
      {weapon.elements.length > 0 && (
        <ElementsMeta
          style={{ marginRight: "10px" }}
          elements={weapon.elements}
        />
      )}
      {full && weapon.sharpness && (
        <div style={{ marginRight: "10px" }}>
          <label
            className="sm"
            style={{ marginBottom: "6px", display: "block" }}>
            Sharpness
          </label>
          <SharpnessMeter sharpness={weapon.sharpness} />
        </div>
      )}
    </div>
  )
}
