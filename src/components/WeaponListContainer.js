import React, { Component } from "react"
import WeaponList from "./WeaponList"

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
    // console.log(this.ref.current.clientHeight)

    this.updateSize()
    // this.setState({ clientHeight, clientWidth })

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
    return (
      <div ref={this.ref} className="weapon-list">
        <WeaponList
          {...this.props}
          height={this.state.clientHeight}
          width={this.state.clientWidth}
        />
      </div>
    )
  }
}
