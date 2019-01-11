import React from "react"

import colors from "../colors"

export default ({ sharpness }) => {
  const keys = []

  for (let key in sharpness) {
    if (sharpness.hasOwnProperty(key)) {
      if (sharpness[key] > 0)
        keys.push({
          color: colors[key],
          value: sharpness[key]
        })
    }
  }

  return (
    <div
      style={{
        height: "10px",
        width: "80px",
        position: "relative",
        display: "flex",
        background: "rgb(5, 8, 14)",
        border: "1px solid #6D7DA1"
      }}>
      {keys.map(key => {
        return (
          <span
            key={key.color + key.value}
            style={{
              background: key.color,
              width: `${key.value}%`,
              display: "block"
            }}
          />
        )
      })}
    </div>
  )
}
