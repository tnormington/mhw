import React, { Component } from "react"

export default class SkillValue extends Component {
  constructor(props) {
    super(props)

    this.onRemove = e => {
      e.preventDefault()
      e.stopPropagation()
      this.props.onRemove(this.props.value)
    }

    this.handleTouchEndRemove = event => {
      // Check if the view is being dragged, In this case
      // we don't want to fire the click event (because the user only wants to scroll)
      if (this.dragging) return

      // Fire the mouse events
      this.onRemove(event)
    }

    this.handleTouchMove = () => {
      // Set a flag that the view is being dragged
      this.dragging = true
    }

    this.handleTouchStart = () => {
      // Set a flag that the view is not being dragged
      this.dragging = false
    }
  }

  render() {
    return (
      <div className="Select-value" title={this.props.value.title}>
        <span
          className="Select-value-icon"
          aria-hidden="true"
          onMouseDown={this.onRemove}
          onTouchEnd={this.handleTouchEndRemove}
          onTouchStart={this.handleTouchStart}
          onTouchMove={this.handleTouchMove}>
          &times;
        </span>
        <span className="Select-value-label">
          {this.props.children} {this.props.value.level}
        </span>
      </div>
    )
  }
}
