import React, { Component } from "react"

import WeaponTeaser from "./WeaponTeaser"
import colors from "../colors"

import { FixedSizeList as List } from "react-window"
import { debug } from "util"

export default class WeaponList extends Component {
  constructor(props) {
    super(props)

    // this.itemRefs = List()

    // this.state = {
    // heights: List()
    // }

    // this.row = this.row.bind(this)
    // this.addRef = this.addRef.bind(this)
    // this.getItemSize = this.getItemSize.bind(this)
    // this.addHeight = this.addHeight.bind(this)
  }

  // addRef(component) {
  //   this.itemRefs = this.itemRefs.push(React.createRef(component))
  // }

  // addHeight(h) {
  //   this.setState(prev => ({
  //     heights: prev.heights.push(h)
  //   }))
  // }

  // itemKey(index, data) {
  //   const item = data.get(index)
  //   return item.id
  // }

  // shouldComponentUpdate(nextProps, nextState) {
  //   const { weapons, userOptions, order } = nextProps

  // if (
  //   this.props.weapons.equals(weapons) &&
  //   this.props.userOptions.equals(userOptions) &&
  //   this.props.order.equals(order)
  // )
  //   return false

  //   return true
  // }

  // row(props) {
  //   const weapon = this.props.weapons.get(props.index)

  //   if (!weapon) return

  //   return (
  //     <WeaponTeaser
  //       style={props.style}
  //       toggleFavorite={this.props.toggleFavorite}
  //       toggleComparison={this.props.toggleComparison}
  //       key={weapon.id.toString()}
  //       weapon={weapon}
  //       userOptions={this.props.userOptions}
  //       // addRef={this.addRef}
  //       // addHeight={this.addHeight}
  //     />
  //   )
  // }

  // getItemSize(i) {
  //   const h = this.state.heights.get(i)
  //   console.log(h)
  //   debugger
  //   return h
  // }

  render() {
    const {
      weapons,
      toggleComparison,
      toggleFavorite,
      userOptions,
      filters
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
            />
          )
        })}
      </div>
    )
  }
}
