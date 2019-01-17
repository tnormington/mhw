import React from "react"
import Collapsible from "react-collapsible"
import ItemList from "./ItemList"
import colors from "../colors"
import SharpnessMeter from "./SharpnessMeter"
import WeaponTeaserMeta from "./WeaponTeaserMeta"

export default ({ item, filters, items, open }) => {
  // let item = false

  // if (selectedItems.size > 0) {
  //   item = items.find(i => selectedItems.first() === i.id)
  // }

  let selectedMaterials = false
  if (filters) {
    selectedMaterials = filters.get("materials")
  }

  // console.log("item: ", item)

  return (
    <div className="item-window" style={{ background: colors.darkGrey }}>
      <Collapsible open={open}>
        {item && (
          <div
            style={{
              color: "#fff",
              // marginBottom: "10px",
              display: "flex",
              padding: "10px 0"
            }}>
            {item.assets.image && (
              <img
                style={{
                  marginRight: "10px",
                  width: 230,
                  height: 230,
                  objectFit: "contain"
                }}
                src={item.assets.image}
                alt={`In game image of ${item.name}`}
              />
            )}
            <div>
              <h4 style={{ margin: "0 0 10px" }}>{item.name}</h4>
              <WeaponTeaserMeta weapon={item} full={true} />
              <div style={{ display: "flex" }}>
                {item.crafting.craftingMaterials.length > 0 && (
                  <ItemList
                    label="Crafting Materials"
                    items={item.crafting.craftingMaterials}
                    selectedItems={selectedMaterials}
                    style={{ marginRight: "10px" }}
                  />
                )}

                {item.crafting.upgradeMaterials.length > 0 && (
                  <ItemList
                    previous={items.find(w => w.id === item.crafting.previous)}
                    label="Upgrade Materials"
                    items={item.crafting.upgradeMaterials}
                    selectedItems={selectedMaterials}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </Collapsible>
    </div>
  )
}
