import React, { Component } from "react"
import InputRange from "react-input-range"
import "react-input-range/lib/css/index.css"

import "./ResRange.sass"
import "./InputRange.sass"

export default class ResRange extends Component {
  render() {
    const {
      label,
      resFilter,
      res,
      onChange,
      value,
      toggleActiveRes
    } = this.props

    return (
      <div className="res-range">
        <div
          style={{
            width: "50px",
            height: "50px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginRight: "6px",
            position: "relative"
          }}>
          <label
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              textAlign: "center"
            }}
            htmlFor={`${label.toLowerCase()}-range`}
            className="sm">
            {label}
          </label>
          <input
            value={resFilter.get("active")}
            id={`${label.toLowerCase()}-range`}
            onChange={() => toggleActiveRes(label.toLowerCase())}
            type="checkbox"
          />
        </div>
        <div style={{ flex: 1, padding: "22px 6px" }}>
          <InputRange
            disabled={!resFilter.get("active")}
            minValue={res.get("min")}
            maxValue={res.get("max")}
            value={value}
            onChange={onChange}
          />
        </div>
      </div>
    )
  }
}
