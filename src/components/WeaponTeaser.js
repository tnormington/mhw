import React, { Component, PureComponent } from "react"

import Meta from "./Meta"
import ElementsMeta from "./ElementsMeta"
import "./WeaponTeaser.css"
import SharpnessMeter from "./SharpnessMeter"
import ItemList from "./ItemList"

import colors from "../colors"

import Collapsible from "react-collapsible"
import RowActions from "./RowActions"

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
      weapons,
      weapon,
      toggleFavorite,
      userOptions,
      toggleComparison,
      style,
      selectedMaterials,
      handleCollapseClick,
      open
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
          open={open}
          handleTriggerClick={() => handleCollapseClick(weapon.id)}
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

              <div style={{ marginLeft: hasIcon ? "" : "40px", width: "100%" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    borderBottom: `1px solid ${colors.lightGrey}`,
                    marginBottom: "4px",
                    paddingBottom: "4px"
                  }}>
                  {weapon.name}
                  <RowActions
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      flex: 1
                    }}
                    isCompared={isCompared}
                    isFavorite={isFavorite}
                    toggleComparison={toggleComparison}
                    toggleFavorite={toggleFavorite}
                    item={weapon}
                    open={open}
                  />
                </div>
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
            style={{
              marginLeft: "40px",
              marginBottom: "10px"
              // paddingBottom: "10px",
              // borderBottom: `1px solid ${colors.lightGrey}`
            }}>
            <div
              style={{
                color: "#fff",
                marginBottom: "10px",
                display: "flex"
              }}>
              {weapon.crafting.craftingMaterials.length > 0 && (
                <ItemList
                  label="Crafting Materials"
                  items={weapon.crafting.craftingMaterials}
                  selectedItems={selectedMaterials}
                  style={{ marginRight: "10px" }}
                />
              )}

              {weapon.crafting.upgradeMaterials.length > 0 && (
                <ItemList
                  previous={weapons.find(
                    w => w.id === weapon.crafting.previous
                  )}
                  label="Upgrade Materials"
                  items={weapon.crafting.upgradeMaterials}
                  selectedItems={selectedMaterials}
                />
              )}
            </div>
            {weapon.assets.image && (
              <img
                src={weapon.assets.image}
                alt={`In game image of ${weapon.name}`}
              />
            )}
          </div>
        </Collapsible>
      </div>
    )
  }
}
