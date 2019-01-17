import React, { Component } from "react"
import { BrowserRouter as Router, Route, Link } from "react-router-dom"

import { Map, List } from "immutable"

import Dashboard from "./pages/Dashboard"
import Weapons from "./pages/Weapons"
import TopBar from "./components/TopBar"

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

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      infoMenuOpen: false,
      userOptions: Map(defaultUserOptions)
    }

    this.handleInfoMenuToggleClick = () => {
      this.setState(prev => ({ infoMenuOpen: !prev.infoMenuOpen }))
    }

    this.clearUserOptions = () => {
      window.localStorage.removeItem("mhw_user-settings")
      // this.setState({ userOptions: })

      // userOptions = mapAndMerge(defaultUserOptions)
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

  toggleUserOption(key, e, id) {
    e.stopPropagation()
    this.setState(prev => {
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

    // if (!userOptions.comparisons) userOptions.comparisons = []

    // Loop over each defaultUserOption,
    // check it the type
    // check if user has option set
    // set key to correct type

    userOptions = mapAndMerge(defaultUserOptions, userOptions)
    this.setState({ userOptions })
  }

  render() {
    const { infoMenuOpen, userOptions } = this.state

    const {
      handleInfoMenuToggleClick,
      clearUserOptions,
      saveUserOptions,
      toggleFavorite,
      toggleComparison,
      handleWeaponClick
    } = this

    return (
      <Router>
        <div>
          <TopBar
            infoMenuOpen={infoMenuOpen}
            handleInfoMenuToggleClick={handleInfoMenuToggleClick}
            clearUserOptions={clearUserOptions}
          />

          <Route
            path="/"
            exact
            render={props => <Dashboard {...props} userOptions={userOptions} />}
          />
          <Route
            path="/weapons/"
            render={props => (
              <Weapons
                {...props}
                userOptions={userOptions}
                saveUserOptions={saveUserOptions}
                toggleFavorite={toggleFavorite}
                toggleComparison={toggleComparison}
                handleWeaponClick={handleWeaponClick}
              />
            )}
          />
        </div>
      </Router>
    )
  }
}
