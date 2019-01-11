import React, { Component } from "react"

import TabGroup from "./TabGroup"
import OrderButtons from "./OrderButtons"

// import Select from "react-select"
import Select from "react-virtualized-select"

import colors from "../colors"

export default class Filters extends Component {
  render() {
    const {
      filters,
      handleGroupClick,
      handleSearchChange,
      weaponTypes,
      handleWeaponTypeClick,
      elementTypes,
      handleElementTypeClick,
      damageTypes,
      handleDamageTypeClick,
      orders,
      order,
      handleOrderClick,
      filteredWeapons,
      clearAllFilters,
      clearUserOptions,
      rarities,
      handleRarityClick,
      materials,
      handleMaterialChange
    } = this.props

    return (
      <div
        style={{
          padding: "10px 10px 0 10px",
          position: "fixed",
          left: 0,
          top: 0,
          width: "50%"
        }}>
        <TabGroup
          activeTabs={filters.get("groups")}
          tabs={["favorites", "comparisons"]}
          handleTabClick={handleGroupClick}
          label="Custom Groups"
        />

        <label style={{ marginBottom: "6px", display: "block" }}>
          Keyword Search
        </label>
        <input
          type="text"
          value={filters.get("search")}
          onChange={handleSearchChange}
          style={{ marginBottom: "10px", width: "100%" }}
        />

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

        {materials.size && (
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

        <OrderButtons
          orders={orders}
          order={order}
          handleOrderClick={handleOrderClick}
        />

        <span
          style={{
            textTransform: "uppercase",
            border: "1px solid #3a4765",
            display: "inline-block",
            padding: "5px 6px",
            fontSize: "14px",
            marginRight: "10px"
          }}>{`${filteredWeapons.size} results`}</span>
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
        <button
          style={{
            marginBottom: "10px",
            marginRight: "10px",
            color: colors.red,
            borderColor: colors.red
          }}
          onClick={clearUserOptions}>
          Clear User Options <i className="fas fa-window-close" />
        </button>
      </div>
    )
  }
}
