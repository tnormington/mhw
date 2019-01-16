import React, { Component } from "react"

import WeaponTeaser from "./WeaponTeaser"
import colors from "../colors"

import { FixedSizeList as List } from "react-window"
import { debug } from "util"
import OrderButtons from "./OrderButtons"

export default class WeaponList extends Component {
  constructor(props) {
    super(props)

    this.getRow = this.getRow.bind(this)
    this.onScroll = this.onScroll.bind(this)
    this.scrollToTop = this.scrollToTop.bind(this)

    this.listRef = React.createRef()

    this.state = {
      showButton: false
    }
  }

  onScroll({ scrollDirection, scrollOffset, scrollUpdateWasRequested }) {
    // scrollDirection is either "forward" or "backward".

    // scrollOffset is a number.

    // scrollUpdateWasRequested is a boolean.
    // This value is true if the scroll was caused by scrollTo() or scrollToItem(),
    // And false if it was the result of a user interaction in the browser.

    // if the user is 100 rows away from the top and scrolling backwards
    if (scrollOffset > 100 && scrollDirection === "backward") {
      this.setState({ showButton: true })
    } else {
      this.setState({ showButton: false })
    }
  }

  getRow({ index, style }) {
    const {
      weapons,
      toggleComparison,
      toggleFavorite,
      userOptions,
      filteredWeapons,
      filters,
      handleCollapseClick,
      handleWeaponClick,
      expanded,
      selectedWeapon
    } = this.props

    const weapon = filteredWeapons.get(index)

    let selectedMaterials = false
    if (filters) {
      selectedMaterials = filters.get("materials")
    }

    let highlight = false
    if (selectedWeapon === weapon.id) {
      highlight = true
    }

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
        handleWeaponClick={handleWeaponClick}
        open={expanded.includes(weapon.id)}
        highlight={highlight}
        style={{
          ...style,
          //  height: "100px",
          padding: "10px"
        }}
      />
    )
  }

  itemKey(index, data) {
    // Find the item at the specified index.
    // In this case "data" is an Array that was passed to List as "itemData".
    const item = data[index]

    // Return a value that uniquely identifies this item.
    // Typically this will be a UID of some sort.
    return item.id
  }

  scrollToTop() {
    this.listRef.current.scrollToItem(0)
  }

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
      handleExpandAll,
      handleWeaponClick,
      expanded,
      selectedWeapon,
      filteredWeapons,
      height,
      width
      // selectedWeapons,
    } = this.props

    let selectedMaterials = false
    if (filters) {
      selectedMaterials = filters.get("materials")
    }

    return (
      <div
        style={{
          background: colors.darkGrey,
          position: "relative",
          height: "100%"
        }}>
        {!weapons.size && (
          <div style={{ padding: "10px" }}>No weapons found</div>
        )}

        {filteredWeapons.size > 0 && (
          <React.Fragment>
            <List
              ref={this.listRef}
              onScroll={this.onScroll}
              height={height}
              itemCount={filteredWeapons.size}
              itemSize={78}
              width={width}
              overscanCount={10}
              itemData={filteredWeapons.toArray()}
              itemKey={this.itemKey}>
              {this.getRow}
            </List>
            {this.state.showButton && (
              <button
                onClick={this.scrollToTop}
                className="no-active fab"
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  border: "none"
                  // zIndex: "300"
                }}>
                <i className="fas fa-arrow-up" />
              </button>
            )}
          </React.Fragment>
        )}
      </div>
    )
  }
}
