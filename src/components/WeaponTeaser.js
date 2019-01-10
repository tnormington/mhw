import React, { Component, PureComponent } from "react"

import Meta from "./Meta"
import ElementsMeta from "./ElementsMeta"
import "./WeaponTeaser.css"
import SharpnessMeter from "./SharpnessMeter"

export default class WeaponTeaser extends Component {
  logWeapon(weapon) {
    console.log(weapon)
  }

  render() {
    const { weapon, toggleFavorite, userOptions, toggleComparison } = this.props

    let isFavorite = false,
      isCompared = false

    // check favorites
    if (userOptions.has("favorites")) {
      isFavorite = userOptions.get("favorites").includes(weapon.id)
    }

    // check comparisons
    if (userOptions.has("comparisons")) {
      isCompared = userOptions.get("comparisons").includes(weapon.id)
    }

    return (
      <div
        onClick={() => this.logWeapon(weapon)}
        className="weapon-teaser"
        style={{ display: "flex", marginBottom: "10px", color: "#fff" }}>
        {weapon.assets && weapon.assets.icon && (
          <img
            style={{
              marginRight: "10px",
              width: "30px",
              height: "30px",
              objectFit: "contain"
            }}
            src={weapon.assets.icon}
            alt={`Icon for ${weapon.name}`}
          />
        )}

        <div>
          {weapon.name}
          <button
            className="no-active no-pad"
            style={{
              marginLeft: "10px",
              color: isCompared ? "#287CD8" : "",
              border: "none"
            }}
            onClick={() => toggleComparison(weapon.id)}>
            <i className="fas fa-clipboard-list" />
          </button>

          <button
            className="no-active no-pad"
            style={{
              marginLeft: "10px",
              color: isFavorite ? "#DB9839" : "",
              border: "none"
            }}
            onClick={() => toggleFavorite(weapon.id)}>
            <i className={isFavorite ? "fas fa-star" : "far fa-star"} />
          </button>
          <div style={{ display: "flex" }}>
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
            {weapon.sharpness && (
              <div>
                <label
                  className="sm"
                  style={{ marginBottom: "6px", display: "block" }}>
                  Sharpness
                </label>
                <SharpnessMeter sharpness={weapon.sharpness} />
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}
