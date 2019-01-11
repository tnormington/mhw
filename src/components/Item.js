import React from "react"
import colors from "../colors"

export default ({ item, quantity, highlight, iconSrc }) => {
  return (
    <div style={{ fontSize: "14px", color: highlight ? colors.blue : "#fff", display: 'flex', alignItems: 'center' }}>
      {iconSrc && (
        <img src={iconSrc} style={{ width: '20px', height: '20px', objectFit: 'contain'}} />
      )}
      {item.name}
      {quantity ? (
        <span style={{ color: "#6d7da1", fontWeight: 700 }}>
          <i style={{ margin: "0 6px" }} className="fas fa-times" />
          {quantity}
        </span>
      ) : (
        ``
      )}
    </div>
  )
}
