import React, { Component } from "react"
import { BrowserRouter as Router, Route, Link } from "react-router-dom"

import { Map, List } from "immutable"
import axios from "axios"

// VENDOR COMPONENTS
import Loadable from "react-loadable"

// PAGES
import Dashboard from "./pages/Dashboard"
// import Weapons from "./pages/Weapons" // this is loaded async
import Armor from "./pages/Armor"

// CUSTOM COMPONENTS
import TopBar from "./components/TopBar"
import Loader from "./components/Loader"

import { mapAndMerge } from "./util"

import "./App.css"

// Defaults

const defaultUserOptions = Map({
  favorites: [],
  comparisons: [],
  selectedWeapons: List(),
  expandAll: false,
  selectedWeapon: null,
  selectedArmor: null
})

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
      const { userOptions } = this.state
      window.localStorage.setItem(
        "mhw_user-settings",
        JSON.stringify(userOptions.toJSON())
      )
    }

    // bound methods
    this.toggleFavorite = this.toggleUserOption.bind(this, "favorites")
    this.toggleComparison = this.toggleUserOption.bind(this, "comparisons")
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
      armor = List()

    if (window.location.hostname === "localhost") {
      weapons = await axios.get("https://mhw-db.com/weapons")
      weapons = weapons.data

      armor = await axios.get("https://mhw-db.com/armor")
      armor = armor.data
    } else {
      weapons = require("./data/allWeapons.json")
      armor = require("./data/allArmor.json")
    }

    this.setState({
      weapons: List(weapons),
      armor: List(armor),
      loading: false
    })
  }

  toggleUserOption(key, e, id) {
    e.stopPropagation()
    this.setState(prev => {
      let { userOptions } = prev
      let userOption = userOptions.get(key)

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
    })
  }

  componentDidMount() {
    let userOptions = Map(
      JSON.parse(window.localStorage.getItem("mhw_user-settings"))
    )

    // Loop over each defaultUserOption,
    // check it the type
    // check if user has option set
    // set key to correct type

    userOptions = mapAndMerge(defaultUserOptions, userOptions)
    this.setState({ userOptions })
  }

  render() {
    const { infoMenuOpen, userOptions, weapons, armor, loading } = this.state

    const {
      handleInfoMenuToggleClick,
      clearUserOptions,
      saveUserOptions,
      toggleFavorite,
      toggleComparison,
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
                    saveUserOptions={saveUserOptions}
                    toggleFavorite={toggleFavorite}
                    toggleComparison={toggleComparison}
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
                    handleArmorClick={handleArmorClick}
                    userOptions={userOptions}
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
