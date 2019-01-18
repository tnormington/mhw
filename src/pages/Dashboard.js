import React from "react"
import { Link } from "react-router-dom"

import banner from "../images/full-banner.jpg"

import "./Dashboard.sass"

export default () => (
  <div style={{ position: "relative" }}>
    <img
      style={{ width: "100%", display: "block" }}
      src={banner}
      alt="Monster Hunter World dashboard image"
    />
    <div className="banner__content">
      <p>This page is under construction, check out the other pages:</p>
      <ul>
        <li>
          <Link to="/weapons/">Weapons</Link>
        </li>
        <li>
          <Link to="/armor/">Armor (also under construction)</Link>
        </li>
      </ul>
    </div>
  </div>
)
