import React, { Component } from "react"
import TwoColumn from "../components/layout/TwoColumn"
import SizeContainer from "../components/SizeContainer"
import TeaserList from "../components/TeaserList"
import ArmorTeaser from "../components/ArmorTeaser"

import Filters from "../components/Filters"

import { defaultFilters } from "../defaults"

import { Map, List } from "immutable"

import { toggleListInMapByKey, itemFilterMethod } from "../util"

export default class Armor extends Component {
  constructor(props) {
    super(props)

    const filters = this.gatherArmorFilters(props.armor)

    this.state = {
      filters: Map(defaultFilters),
      filteredArmor: List(props.armor),
      armorTypes: filters.armorTypes
    }

    this.clearSearchFilter = () => {
      this.setState(
        prev => ({
          filters: prev.filters.set("search", "")
        }),
        this.filterArmor
      )
    }

    this.handleArmorTypeClick = label => {
      this.setState(
        prev => ({
          filters: toggleListInMapByKey(prev.filters, "armorTypes", label)
        }),
        this.filterArmor
      )
    }

    this.filterArmor = () => {
      this.setState(
        {
          filteredArmor: this.props.armor.filter(item =>
            itemFilterMethod(item, this.state.filters, this.props.userOptions)
          )
        },
        this.orderArmor
      )
    }

    this.orderArmor = () => {
      // TODO
    }

    this.handleSearchChange = e => {
      const val = e.target.value
      this.setState(prev => {
        return { filters: prev.filters.set("search", val) }
      }, this.filterArmor)
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
    const {
      userOptions,
      armor,
      handleArmorClick,
      toggleFavorite,
      toggleComparison,
      toggleWishlist,
      skills
    } = this.props

    const selectedArmor = userOptions.get("selectedArmor")

    return (
      <TwoColumn
        left={
          <Filters
            clearSearchFilter={this.clearSearchFilter}
            armorTypes={armorTypes}
            filteredItems={filteredArmor}
            filters={filters}
            handleArmorTypeClick={this.handleArmorTypeClick}
            handleSearchChange={this.handleSearchChange}
          />
        }
        right={
          <SizeContainer
            userOptions={userOptions}
            render={props => (
              <TeaserList
                {...props}
                teasers={filteredArmor}
                itemSize={150}
                renderTeaser={({ index, style }) => {
                  const armorPiece = filteredArmor.get(index)

                  let highlight = false
                  if (selectedArmor === armorPiece.id) {
                    highlight = true
                  }

                  return (
                    <ArmorTeaser
                      {...props}
                      style={{
                        ...style,
                        padding: "10px",
                        paddingRight: "24px"
                      }}
                      armorPiece={armorPiece}
                      handleArmorClick={handleArmorClick}
                      toggleFavorite={toggleFavorite}
                      toggleComparison={toggleComparison}
                      toggleWishlist={toggleWishlist}
                      highlight={highlight}
                      damageTypes={false}
                      skills={skills}
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
