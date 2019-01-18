import React from "react"
import { NavLink } from "react-router-dom"
import colors from "../colors"

import "./TopBarLink.css"

export default ({ to, title, exact, icon }) => (
  <NavLink
    exact={exact}
    className="top-bar__link"
    activeClassName="active"
    to={to}>
    {title}
    {icon && <i className={icon} style={{ marginLeft: "6px" }} />}
  </NavLink>
)
