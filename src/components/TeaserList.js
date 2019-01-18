import React, { Component } from "react"

// import WeaponTeaser from "./WeaponTeaser"
import colors from "../colors"

import { FixedSizeList as List } from "react-window"

export default class TeaserList extends Component {
  constructor(props) {
    super(props)

    this.listRef = React.createRef()

    this.state = {
      showButton: false
    }

    this.onScroll = ({
      scrollDirection,
      scrollOffset,
      scrollUpdateWasRequested
    }) => {
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

    this.scrollToTop = () => {
      this.listRef.current.scrollToItem(0)
    }

    this.scrollToItem = id => {
      this.listRef.current.scrollToItem(
        this.props.teasers.findIndex(item => item.id === id),
        "start"
      )
    }

    this.handleItemClick = item => this.scrollToItem(item.id)
  }

  componentDidMount() {
    const { selectedItem } = this.props
    if (selectedItem) this.scrollToItem(selectedItem)
  }

  itemKey(index, data) {
    // Find the item at the specified index.
    // In this case "data" is an Array that was passed to List as "itemData".
    const item = data[index]

    // Return a value that uniquely identifies this item.
    // Typically this will be a UID of some sort.
    return item.id
  }

  render() {
    const {
      teasers, // used to be filteredWeapons
      height,
      width,
      itemSize, // customizable itemSize
      renderTeaser // new render method to create each row output
    } = this.props

    return (
      <div
        style={{
          background: colors.darkGrey,
          position: "relative",
          height: "100%"
        }}>
        {teasers.size > 0 && (
          <React.Fragment>
            <List
              ref={this.listRef}
              onScroll={this.onScroll}
              height={height}
              itemCount={teasers.size}
              itemSize={itemSize}
              width={width}
              overscanCount={10}
              itemData={teasers.toArray()}
              itemKey={this.itemKey}>
              {/* {this.getRow} */}

              {renderTeaser}
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
