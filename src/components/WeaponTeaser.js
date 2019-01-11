import React, { Component, PureComponent } from "react"

import Meta from "./Meta"
import ElementsMeta from "./ElementsMeta"
import "./WeaponTeaser.css"
import SharpnessMeter from "./SharpnessMeter"
import ItemList from "./ItemList"

import Collapsible from "react-collapsible"

export default class WeaponTeaser extends Component {
  constructor(props) {
    super(props)

    // this.ref = React.createRef()
    // this.props.addHeight(this.ref.clientHeight)
  }

  componentDidMount() {
    // console.log(this.ref)
  }

  render() {
    const {
      weapon,
      toggleFavorite,
      userOptions,
      toggleComparison,
      style,
      selectedMaterials
    } = this.props

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

    const hasIcon = weapon.assets && weapon.assets.icon

    return (
      <div style={style}>
        <Collapsible
          transitionTime={200}
          trigger={
            <div
              className="weapon-teaser"
              style={{ display: "flex", color: "#fff" }}>
              {hasIcon && (
                <img
                  style={{
                    marginRight: "10px",
                    width: "30px",
                    height: "30px",
                    objectFit: "contain",
                    flex: "0 0 30px"
                  }}
                  src={weapon.assets.icon}
                  alt={`Icon for ${weapon.name}`}
                />
              )}

              <div style={{ marginLeft: hasIcon ? "" : "40px" }}>
                {weapon.name}
                <button
                  className="no-active no-pad"
                  style={{
                    marginLeft: "10px",
                    color: isCompared ? "#287CD8" : "",
                    border: "none"
                  }}
                  onClick={e => toggleComparison(e, weapon.id)}>
                  <i className="fas fa-clipboard-list" />
                </button>

                <button
                  className="no-active no-pad"
                  style={{
                    marginLeft: "10px",
                    color: isFavorite ? "#DB9839" : "",
                    border: "none"
                  }}
                  onClick={e => toggleFavorite(e, weapon.id)}>
                  <i className={isFavorite ? "fas fa-star" : "far fa-star"} />
                </button>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  <Meta label="Rarity" value={weapon.rarity} />
                  <Meta label="Attack" value={weapon.attack.display} />
                  <Meta label="Weapon Type" value={weapon.type} />
                  <Meta
                    label="Damage Type"
                    value={weapon.attributes.damageType}
                  />
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
          }>
          <div
            style={{ color: "#fff", marginLeft: "40px", marginBottom: "10px" }}>
            {weapon.crafting.craftingMaterials.length > 0 && (
              <ItemList
                label="Crafting Materials"
                items={weapon.crafting.craftingMaterials}
                selectedItems={selectedMaterials}
              />
            )}

            {weapon.crafting.upgradeMaterials.length > 0 && (
              <ItemList
                label="Upgrade Materials"
                items={weapon.crafting.upgradeMaterials}
                selectedItems={selectedMaterials}
              />
            )}
          </div>
        </Collapsible>
      </div>
    )
  }
}
