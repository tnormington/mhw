import React, { Component } from "react"
import TwoColumn from "../components/layout/TwoColumn"
import SizeContainer from "../components/SizeContainer"
import TeaserList from "../components/TeaserList"
import ArmorTeaser from "../components/ArmorTeaser"

import Filters from "../components/Filters"

import { defaultFilters } from "../defaults"

import { Map, List } from "immutable"

import { toggleListInMapByKey } from "../util"

export default class Armor extends Component {
  constructor(props) {
    super(props)

    const filters = this.gatherArmorFilters(props.armor)

    this.state = {
      filters: Map(defaultFilters),
      filteredArmor: List(props.armor),
      armorTypes: filters.armorTypes
    }

    this.handleArmorTypeClick = label => {
      this.setState(prev => ({
        filters: toggleListInMapByKey(prev.filters, "armorTypes", label)
      }))
    }

    this.filterArmor = () => {
      this.setState(
        {
          filteredArmor: this.state.armor.filter(this.itemFilter)
        },
        this.orderArmor
      )
    }

    this.orderArmor = () => {
      // TODO
    }

    this.itemFilter = item => {
      console.log(item)
    }
  }

  gatherArmorFilters(armor) {
    if (!List.isList(armor)) throw "armor is not an immutable List"

    let armorTypes = List()

    armor.forEach(a => {
      if (!armorTypes.includes(a.type)) armorTypes = armorTypes.push(a.type)
    })
    return {
      armorTypes
    }
  }

  render() {
    const { filters, filteredArmor, armorTypes } = this.state
    const { userOptions, armor, handleArmorClick } = this.props

    const selectedArmor = userOptions.get("selectedArmor")

    return (
      <TwoColumn
        left={
          <Filters
            armorTypes={armorTypes}
            filteredItems={filteredArmor}
            filters={filters}
            handleArmorTypeClick={this.handleArmorTypeClick}
          />
        }
        right={
          <SizeContainer
            userOptions={userOptions}
            render={props => (
              <TeaserList
                {...props}
                teasers={armor}
                itemSize={150}
                renderTeaser={({ index, style }) => {
                  const armorPiece = filteredArmor.get(index)

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
                      damageTypes={false}
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
