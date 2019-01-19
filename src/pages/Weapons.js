import React, { Component } from "react"
import { List, Map } from "immutable"

// import Loadable from 'react-loadable'

// Global Styles
import "react-select/dist/react-select.css"
import "react-virtualized-select/styles.css"

// import "../App.css"

// import ReactPaginate from "react-paginate"

// import axios from "axios"

import {
  // searchArray,
  chunkList,
  removeOrAddFromList,
  toggleListInMapByKey,
  itemFilterMethod,
  itemOrderMethod,
  updateOrderList
  // mapAndMerge
} from "../util"

import Filters from "../components/Filters"
import OrderButtons from "../components/OrderButtons"
// import WeaponList from "../components/WeaponList"

import TabGroup from "../components/TabGroup"
import ItemWindow from "../components/ItemWindow"
// import WeaponListContainer from "../components/WeaponListContainer"

import WeaponList from "../components/WeaponList"
import SizeContainer from "../components/SizeContainer"
import TeaserList from "../components/TeaserList"
import WeaponTeaser from "../components/WeaponTeaser"

import TwoColumn from "../components/layout/TwoColumn"

import { defaultFilters } from "../defaults"
// const defaultFilters = Map({
//   search: "",
//   weaponTypes: List(),
//   elementTypes: List(),
//   rarity: List(),
//   damageTypes: List(),
//   groups: List(),
//   materials: List()
// })

// const defaultUserOptions = Map({
//   favorites: [],
//   comparisons: [],
//   selectedWeapons: List(),
//   expandAll: false,
//   selectedWeapon: null
// })

