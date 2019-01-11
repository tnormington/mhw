import React from "react"

import Item from "./Item"

export default ({ label, items, selectedItems, previous }) => {
  return (
    <div>
      <label style={{ marginBottom: "6px" }}>{label}</label>
      {previous && (
        <Item item={previous} iconSrc={previous.assets.icon} />
      )}
      {items.map(item => {
        const { quantity, item: i } = item

        const isSelected = selectedItems.find(findItem => {
          return findItem.value === i.id
        })
        
        return (
          <Item
            key={i.name}
            item={i}
            quantity={quantity}
            highlight={isSelected}
          />
        )
      })}
    </div>
  )
}
