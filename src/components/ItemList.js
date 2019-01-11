import React from "react"

import Item from "./Item"

export default ({ label, items, selectedItems }) => {
  return (
    <div>
      <label style={{ marginBottom: "6px" }}>{label}</label>
      {items.map(item => {
        const { quantity, item: i } = item

        // console.dir(selectedItems)
        // debugger
        // const isSelected = selectedItems
        //   ? selectedItems.find(findMe => findMe.id === i.id)
        //   : false

        // console.log(i.id)
        const isSelected = selectedItems.find(findItem => {
          // console.log(findItem.value, i.id)
          // debugger
          return findItem.value === i.id
        })

        // if (isSelected) debugger
        // console.log(isSelected)
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
