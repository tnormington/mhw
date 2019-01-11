import React, { Component } from "react"
import { List, Map } from "immutable"

// Global Styles
import "react-select/dist/react-select.css"
import "react-virtualized-select/styles.css"

import "./App.css"

import ReactPaginate from "react-paginate"

import axios from "axios"

import { searchArray, chunkList } from "./util"

import Filters from "./components/Filters"
// import TabGroup from "./components/TabGroup"
// import OrderButtons from "./components/OrderButtons"
import WeaponList from "./components/WeaponList"

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

const defaultUserOptions = {
  favorites: [],
  comparisons: []
}

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      weapons: null,

      filteredWeapons: List(),
      weaponTypes: List(),
      filters: Map(defaultFilters),
      order: List(),
      orders: List(["rarity", "attack"]),
      userOptions: Map(defaultUserOptions),
      page: 0,
      itemsPerPage: 16,
      materials: List()
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
    const userOptions = JSON.parse(
      window.localStorage.getItem("mhw_user-settings")
    )

    // if (!userOptions.comparisons) userOptions.comparisons = []

    if (userOptions) {
      this.setState({ userOptions: Map(userOptions) })
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
      console.log("filters: ", filters.toJS())
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
      materials = filters.get("materials")

    // default let all items through
    let result = true

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
      const pageCount = Math.floor(filteredWeapons.size / prev.itemsPerPage)

      let newPage = Number(prev.page)
      if (newPage >= pageCount) {
        if (pageCount > 0) {
          newPage = pageCount - 1
        } else {
          newPage = 0
        }
      }

      return {
        filteredWeapons,
        pageCount,
        page: newPage
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
    })
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
      materials
    } = this.state

    const {
      checkItemFilter,
      clearAllFilters,
      clearUserOptions,
      getCurrentPageItems,
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
      toggleFavorite
    } = this

    const currentPageItems = getCurrentPageItems()

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
        />
        {/* {currentPageItems && currentPageItems.size > 0 && ( */}
        <WeaponList
          weapons={currentPageItems}
          toggleComparison={toggleComparison}
          toggleFavorite={toggleFavorite}
          userOptions={userOptions}
          order={order}
          orders={orders}
          handleOrderClick={handleOrderClick}
          filters={filters}
        />
        {/* )} */}
        {filteredWeapons.size > itemsPerPage && (
          <div className="pagination">
            <ReactPaginate
              pageCount={pageCount}
              pageRangeDisplayed={2}
              marginPagesDisplayed={2}
              onPageChange={handlePageChange}
              forcePage={page}
              previousLabel={<i className="fas fa-arrow-left" />}
              nextLabel={<i className="fas fa-arrow-right" />}
            />
          </div>
        )}
      </React.Fragment>
    )
  }
}

export default App
