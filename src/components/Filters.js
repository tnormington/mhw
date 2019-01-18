import React, { Component } from "react"

import TabGroup from "./TabGroup"
import OrderButtons from "./OrderButtons"

// import Select from "react-select"
import Select from "react-virtualized-select"

// include the css overrides
import "./ReactSelect.css"

import colors from "../colors"

export default class Filters extends Component {
  render() {
    const {
      armorTypes,
      filters,
      clearAllFilters,
      clearSearchFilter,
      damageTypes,
      elementTypes,
      filteredItems,
      handleArmorTypeClick,
      handleDamageTypeClick,
      handleElementTypeClick,
      handleMaterialChange,
      handleRarityClick,
      handleSearchChange,
      handleWeaponTypeClick,
      materials,
      rarities,
      weaponTypes
    } = this.props

    return (
      <div
        className="filters"
        style={{
          padding: "10px 10px 0 10px",
          overflowY: "scroll",
          flex: "1 1 auto"
        }}>
        <div style={{ position: "relative" }}>
          <label style={{ marginBottom: "6px", display: "block" }}>
            Keyword Search
          </label>
          <input
            type="text"
            value={filters.get("search")}
            onChange={handleSearchChange}
            style={{ marginBottom: "10px", width: "100%" }}
          />
          {filters.get("search") && (
            <button
              style={{
                position: "absolute",
                top: "31px",
                right: "12px",
                border: "none"
              }}
              className="no-pad no-active"
              onClick={clearSearchFilter}>
              <i className="fas fa-window-close" />
            </button>
          )}
        </div>

        {armorTypes && (
          <TabGroup
            activeTabs={filters.get("armorTypes")}
            tabs={armorTypes}
            handleTabClick={handleArmorTypeClick}
            label="Armor Type"
            clean={true}
          />
        )}

        {weaponTypes && (
          <TabGroup
            activeTabs={filters.get("weaponTypes")}
            tabs={weaponTypes}
            handleTabClick={handleWeaponTypeClick}
            label="Weapon Type"
            clean={true}
          />
        )}
        {elementTypes && (
          <TabGroup
            activeTabs={filters.get("elementTypes")}
            tabs={elementTypes}
            handleTabClick={handleElementTypeClick}
            label="Element"
          />
        )}
        {rarities && (
          <TabGroup
            activeTabs={filters.get("rarity")}
            tabs={rarities}
            handleTabClick={handleRarityClick}
            label="Rarity"
          />
        )}
        {damageTypes && (
          <TabGroup
            activeTabs={filters.get("damageTypes")}
            tabs={damageTypes}
            handleTabClick={handleDamageTypeClick}
            label="Damage Type"
            clean={true}
          />
        )}

        {materials && materials.size && (
          <React.Fragment>
            <label style={{ marginBottom: "6px", display: "block" }}>
              Materials
            </label>
            <div style={{ marginBottom: "10px" }}>
              <Select
                multi={true}
                placeholder="Filter by crafting or upgrade material"
                options={materials.map(item => item.toObject()).toArray()}
                value={filters.get("materials").toArray()}
                onChange={handleMaterialChange}
              />
            </div>
          </React.Fragment>
        )}

        <span
          style={{
            textTransform: "uppercase",
            border: "1px solid #3a4765",
            display: "inline-block",
            padding: "5px 6px",
            fontSize: "14px",
            marginRight: "10px"
          }}>{`${filteredItems.size} results`}</span>
        <button
          style={{
            marginBottom: "10px",
            marginRight: "10px",
            color: colors.red,
            borderColor: colors.red
          }}
          onClick={clearAllFilters}>
          Reset All Filters <i className="fas fa-window-close" />
        </button>
      </div>
    )
  }
}
