import React, { Component } from "react"

import WeaponTeaser from "./WeaponTeaser"

export default class WeaponList extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    const { weapons, userOptions, order } = nextProps

    if (
      this.props.weapons.equals(weapons) &&
      this.props.userOptions.equals(userOptions) &&
      this.props.order.equals(order)
    )
      return false

    return true
  }

  render() {
    const {
      weapons,
      toggleComparison,
      toggleFavorite,
      userOptions
    } = this.props

    return (
      <div>
        {weapons.map(weapon => {
          // if (checkItemFilter(weapon)) {
          //   return
          // } else {
          return (
            <WeaponTeaser
              toggleFavorite={toggleFavorite}
              toggleComparison={toggleComparison}
              key={weapon.id.toString()}
              weapon={weapon}
              userOptions={userOptions}
            />
          )
          // }
        })}
      </div>
    )
  }
}
