import React from "react"
import MetaValue from "./MetaValue"

export default ({ label, value }) => (
  <div style={{ marginRight: "10px" }}>
    <label className="sm" style={{ display: 'block' }}>{label}</label>
    <MetaValue value={value} />
  </div>
)
