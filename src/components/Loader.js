import React from "react"

import "./Loader.css"

export default () => (
  <div
    style={{
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100px",
      minWidth: "100px"
    }}>
    <div className="lds-ripple">
      <div />
      <div />
    </div>
  </div>
)
