import React from "react"
import Icon from "./Icon"

export default ({ slots, label }) => (
  <div>
    {label && (
      <label className="sm" style={{ display: "block" }}>
        {label}
      </label>
    )}
    <div style={{ display: "flex" }}>
      {slots.map(({ rank }, i) => (
        <Icon
          key={`slotKey-${i}-${rank}`}
          icon={`gem-level-${rank}`}
          size={20}
          style={{ marginRight: "4px" }}
        />
      ))}
    </div>
  </div>
)
