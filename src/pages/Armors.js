import React, { Component } from "react"
import TwoColumn from "../components/layout/TwoColumn"

export default class Armors extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <TwoColumn
        left={
          <div>
            <h1>Armor Left</h1>
          </div>
        }
        right={
          <div>
            <h1>Armor Right</h1>
          </div>
        }
      />
    )
  }
}