class Weapons extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true, // toggle this to hide/show the entire app
      // weapons: null, // a static list of weapons, if used as reference for other dynamic state props
      filteredWeapons: List(), // dynamic list of weapons to apply filters, chunk up, and display
      weaponTypes: List(), // static list of all weapon types
      filters: Map(defaultFilters), // dynamic map of varying filters
      // TODO: move order into the filters Map... MAYBE?
      order: List(), // dynamic list of order objects set by user, used to set weapon list order
      orders: List(["rarity", "attack", "elemental damage"]), // a static list of possible order properties
      // userOptions: Map(defaultUserOptions), //
      page: 0,
      itemsPerPage: 16,
      materials: List(),
      expanded: List(),
      infoMenuOpen: false
    }

    this.handleWeaponTypeClick = this.handleTabClick.bind(this, "weaponTypes")
    this.handleElementTypeClick = this.handleTabClick.bind(this, "elementTypes")
    this.handleRarityClick = this.handleTabClick.bind(this, "rarity")
    this.handleDamageTypeClick = this.handleTabClick.bind(this, "damageTypes")
    this.handleGroupClick = this.handleTabClick.bind(this, "groups")
    this.handleMaterialChange = this.handleSelectChange.bind(this, "materials")
    this.handleTabClick = this.handleTabClick.bind(this)
    this.checkItemFilter = this.checkItemFilter.bind(this)
    this.handleOrderClick = this.handleOrderClick.bind(this)
    this.orderWeapons = this.orderWeapons.bind(this)
    this.clearAllFilters = this.clearAllFilters.bind(this)
    this.handleSearchChange = this.handleSearchChange.bind(this)
    this.filterWeapons = this.filterWeapons.bind(this)
    this.handlePageChange = this.handlePageChange.bind(this)
    this.handleCollapseClick = this.handleCollapseClick.bind(this)
    this.checkExpandAllUserOption = this.checkExpandAllUserOption.bind(this)
    this.clearSearchFilter = this.clearSearchFilter.bind(this)
    this.handleInfoMenuToggleClick = this.handleInfoMenuToggleClick.bind(this)
    // this.getCurrentPageItems = this.getCurrentPageItems.bind(this)
    // this.handleExpandAll = this.handleExpandAll.bind(this)
    // this.handleWeaponClick = this.handleWeaponClick.bind(this)
    // this.toggleFavorite = this.toggleUserOption.bind(this, "favorites")
    // this.toggleComparison = this.toggleUserOption.bind(this, "comparisons")
    // this.saveUserOptions = this.saveUserOptions.bind(this)
    // this.clearUserOptions = this.clearUserOptions.bind(this)
  }

  async componentWillMount() {
    const { weapons } = this.props

    const filters = this.gatherWeaponFilters(weapons)

    this.setState({
      filteredWeapons: List(weapons),
      weaponTypes: filters.types,
      damageTypes: filters.damageTypes,
      elementTypes: filters.elements,
      rarities: filters.rarities,
      materials: filters.materials,
      loading: false
    })
  }

  gatherWeaponFilters(weapons) {
    let types = List(),
      elements = List(),
      rarities = List(),
      damageTypes = List(),
      materials = List()

    weapons.forEach(w => {
      if (!types.includes(w.type)) types = types.push(w.type)
      if (!rarities.includes(w.rarity)) rarities = rarities.push(w.rarity)

      if (
        w.attributes &&
        w.attributes.damageType &&
        !damageTypes.includes(w.attributes.damageType)
      )
        damageTypes = damageTypes.push(w.attributes.damageType)

      if (w.elements.length > 0) {
        w.elements.forEach(element => {
          if (!elements.includes(element.type))
            elements = elements.push(element.type)
        })
      }

      // Crafting/Upgrade materials
      const items = w.crafting.craftable
        ? w.crafting.craftingMaterials
        : w.crafting.upgradeMaterials
      if (items.length) {
        items.forEach(({ item }) => {
          const itemObj = Map({
            value: item.id,
            label: item.name
          })
          if (!materials.includes(itemObj)) materials = materials.push(itemObj)
        })

        // sort by name alphabetically ascending
        materials = materials.sort((a, b) => {
          return a.get("label") > b.get("label")
        })
      }
    })

    return {
      types,
      elements,
      rarities,
      damageTypes,
      materials
    }
  }

  handleTabClick(key, tab) {
    this.setState(
      prev => ({
        filters: toggleListInMapByKey(prev.filters, key, tab)
      }),
      this.filterWeapons
    )
  }

  handleSelectChange(key, value) {
    // console.log("key: ", key, "value: ", value)
    this.setState(
      prev => ({
        filters: prev.filters.set(key, List(value))
      }),
      this.filterWeapons
    )
  }

  // handleExpandAll() {
  //   const allIds = this.state.weapons.map(item => item.id)
  //   this.setState(prev => {
  //     const expandAll = prev.userOptions.get("expandAll")

  //     return {
  //       expanded: expandAll ? List() : allIds,
  //       userOptions: prev.userOptions.set("expandAll", !expandAll)
  //     }
  //   }, this.props.saveUserOptions)
  // }

  // toggleWeaponToSelectedList(id) {
  //   this.setState(prev => {
  //     let selectedWeapons = prev.userOptions.get("selectedWeapons")

  //     selectedWeapons = removeOrAddFromList(List(selectedWeapons), id)

  //     const userOptions = prev.userOptions.set(
  //       "selectedWeapons",
  //       selectedWeapons
  //     )

  //     return { userOptions }
  //   }, this.props.saveUserOptions)
  // }

  // handleWeaponClick(id) {
  //   this.setState(prev => {
  //     if (prev.userOptions.get("selectedWeapon") === id) {
  //       // remove as selected weapon
  //       return {
  //         userOptions: prev.userOptions.set("selectedWeapon", null)
  //       }
  //     } else {
  //       // make selected weapon
  //       return {
  //         userOptions: prev.userOptions.set("selectedWeapon", id)
  //       }
  //     }
  //   })
  // }

  handleInfoMenuToggleClick() {
    this.setState(prev => ({ infoMenuOpen: !prev.infoMenuOpen }))
  }

  checkExpandAllUserOption(userOptions) {
    const expandAll = userOptions.get("expandAll")

    if (expandAll) {
      this.setState(prev => {
        return {
          expanded: prev.weapons.map(item => item.id)
        }
      })
    }
  }

  handleCollapseClick(id) {
    this.setState(prev => {
      let expanded
      if (prev.expanded.includes(id)) {
        //remove it
        expanded = prev.expanded.delete(prev.expanded.indexOf(id))
      } else {
        // add it
        expanded = prev.expanded.push(id)
      }

      return { expanded }
    })
  }

  checkItemFilter(item) {
    // this method is used in the .filter CB, it checks an item against the current filters set
    const { filters } = this.state

    const { userOptions } = this.props

    const weaponTypes = filters.get("weaponTypes"),
      elementTypes = filters.get("elementTypes"),
      rarity = filters.get("rarity"),
      damageTypes = filters.get("damageTypes"),
      groups = filters.get("groups"),
      favorites = userOptions.get("favorites"),
      comparisons = userOptions.get("comparisons"),
      materials = filters.get("materials"),
      search = filters.get("search")

    // default let all items through
    let result = true

    // check search keywords

    if (search) {
      result = false
      if (item.name.toLowerCase().includes(search.toLowerCase())) result = true
    }

    // check item groups
    if (groups.size > 0) {
      if (groups.includes("favorites") && !favorites.includes(item.id))
        return false
      if (groups.includes("comparisons") && !comparisons.includes(item.id))
        return false
    }

    // check weapon types
    if (weaponTypes.size > 0 && !weaponTypes.includes(item.type)) return false

    // check rarity
    if (rarity.size > 0 && !rarity.includes(item.rarity)) return false

    // Check damage types
    if (
      damageTypes.size > 0 &&
      !damageTypes.includes(item.attributes.damageType)
    )
      return false

    if (elementTypes.size > 0) {
      const weaponElements = List(item.elements).map(e => e.type)

      if (elementTypes.isSubset(weaponElements)) {
        result = true
      } else {
        return false
      }
    }

    // check selected materials

    if (materials.size) {
      const { craftingMaterials, upgradeMaterials } = item.crafting

      const weaponMaterials = item.crafting.craftable
        ? craftingMaterials
        : upgradeMaterials

      // materials.forEach(mat => {
      //   if (weaponMaterials.every(weaponMat => mat.value === weaponMat.item.id))
      //     result = true
      // })

      const selectedMaterialIdList = materials.map(mat => mat.value)
      const weaponMaterialIdList = List(weaponMaterials.map(mat => mat.item.id))

      if (selectedMaterialIdList.isSubset(weaponMaterialIdList)) {
        result = true
      } else {
        return false
      }
      // console.log(selectedMaterialIdList.toJS())
      // console.log(weaponMaterialIdList.toJS())
      // debugger

      // weaponMaterials.forEach(weaponMat => {

      // })
    }

    return result
  }

  handleOrderClick(key) {
    const obj = {
      key,
      direction: "DESC"
    }

    this.setState(
      prev => ({
        order: updateOrderList(prev, obj)
      }),
      this.orderWeapons
    ) // order weapons in .setState CB after an order button is clicked
  }

  orderWeapons() {
    this.setState(prev => {
      let { order, filteredWeapons } = prev

      // filteredWeapons = List(filteredWeapons)

      if (order.size > 0) {
        order.forEach(o => {
          // order the weapons by each order object
          filteredWeapons = filteredWeapons.sort((a, b) =>
            itemOrderMethod(a, b, o)
          )
        })
      }

      return {
        filteredWeapons
      }
    })
  }

  clearAllFilters() {
    this.setState(
      {
        filters: Map(defaultFilters),
        order: List(),
        page: 0
      },
      this.filterWeapons
    )
  }

  filterWeapons() {
    this.setState(
      {
        filteredWeapons: this.props.weapons.filter(item =>
          itemFilterMethod(item, this.state.filters, this.props.userOptions)
        )
      },
      this.orderWeapons
    )
  }

  handleSearchChange(e) {
    const val = e.target.value
    this.setState(prev => {
      return { filters: prev.filters.set("search", val) }
    }, this.filterWeapons)
  }

  clearSearchFilter() {
    this.setState(
      prev => ({ filters: prev.filters.set("search", "") }),
      this.filterWeapons
    )
  }

  // getCurrentPageItems() {
  //   const { page, itemsPerPage, filteredWeapons } = this.state

  //   if (filteredWeapons.size <= itemsPerPage) return filteredWeapons
  //   const chunkedList = chunkList(filteredWeapons, itemsPerPage)
  //   return chunkedList.get(page)
  // }

  handlePageChange(data) {
    // const { filteredWeapons, itemsPerPage } = this.state
    this.setState({
      page: data.selected
    })
  }

  render() {
    const {
      weaponTypes,
      elementTypes,
      filters,
      rarities,
      loading,
      order,
      orders,
      // userOptions,
      damageTypes,
      filteredWeapons,
      // weapons,
      materials,
      expanded,
      infoMenuOpen
    } = this.state

    const {
      toggleFavorite,
      toggleComparison,
      toggleWishlist,
      userOptions,
      handleWeaponClick,
      weapons
    } = this.props

    // a list of weapon ids the user currently has selected
    const selectedWeapons = userOptions.get("selectedWeapons")
    // a single id representing the selected weapon, for display in the item window
    const selectedWeapon = userOptions.get("selectedWeapon")
    // const currentPageItems = this.getCurrentPageItems()

    // console.log(selectedWeapons)

    if (loading)
      return (
        <div
          style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
          Loading...
        </div>
      )

    return (
      <TwoColumn
        left={
          <React.Fragment>
            <ItemWindow
              filters={filters}
              items={weapons}
              open={selectedWeapon != null}
              item={weapons.find(item => item.id === selectedWeapon)}
            />
            <Filters
              clearAllFilters={this.clearAllFilters}
              clearSearchFilter={this.clearSearchFilter}
              clearUserOptions={this.clearUserOptions}
              damageTypes={damageTypes}
              elementTypes={elementTypes}
              filteredItems={filteredWeapons}
              filters={filters}
              handleDamageTypeClick={this.handleDamageTypeClick}
              handleElementTypeClick={this.handleElementTypeClick}
              handleGroupClick={this.handleGroupClick}
              handleMaterialChange={this.handleMaterialChange}
              handleOrderClick={this.handleOrderClick}
              handleRarityClick={this.handleRarityClick}
              handleSearchChange={this.handleSearchChange}
              handleWeaponTypeClick={this.handleWeaponTypeClick}
              materials={materials}
              order={order}
              orders={orders}
              rarities={rarities}
              weaponTypes={weaponTypes}
            />
          </React.Fragment>
        }
        right={
          <React.Fragment>
            <div
              style={{
                padding: "10px 10px 0 10px",
                display: "flex",
                justifyContent: "space-between"
              }}>
              <OrderButtons
                orders={orders}
                order={order}
                handleOrderClick={this.handleOrderClick}
              />
              <div style={{ marginBottom: "10px" }}>
                <TabGroup
                  activeTabs={filters.get("groups")}
                  tabs={["favorites", "comparisons"]}
                  handleTabClick={this.handleGroupClick}
                  label="Custom Groups"
                />
              </div>
            </div>
            <SizeContainer
              userOptions={userOptions}
              render={props => (
                <TeaserList
                  {...props}
                  filteredWeapons={filteredWeapons}
                  filters={filters}
                  teasers={filteredWeapons}
                  selectedItem={selectedWeapon}
                  itemSize={83}
                  renderTeaser={({ index, style }) => {
                    const weapon = filteredWeapons.get(index)

                    let selectedMaterials = false
                    if (filters) {
                      selectedMaterials = filters.get("materials")
                    }

                    let highlight = false
                    if (selectedWeapon === weapon.id) {
                      highlight = true
                    }

                    return (
                      <WeaponTeaser
                        {...props}
                        key={weapon.id.toString()}
                        toggleComparison={toggleComparison}
                        toggleFavorite={toggleFavorite}
                        toggleWishlist={toggleWishlist}
                        handleWeaponClick={handleWeaponClick}
                        weapon={weapon}
                        weapons={weapons}
                        selectedMaterials={selectedMaterials}
                        selectedWeapons={selectedWeapons}
                        selectedWeapon={weapons.find(
                          w => w.id === selectedWeapon
                        )}
                        open={expanded.includes(weapon.id)}
                        highlight={highlight}
                        style={{
                          ...style,
                          padding: "10px",
                          paddingRight: "24px"
                          // paddingLeft: "6px"
                        }}
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

export default Weapons
