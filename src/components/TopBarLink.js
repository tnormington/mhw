import React from "react"
import { NavLink } from "react-router-dom"
import colors from "../colors"

import "./TopBarLink.css"

export default ({ to, title, exact }) => (
  <NavLink
    exact={exact}
    className="top-bar__link"
    activeClassName="active"
    // activeStyle={{ color: colors.blue }}
    to={to}>
    {title}
  </NavLink>
)
