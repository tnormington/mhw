import React, { Component } from "react"

import "./SizeContainer.css"

export default class WeaponListContainer extends Component {
  constructor(props) {
    super(props)

    this.ref = React.createRef()

    this.state = {
      clientHeight: 0,
      clientWidth: 0
    }

    this.updateSize = this.updateSize.bind(this)
  }

  componentDidMount() {
    this.updateSize()
    window.addEventListener("resize", this.updateSize)
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateSize)
  }

  updateSize() {
    const { clientHeight, clientWidth } = this.ref.current
    this.setState({ clientHeight, clientWidth })
  }

  render() {
    const { render } = this.props

    return (
      <div ref={this.ref} className="size-container">
        {render({
          ...this.props,
          height: this.state.clientHeight,
          width: this.state.clientWidth
        })}
      </div>
    )
  }
}
