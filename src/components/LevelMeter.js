import React from "react"
import colors from "../colors"

const SIZE = 10

export default ({ level, maxLevel }) => {
  const levels = []

  for (let count = 0; count < maxLevel; count++) {
    let active = false
    if (count < level) active = true

    levels.push(
      <div
        key={count}
        style={{
          width: `${SIZE}px`,
          height: `${SIZE}px`,
          display: "block",
          background: active ? colors.lightGrey : colors.grey,
          border: `1px solid ${colors.lightGrey}`,
          marginRight: "2px"
        }}
      />
    )
  }

  return (
    <div
      style={{
        display: "flex"
      }}>
      {levels}
    </div>
  )
}
