import React from "react"

export default ({ style, option, selectValue, key }) => {
  return (
    <div key={key} style={style} onClick={() => selectValue(option)}>
      {option.label} {option.level}
    </div>
  )
}
