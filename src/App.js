import React, { Component } from "react"
import { List, Map } from "immutable"

import "./App.css"

import TabGroup from "./components/TabGroup"

import axios from "axios"
import OrderButtons from "./components/OrderButtons"

import { searchArray } from "./util"
import WeaponList from "./components/WeaponList"

const defaultFilters = Map({
  search: "",
  weaponTypes: List(),
  elementTypes: List(),
  rarity: List(),
  damageTypes: List(),
  groups: List()
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

      filteredWeapons: null,
      weaponTypes: null,
      filters: Map(defaultFilters),
      order: List(),
      orders: List(["rarity", "attack"]),
      userOptions: Map(defaultUserOptions)
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
  }

  async componentWillMount() {
    const { data } = await axios.get("https://mhw-db.com/weapons")
    const filters = this.gatherWeaponFilters(data)

    this.setState({
      weapons: List(data),
      filteredWeapons: List(data),
      weaponTypes: filters.types,
      damageTypes: filters.damageTypes,
      elementTypes: filters.elements,
      rarities: filters.rarities,
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
      damageTypes = List()

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
    })

    return {
      types,
      elements,
      rarities,
      damageTypes
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

  checkItemFilter(item) {
    // this method is used in the .filter CB, it checks an item against the current filters set
    const { filters, userOptions } = this.state

    const weaponTypes = filters.get("weaponTypes"),
      elementTypes = filters.get("elementTypes"),
      rarity = filters.get("rarity"),
      damageTypes = filters.get("damageTypes"),
      groups = filters.get("groups"),
      favorites = userOptions.get("favorites"),
      comparisons = userOptions.get("comparisons")

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
      result = false
      elementTypes.forEach(type => {
        if (searchArray("type", item.elements, type)) {
          result = true
        }
      })
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
    this.setState({
      filters: Map(defaultFilters),
      order: []
    })
  }

  filterWeapons() {
    this.setState(prev => {
      const filteredWeapons = prev.weapons.filter(this.checkItemFilter)
      return { filteredWeapons }
    }, this.orderWeapons)
  }

  toggleUserOption(key, id) {
    this.setState(
      prev => {
        let { userOptions } = prev
        console.log(userOptions)
        let userOption = userOptions.get(key)
        console.log("key: ", key)
        console.log(userOption)

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
        this.orderWeapons()
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
      // const filters = Object.assign({}, prev.filters, { search: val })
      // const newState = update(prev, { filters: { search: { $set: val } } })
      const filters = prev.filters.set("search", val)
      return { filters }
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
      weapons
    } = this.state

    const {
      checkItemFilter,
      handleElementTypeClick,
      handleWeaponTypeClick,
      handleRarityClick,
      handleOrderClick,
      clearAllFilters,
      toggleFavorite,
      toggleComparison,
      handleDamageTypeClick,
      handleGroupClick,
      clearUserOptions,
      handleSearchChange
    } = this

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
      <div>
        <TabGroup
          activeTabs={filters.get("groups")}
          tabs={["favorites", "comparisons"]}
          handleTabClick={handleGroupClick}
          label="Custom Groups"
        />

        <label style={{ marginBottom: "6px", display: "block" }}>
          Keyword Search
        </label>
        <input
          type="text"
          value={filters.get("search")}
          onChange={handleSearchChange}
          style={{ marginBottom: "10px", width: "100%" }}
        />

        {weaponTypes && (
          <TabGroup
            activeTabs={filters.get("weaponTypes")}
            tabs={weaponTypes}
            handleTabClick={handleWeaponTypeClick}
            label="Weapon Type"
            clean={true}
          />
        )}
        {elementTypes && (
          <TabGroup
            activeTabs={filters.get("elementTypes")}
            tabs={elementTypes}
            handleTabClick={handleElementTypeClick}
            label="Element"
          />
        )}
        {rarities && (
          <TabGroup
            activeTabs={filters.get("rarity")}
            tabs={rarities}
            handleTabClick={handleRarityClick}
            label="Rarity"
          />
        )}
        {damageTypes && (
          <TabGroup
            activeTabs={filters.get("damageTypes")}
            tabs={damageTypes}
            handleTabClick={handleDamageTypeClick}
            label="Damage Type"
            clean={true}
          />
        )}

        <OrderButtons
          orders={orders}
          order={order}
          handleOrderClick={handleOrderClick}
        />

        <button
          style={{ marginBottom: "10px", marginRight: "10px" }}
          onClick={clearAllFilters}>
          Reset All Filters <i className="fas fa-window-close" />
        </button>
        <button
          style={{ marginBottom: "10px", marginRight: "10px" }}
          onClick={clearUserOptions}>
          Clear User Options <i className="fas fa-window-close" />
        </button>

        {weapons && (
          <WeaponList
            weapons={filteredWeapons}
            toggleComparison={toggleComparison}
            toggleFavorite={toggleFavorite}
            userOptions={userOptions}
            order={order}
            // checkItemFilter={checkItemFilter}
          />
        )}
      </div>
    )
  }
}

export default App
