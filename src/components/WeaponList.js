import React, { Component } from "react"

import WeaponTeaser from "./WeaponTeaser"
import colors from "../colors"

import { FixedSizeList as List } from "react-window"
import { debug } from "util"
import OrderButtons from "./OrderButtons"

export default class WeaponList extends Component {
  render() {
    const {
      weapons,
      toggleComparison,
      toggleFavorite,
      userOptions,
      filters,
      order,
      orders,
      handleOrderClick,
      handleCollapseClick,
      expanded
    } = this.props

    let selectedMaterials = false
    if (filters) {
      selectedMaterials = filters.get("materials")
    }

    return (
      <div
        style={{
          padding: "10px 10px 36px 10px",
          background: colors.darkGrey,
          width: "100%"
        }}>
        <OrderButtons
          orders={orders}
          order={order}
          handleOrderClick={handleOrderClick}
        />

        {!weapons.size && <div>No weapons found</div>}

        {weapons.map(weapon => {
          return (
            <WeaponTeaser
              toggleFavorite={toggleFavorite}
              toggleComparison={toggleComparison}
              key={weapon.id.toString()}
              weapon={weapon}
              weapons={weapons}
              userOptions={userOptions}
              selectedMaterials={selectedMaterials}
              handleCollapseClick={handleCollapseClick}
              open={expanded.includes(weapon.id)}
            />
          )
        })}
      </div>
    )
  }
}
