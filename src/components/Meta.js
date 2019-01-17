import React from "react"
import MetaValue from "./MetaValue"

export default ({ label, value, color, makeTitle }) => (
  <div style={{ marginRight: "10px" }}>
    <label className="sm" style={{ display: "block" }}>
      {label}
    </label>
    <MetaValue color={color} value={value} makeTitle={makeTitle} />
  </div>
)
