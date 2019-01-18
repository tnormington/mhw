import React from "react"

import Meta from "./Meta"
import MetaValue from "./MetaValue"

import { elementColors } from "../colors"

// import head from '../icons/mhw-helm-headgear-wiki.png'
// import waist from '../icons/mhw-waist-belt-wiki.png'
// import legs from '../icons/mhw-feet-boots-greaves.png'
// import gauntlets from '../icons/mhw-arm-gauntlets-wiki.png'
// import charms from '../icons/mhw-charms-wiki.png'
// import decorations from '../icons/mhw-decorations-wiki.png'
// import boots from '../icons/mhw-feet-boots-greaves.png'
// import palico from '../icons/mhw-palico-equipment-skills.png'
// import torso from '../icons/mhw-torso-chest-plate-wiki.png'

export default ({ armorPiece, full, selectedArmorPiece }) => {
  const { defense, rank, resistances: r, type } = armorPiece

  // let imageSrc = false
  // switch(type) {
  //   case 'waist':
  //     imageSrc = waist
  //     break;
  //   case 'legs':
  //     imageSrc = legs
  //     break;
  //   case 'head':
  //     imageSrc = head
  //     break;
  //   case 'head':
  //     imageSrc = head
  //     break;
  //   default:
  //     break;

  // }

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
