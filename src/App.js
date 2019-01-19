import React, { Component } from "react"
import { BrowserRouter as Router, Route, Link } from "react-router-dom"

import { Map, List, fromJS } from "immutable"
import axios from "axios"

// VENDOR COMPONENTS
import Loadable from "react-loadable"

// PAGES
import Dashboard from "./pages/Dashboard"
// import Weapons from "./pages/Weapons" // this is loaded async
import Armor from "./pages/Armor"
import Wishlist from "./pages/Wishlist"

// CUSTOM COMPONENTS
import TopBar from "./components/TopBar"
import Loader from "./components/Loader"

import { mapAndMerge, toggleListInMapByKey } from "./util"

import "./App.css"

// Defaults
import { defaultUserOptions } from "./defaults"

const LoadableWeapons = Loadable({
  loading: Loader,
  loader: () => import("./pages/Weapons")
})

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      infoMenuOpen: false,
      userOptions: Map(defaultUserOptions),
      weapons: List(),
      armor: List()
    }

    this.handleInfoMenuToggleClick = () => {
      this.setState(prev => ({ infoMenuOpen: !prev.infoMenuOpen }))
    }

    this.clearUserOptions = () => {
      window.localStorage.removeItem("mhw_user-settings")
      this.setState({ userOptions: defaultUserOptions })
    }

    this.saveUserOptions = () => {
      // const { userOptions } = this.state
      window.localStorage.setItem(
        "mhw_user-settings",
        JSON.stringify(this.state.userOptions.toJSON())
      )
    }

    // bound methods

    // wishlist
    this.toggleWishlistWeapon = this.toggleListItemInUserOptions.bind(
      this,
      "wishlist",
      "weapons"
    )
    this.toggleWishlistArmor = this.toggleListItemInUserOptions.bind(
      this,
      "wishlist",
      "armor"
    )

    // favorite
    this.toggleFavoriteWeapon = this.toggleListItemInUserOptions.bind(
      this,
      "favorites",
      "weapons"
    )
    this.toggleFavoriteArmor = this.toggleListItemInUserOptions.bind(
      this,
      "favorites",
      "armor"
    )

    // comparison
    this.toggleComparisonWeapon = this.toggleListItemInUserOptions.bind(
      this,
      "comparisons",
      "weapons"
    )
    this.toggleComparisonArmor = this.toggleListItemInUserOptions.bind(
      this,
      "comparisons",
      "armor"
    )

    // item selection
    this.handleWeaponClick = this.handleSelectionClick.bind(
      this,
      "selectedWeapon"
    )
    this.handleArmorClick = this.handleSelectionClick.bind(
      this,
      "selectedArmor"
    )
  }

  async componentWillMount() {
    // Get all weapons and save data to global app state
    // TODO: Write an API to collect and serve up live data
    let weapons = List(),
      armor = List(),
      skills = List()

    if (window.location.hostname === "localhost") {
      weapons = await axios.get("https://mhw-db.com/weapons")
      weapons = weapons.data

      armor = await axios.get("https://mhw-db.com/armor")
      armor = armor.data

      skills = await axios.get("https://mhw-db.com/skills")
      skills = skills.data
    } else {
      weapons = require("./data/allWeapons.json")
      armor = require("./data/allArmor.json")
      skills = require("./data/skills.json")
    }

    this.setState({
      weapons: List(weapons),
      armor: List(armor),
      skills: List(skills),
      loading: false
    })
  }

  toggleListItemInUserOptions(mapKey, listKey, e, id) {
    e.stopPropagation()
    // console.log("mapKey: ", mapKey)
    // console.log("listKey: ", listKey)
    // console.log("e: ", e)
    // console.log("id: ", id)

    this.setState(prev => {
      // const map = prev[mapKey]

      const userOptions = prev.userOptions

      return {
        userOptions: userOptions.set(
          mapKey,
          toggleListInMapByKey(userOptions.get(mapKey), listKey, id)
        )
      }
    }, this.saveUserOptions)
  }

  handleSelectionClick(key, id) {
    this.setState(prev => {
      if (prev.userOptions.get(key) === id) {
        // remove as selected weapon
        return {
          userOptions: prev.userOptions.set(key, null)
        }
      } else {
        // make selected weapon
        return {
          userOptions: prev.userOptions.set(key, id)
        }
      }
    }, this.saveUserOptions)
  }

  componentDidMount() {
    let userOptions = fromJS(
      JSON.parse(window.localStorage.getItem("mhw_user-settings"))
    )
    // console.log("userOptions: ", userOptions)

    userOptions = defaultUserOptions.merge(userOptions)

    this.setState({ userOptions })
  }

  render() {
    const {
      infoMenuOpen,
      userOptions,
      weapons,
      armor,
      loading,
      skills
    } = this.state

    const {
      handleInfoMenuToggleClick,
      clearUserOptions,
      toggleFavoriteWeapon,
      toggleComparisonWeapon,
      toggleFavoriteArmor,
      toggleComparisonArmor,
      toggleWishlistWeapon,
      toggleWishlistArmor,
      handleWeaponClick,
      handleArmorClick
    } = this

    return (
      <Router>
        <div>
          <TopBar
            infoMenuOpen={infoMenuOpen}
            handleInfoMenuToggleClick={handleInfoMenuToggleClick}
            clearUserOptions={clearUserOptions}
          />

          {loading && <Loader />}

          {!loading && (
            <React.Fragment>
              <Route
                path="/"
                exact
                render={props => (
                  <Dashboard {...props} userOptions={userOptions} />
                )}
              />
              <Route
                path="/weapons/"
                render={props => (
                  <LoadableWeapons
                    {...props}
                    userOptions={userOptions}
                    toggleFavorite={toggleFavoriteWeapon}
                    toggleComparison={toggleComparisonWeapon}
                    toggleWishlist={toggleWishlistWeapon}
                    handleWeaponClick={handleWeaponClick}
                    weapons={weapons}
                  />
                )}
              />
              <Route
                path="/armor/"
                render={props => (
                  <Armor
                    {...props}
                    armor={armor}
                    toggleFavorite={toggleFavoriteArmor}
                    toggleComparison={toggleComparisonArmor}
                    toggleWishlist={toggleWishlistArmor}
                    handleArmorClick={handleArmorClick}
                    userOptions={userOptions}
                    skills={skills}
                  />
                )}
              />

              <Route
                path="/wishlist/"
                render={props => (
                  <Wishlist
                    {...props}
                    weapons={weapons}
                    armor={armor}
                    wishlist={userOptions.get("wishlist")}
                  />
                )}
              />
            </React.Fragment>
          )}
        </div>
      </Router>
    )
  }
}
