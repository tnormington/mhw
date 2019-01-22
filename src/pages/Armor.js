import React, { Component } from "react"
import TwoColumn from "../components/layout/TwoColumn"
import SizeContainer from "../components/SizeContainer"
import TeaserList from "../components/TeaserList"
import ArmorTeaser from "../components/ArmorTeaser"
import OrderButtons from "../components/OrderButtons"

import Filters from "../components/Filters"

import { defaultFilters } from "../defaults"

import { Map, List } from "immutable"

import {
  toggleListInMapByKey,
  itemFilterMethod,
  updateOrderList,
  itemOrderMethod
} from "../util"

export default class Armor extends Component {
  constructor(props) {
    super(props)

    const filters = this.gatherArmorFilters(props.armor)

    this.state = {
      filters: Map(defaultFilters),
      filteredArmor: List(props.armor),
      armorTypes: filters.armorTypes,
      rarities: filters.rarities,
      ranks: filters.ranks,
      skillOptions: filters.skills,
      slots: [1, 2, 3],
      order: List(),
      orders: List(["defense", "rarity", "slots"])
    }

    this.clearSearchFilter = () => {
      this.setState(
        prev => ({
          filters: prev.filters.set("search", "")
        }),
        this.filterArmor
      )
    }

    // this.handleArmorTypeClick = label => {
    //   this.setState(
    //     prev => ({
    //       filters: toggleListInMapByKey(prev.filters, "armorTypes", label)
    //     }),
    //     this.filterArmor
    //   )
    // }

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
      console.log("ordering armor")

      this.setState(prev => {
        let { filteredArmor, order } = prev

        console.log("order: ", order.toArray())
        if (order.size) {
          order.forEach(o => {
            filteredArmor = filteredArmor.sort((a, b) =>
              itemOrderMethod(a, b, o)
            )
          })
        }

        return {
          filteredArmor
        }
      })
    }

    this.handleOrderClick = orderKey => {
      const obj = {
        key: orderKey,
        direction: "DESC"
      }

      this.setState(
        prev => ({ order: updateOrderList(prev, obj) }),
        this.orderArmor
      )
    }

    this.handleSearchChange = e => {
      const val = e.target.value
      this.setState(prev => {
        return { filters: prev.filters.set("search", val) }
      }, this.filterArmor)
    }

    // this.handleRarityClick = this.handleOrderClick.bind(this, "rarity")
    this.handleArmorTypeClick = this.handleFilterClick.bind(this, "armorTypes")
    this.handleRarityClick = this.handleFilterClick.bind(this, "rarity")
    this.handleRankClick = this.handleFilterClick.bind(this, "ranks")
    this.handleSlotClick = this.handleFilterClick.bind(this, "slots")
    this.handleSkillChange = this.handleSelectChange.bind(this, "skills")
  }

  handleSelectChange(key, value) {
    this.setState(
      prev => ({
        filters: prev.filters.set(key, List(value))
      }),
      this.filterArmor
    )
  }

  handleFilterClick(filterKey, label) {
    this.setState(
      prev => ({
        filters: toggleListInMapByKey(prev.filters, filterKey, label)
      }),
      this.filterArmor
    )
  }

  gatherArmorFilters(armor) {
    if (!List.isList(armor)) throw "armor is not an immutable List"

    let armorTypes = List(),
      rarities = List(),
      ranks = List(),
      skills = List()

    armor.forEach(a => {
      if (!armorTypes.includes(a.type)) armorTypes = armorTypes.push(a.type)
      if (!rarities.includes(a.rarity)) rarities = rarities.push(a.rarity)
      if (!ranks.includes(a.rank)) ranks = ranks.push(a.rank)

      if (a.skills.length > 0) {
        a.skills.forEach(s => {
          const sObj = {
            label: s.skillName,
            value: s.slug,
            level: s.level
          }

          if (!skills.find(sk => sk.value == sObj.value))
            skills = skills.push(sObj)
        })

        skills = skills.sort((a, b) => {
          return a.label > b.label
        })
      }
    })
    return {
      armorTypes,
      rarities,
      ranks,
      skills
    }
  }

  render() {
    const {
      filters,
      filteredArmor,
      armorTypes,
      order,
      orders,
      rarities,
      ranks,
      slots,
      skillOptions
    } = this.state
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
            rarities={rarities}
            ranks={ranks}
            filteredItems={filteredArmor}
            filters={filters}
            slots={slots}
            skillOptions={skillOptions}
            handleSlotClick={this.handleSlotClick}
            handleArmorTypeClick={this.handleArmorTypeClick}
            handleRarityClick={this.handleRarityClick}
            handleSearchChange={this.handleSearchChange}
            handleSkillChange={this.handleSkillChange}
            handleRankClick={this.handleRankClick}
          />
        }
        right={
          <React.Fragment>
            <div style={{ padding: "10px" }}>
              <OrderButtons
                orders={orders}
                order={order}
                handleOrderClick={this.handleOrderClick}
              />
            </div>
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
          </React.Fragment>
        }
      />
    )
  }
}
