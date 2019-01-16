import React, { Component } from "react"
import { List, Map } from "immutable"

// Global Styles
import "react-select/dist/react-select.css"
import "react-virtualized-select/styles.css"

import "./App.css"

import ReactPaginate from "react-paginate"

import axios from "axios"

import { searchArray, chunkList, removeOrAddFromList } from "./util"

import Filters from "./components/Filters"
// import TabGroup from "./components/TabGroup"
import OrderButtons from "./components/OrderButtons"
import WeaponList from "./components/WeaponList"
import TabGroup from "./components/TabGroup"
import ItemWindow from "./components/ItemWindow"
import WeaponListContainer from "./components/WeaponListContainer"

// import colors from "./colors"

const defaultFilters = Map({
  search: "",
  weaponTypes: List(),
  elementTypes: List(),
  rarity: List(),
  damageTypes: List(),
  groups: List(),
  materials: List()
})

const defaultUserOptions = Map({
  favorites: [],
  comparisons: [],
  selectedWeapons: List(),
  expandAll: false,
  selectedWeapon: null
})

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true, // toggle this to hide/show the entire app
      weapons: null, // a static list of weapons, if used as reference for other dynamic state props
      filteredWeapons: List(), // dynamic list of weapons to apply filters, chunk up, and display
      weaponTypes: List(), // static list of all weapon types
      filters: Map(defaultFilters), // dynamic map of varying filters
      // TODO: move order into the filters Map
      order: List(), // dynamic list of order objects set by user, used to set weapon list order
      orders: List(["rarity", "attack", "elemental damage"]), // a static list of possible order properties
      userOptions: Map(defaultUserOptions), //
      page: 0,
      itemsPerPage: 16,
      materials: List(),
      expanded: List()
    }

    this.handleWeaponTypeClick = this.handleTabClick.bind(this, "weaponTypes")
    this.handleElementTypeClick = this.handleTabClick.bind(this, "elementTypes")
    this.handleRarityClick = this.handleTabClick.bind(this, "rarity")
    this.handleDamageTypeClick = this.handleTabClick.bind(this, "damageTypes")
    this.handleGroupClick = this.handleTabClick.bind(this, "groups")
    this.handleTabClick = this.handleTabClick.bind(this)
    this.checkItemFilter = this.checkItemFilter.bind(this)
    this.handleOrderClick = this.handleOrderClick.bind(this)
    this.orderWeapons = this.orderWeapons.bind(this)
    this.clearAllFilters = this.clearAllFilters.bind(this)
    this.toggleFavorite = this.toggleUserOption.bind(this, "favorites")
    this.toggleComparison = this.toggleUserOption.bind(this, "comparisons")
    this.saveUserOptions = this.saveUserOptions.bind(this)
    this.handleSearchChange = this.handleSearchChange.bind(this)
    this.filterWeapons = this.filterWeapons.bind(this)
    this.getCurrentPageItems = this.getCurrentPageItems.bind(this)
    this.handlePageChange = this.handlePageChange.bind(this)
    this.handleMaterialChange = this.handleSelectChange.bind(this, "materials")
    this.handleCollapseClick = this.handleCollapseClick.bind(this)
    this.handleExpandAll = this.handleExpandAll.bind(this)
    this.checkExpandAllUserOption = this.checkExpandAllUserOption.bind(this)
    this.handleWeaponClick = this.handleWeaponClick.bind(this)
    this.clearSearchFilter = this.clearSearchFilter.bind(this)
  }

  async componentWillMount() {
    // TODO: Write an API to collect and serve up live data
    let data = []
    if (window.location.hostname === "localhost") {
      data = await axios.get("https://mhw-db.com/weapons")
      data = data.data
    } else {
      data = require("./data/allWeapons.json")
    }

    const filters = this.gatherWeaponFilters(data)

    const { itemsPerPage } = this.state

    this.setState({
      weapons: List(data),
      filteredWeapons: List(data),
      pageCount: Math.floor(data.length / itemsPerPage),
      weaponTypes: filters.types,
      damageTypes: filters.damageTypes,
      elementTypes: filters.elements,
      rarities: filters.rarities,
      materials: filters.materials,
      loading: false
    })
  }

  componentDidMount() {
    let userOptions = Map(
      JSON.parse(window.localStorage.getItem("mhw_user-settings"))
    )

    // if (!userOptions.comparisons) userOptions.comparisons = []

    // Loop over each defaultUserOption,
    // check it the type
    // check if user has option set
    // set key to correct type

    userOptions = userOptions.map((option, key) => {
      const defaultOption = defaultUserOptions.get(key)
      // let optKey = userOptions[key]

      if (List.isList(defaultOption)) {
        // optKey = List(optKey)
        return List(option)
      } else if (Map.isMap(defaultOption)) {
        // optKey = Map(optKey)
        return Map(option)
      } else {
        // optKey = optKey
        return option
      }
    })

    // console.log(userOptions)

    if (userOptions) {
      userOptions = defaultUserOptions.merge(userOptions)
      this.setState({ userOptions })
    }

    // console.log(this.state.data)
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
    this.setState(prev => {
      let filterValues = prev.filters.get(key)
      if (filterValues.includes(tab)) {
        // remove
        filterValues = filterValues.delete(filterValues.indexOf(tab))
      } else {
        // add
        filterValues = filterValues.push(tab)
      }

      // prev.filters[key] = filterValues
      const filters = prev.filters.set(key, filterValues)
      // console.log("filters: ", filters.toJS())
      return { filters }
    }, this.filterWeapons)
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

  handleExpandAll() {
    const allIds = this.state.weapons.map(item => item.id)
    this.setState(prev => {
      const expandAll = prev.userOptions.get("expandAll")

      return {
        expanded: expandAll ? List() : allIds,
        userOptions: prev.userOptions.set("expandAll", !expandAll)
      }
    }, this.saveUserOptions)
  }

  // TODO: setup mass selection of weapons for bulk actions
  // ie: set multiple weapons as favorite in 1 click
  toggleWeaponToSelectedList(id) {
    this.setState(prev => {
      let selectedWeapons = prev.userOptions.get("selectedWeapons")

      selectedWeapons = removeOrAddFromList(List(selectedWeapons), id)

      const userOptions = prev.userOptions.set(
        "selectedWeapons",
        selectedWeapons
      )

      return { userOptions }
    }, this.saveUserOptions)
  }

  handleWeaponClick(id) {
    this.setState(prev => {
      if (prev.userOptions.get("selectedWeapon") === id) {
        // remove as selected weapon
        return {
          userOptions: prev.userOptions.set("selectedWeapon", null)
        }
      } else {
        // make selected weapon
        return {
          userOptions: prev.userOptions.set("selectedWeapon", id)
        }
      }
    })
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
    const { filters, userOptions } = this.state

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

    this.setState(prev => {
      let { order } = prev

      if (order.size > 0) {
        const removeMe = []
        let foundItem = false
        // loop through each order object checking for a match
        // Check matching key directions and change if 'ASC', remove if 'DESC'
        order.forEach((item, i) => {
          if (item.key === obj.key) {
            foundItem = true
            if (item.direction === "DESC") {
              item.direction = "ASC"
              return
            }

            if (item.direction === "ASC") {
              removeMe.push(i)
            }
          }
        })

        // if the item was not found in loop, we need to add it
        if (!foundItem) order = order.push(obj)

        // remove any order objects targetted in earlier loop
        if (removeMe.length > 0)
          order = order.filter((_, i) => !removeMe.includes(i))
        // removeMe.forEach(i => order.splice(i, 1))
        // }
      } else {
        order = order.push(obj)
      }

      return {
        order
      }
    }, this.orderWeapons) // order weapons in .setState CB after an order button is clicked
  }

  orderWeapons() {
    this.setState(prev => {
      let { order, filteredWeapons } = prev

      // filteredWeapons = List(filteredWeapons)

      if (order.size > 0) {
        order.forEach(o => {
          // order the weapons by each order object
          filteredWeapons = filteredWeapons.sort((a, b) => {
            let aVal = a[o.key]
            let bVal = b[o.key]
            // handle attack ordering
            if (o.key === "attack") {
              aVal = a.attack.display
              bVal = b.attack.display
            }

            // handle elemental damage
            if (o.key === "elemental damage") {
              // if there are no elements on the a item, we push a back
              if (!a.elements) return false
              // if there are no elements on the second item, we leave a in the front
              if (!b.elements) return true

              aVal = a.elements.reduce(
                (total, element) => total + element.damage,
                0
              )
              bVal = b.elements.reduce(
                (total, element) => total + element.damage,
                0
              )
            }

            if (o.direction === "ASC") {
              return aVal - bVal
            } else {
              return bVal - aVal
            }
          })
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
    this.setState(prev => {
      const filteredWeapons = prev.weapons.filter(this.checkItemFilter)
      // const pageCount = Math.floor(filteredWeapons.size / prev.itemsPerPage)

      // let newPage = Number(prev.page)
      // if (newPage >= pageCount) {
      //   if (pageCount > 0) {
      //     newPage = pageCount - 1
      //   } else {
      //     newPage = 0
      //   }
      // }

      return {
        filteredWeapons
        // pageCount,
        // page: newPage
      }
    }, this.orderWeapons)
  }

  toggleUserOption(key, e, id) {
    // e.preventDefault()
    e.stopPropagation()
    this.setState(
      prev => {
        let { userOptions } = prev
        // console.log(userOptions)
        let userOption = userOptions.get(key)
        // console.log("key: ", key)
        // console.log(userOption)

        if (!userOption) {
          // create the userOption and add id to it
          userOption = List()
          userOption.push(id)
        } else {
          if (userOption.includes(id)) {
            // remove the id
            userOption = userOption.filter(favoriteId => favoriteId !== id)
          } else {
            // add it
            userOption.push(id)
          }
        }

        userOptions = userOptions.set(key, userOption)

        return { userOptions }
      },
      () => {
        this.filterWeapons()
        this.saveUserOptions()
      }
    )
  }

  saveUserOptions() {
    const { userOptions } = this.state
    window.localStorage.setItem(
      "mhw_user-settings",
      JSON.stringify(userOptions.toJSON())
    )
  }

  clearUserOptions() {
    window.localStorage.removeItem("mhw_user-settings")
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

  getCurrentPageItems() {
    const { page, itemsPerPage, filteredWeapons } = this.state

    if (filteredWeapons.size <= itemsPerPage) return filteredWeapons
    const chunkedList = chunkList(filteredWeapons, itemsPerPage)
    return chunkedList.get(page)
  }

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
      userOptions,
      damageTypes,
      filteredWeapons,
      weapons,
      itemsPerPage,
      pageCount,
      page,
      materials,
      expanded
    } = this.state

    const {
      checkItemFilter,
      clearAllFilters,
      clearUserOptions,
      getCurrentPageItems,
      handleCollapseClick,
      handleDamageTypeClick,
      handleElementTypeClick,
      handleGroupClick,
      handleOrderClick,
      handlePageChange,
      handleRarityClick,
      handleSearchChange,
      handleMaterialChange,
      handleWeaponTypeClick,
      toggleComparison,
      toggleFavorite,
      handleExpandAll,
      handleWeaponClick,
      clearSearchFilter
    } = this

    // a list of weapon ids the user currently has selected
    const selectedWeapons = userOptions.get("selectedWeapons")
    // a single id representing the selected weapon, for display in the item window
    const selectedWeapon = userOptions.get("selectedWeapon")
    const currentPageItems = getCurrentPageItems()

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
      <React.Fragment>
        <div className="left-column">
          <ItemWindow
            filters={filters}
            items={weapons}
            open={selectedWeapon != null}
            item={weapons.find(item => item.id === selectedWeapon)}
          />
          <Filters
            filters={filters}
            handleGroupClick={handleGroupClick}
            handleSearchChange={handleSearchChange}
            weaponTypes={weaponTypes}
            handleWeaponTypeClick={handleWeaponTypeClick}
            elementTypes={elementTypes}
            handleElementTypeClick={handleElementTypeClick}
            damageTypes={damageTypes}
            handleDamageTypeClick={handleDamageTypeClick}
            orders={orders}
            order={order}
            handleOrderClick={handleOrderClick}
            filteredWeapons={filteredWeapons}
            clearAllFilters={clearAllFilters}
            clearUserOptions={clearUserOptions}
            rarities={rarities}
            handleRarityClick={handleRarityClick}
            handleMaterialChange={handleMaterialChange}
            materials={materials}
            clearSearchFilter={clearSearchFilter}
          />
        </div>
        <div className="right-column">
          <div
            style={{
              padding: "10px 10px 0 10px",
              display: "flex",
              justifyContent: "space-between"
            }}>
            <OrderButtons
              orders={orders}
              order={order}
              handleOrderClick={handleOrderClick}
            />
            <div style={{ marginBottom: "10px" }}>
              <TabGroup
                activeTabs={filters.get("groups")}
                tabs={["favorites", "comparisons"]}
                handleTabClick={handleGroupClick}
                label="Custom Groups"
              />
            </div>
          </div>
          <WeaponListContainer
            weapons={currentPageItems}
            toggleComparison={toggleComparison}
            toggleFavorite={toggleFavorite}
            userOptions={userOptions}
            order={order}
            orders={orders}
            handleOrderClick={handleOrderClick}
            handleCollapseClick={handleCollapseClick}
            filters={filters}
            expanded={expanded}
            handleExpandAll={handleExpandAll}
            handleWeaponClick={handleWeaponClick}
            selectedWeapons={selectedWeapons}
            selectedWeapon={selectedWeapon}
            filteredWeapons={filteredWeapons}
          />
        </div>
      </React.Fragment>
    )
  }
}

export default App
