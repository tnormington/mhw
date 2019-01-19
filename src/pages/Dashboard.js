import React from "react"
import { Link } from "react-router-dom"

import banner from "../images/full-banner.jpg"
import banner2 from "../images/full-banner2.jpg"

import mhwLogo from "../images/mhw-logo.png"

import "./Dashboard.sass"

export default () => (
  <div className="banner" style={{ backgroundImage: `url(${banner2})` }}>
    <img
      style={{
        maxWidth: "400px",
        width: "100%",
        display: "block",
        marginBottom: "2rem"
      }}
      src={mhwLogo}
      alt="Monster Hunter World Logo"
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
