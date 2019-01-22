import React from "react"

export default ({ style, option, selectValue, key }) => {
  return (
    <div
      key={key}
      style={{ ...style, padding: "4px" }}
      onClick={() => selectValue(option)}>
      {option.label} {option.level}
    </div>
  )
}
