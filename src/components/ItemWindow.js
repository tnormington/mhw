import React from "react"
import Collapsible from "react-collapsible"
import ItemList from "./ItemList"
import colors from "../colors"
import SharpnessMeter from "./SharpnessMeter"
import WeaponTeaserMeta from "./WeaponTeaserMeta"
import ArmorTeaserMeta from "./ArmorTeaserMeta"
import ArmorImageCarousel from "./ArmorImageCarousel"

// const Carousel = require("react-responsive-carousel").Carousel

// import "react-responsive-carousel/lib/styles/carousel.min.css"
// import "./Carousel.sass"
// import { Carousel } from "react-responsive-carousel"

export default ({ item, filters, items, open, skills }) => {
  let selectedMaterials = false,
    imgAlt = false
  if (filters) selectedMaterials = filters.get("materials")

  if (item) imgAlt = `In game image of ${item.name}`

  console.log("ItemWindow.open", open)

  return (
    <div className="item-window" style={{ background: colors.darkGrey }}>
      <Collapsible transitionCloseTime={200} transitionTime={200} open={open}>
        <div
          style={{
            color: "#fff",
            // marginBottom: "10px",
            display: "flex",
            padding: "10px 0",
            minHeight: "500px"
          }}>
          {item && item.assets && (
            <div
              style={{ marginRight: "10px", width: "230px", flex: "0 0 auto" }}>
              {item.assets.image && (
                <img
                  style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "contain"
                  }}
                  src={item.assets.image}
                  alt={imgAlt}
                />
              )}
              {item.assets.imageMale && item.assets.imageFemale && (
                <ArmorImageCarousel item={item} imgAlt={imgAlt} />
              )}
            </div>
          )}
          {item && (
            <div>
              <h4 style={{ margin: "0 0 10px" }}>{item.name}</h4>
              {/* TODO find a better way to filter out item type */}
              {item.attack && <WeaponTeaserMeta weapon={item} full={true} />}

              {item.resistances && (
                <ArmorTeaserMeta
                  armorPiece={item}
                  // selectedArmorPiece={sele}
                  skills={skills}
                  full={true}
                />
              )}
              <div style={{ display: "flex" }}>
                {item.crafting.craftingMaterials &&
                  item.crafting.craftingMaterials.length > 0 && (
                    <ItemList
                      label="Crafting Materials"
                      items={item.crafting.craftingMaterials}
                      selectedItems={selectedMaterials}
                      style={{ marginRight: "10px" }}
                    />
                  )}

                {item.crafting.upgradeMaterials &&
                  item.crafting.upgradeMaterials.length > 0 && (
                    <ItemList
                      previous={items.find(
                        w => w.id === item.crafting.previous
                      )}
                      label="Upgrade Materials"
                      items={item.crafting.upgradeMaterials}
                      selectedItems={selectedMaterials}
                    />
                  )}
              </div>
            </div>
          )}
        </div>
      </Collapsible>
    </div>
  )
}
