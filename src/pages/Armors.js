import React, { Component } from "react"
import TwoColumn from "../components/layout/TwoColumn"
import SizeContainer from "../components/SizeContainer"
import TeaserList from "../components/TeaserList"
import ArmorTeaser from "../components/ArmorTeaser"

export default class Armors extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { userOptions, armor, handleArmorClick } = this.props

    const selectedArmor = userOptions.get("selectedArmor")

    return (
      <TwoColumn
        left={<div style={{ padding: "10px" }}>Work In Progress...</div>}
        right={
          <SizeContainer
            userOptions={userOptions}
            render={props => (
              <TeaserList
                {...props}
                teasers={armor}
                itemSize={150}
                renderTeaser={({ index, style }) => {
                  // TODO: make an ArmorTeaser component
                  // will also need to make this pull from filtered/ordered list instead
                  const armorPiece = armor.get(index)

                  let highlight = false
                  if (selectedArmor === armorPiece.id) {
                    highlight = true
                  }

                  return (
                    <ArmorTeaser
                      style={{
                        ...style,
                        padding: "10px",
                        paddingRight: "24px"
                      }}
                      armorPiece={armorPiece}
                      handleArmorClick={handleArmorClick}
                      highlight={highlight}
                    />
                  )
                }}
              />
            )}
          />
        }
      />
    )
  }
}
