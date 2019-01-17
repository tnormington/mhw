import React from "react"

export default ({ left, right }) => (
  <div className="layout-2-col">
    <div className="left-column">{left}</div>
    <div className="right-column">{right}</div>
  </div>
)
