import React from "react"
import { Link } from "react-router-dom"

export default () => (
  <div style={{ padding: "10px" }}>
    <p>
      This page is under construction, check out the other pages:
      <ul>
        <li>
          <Link to="/weapons/">Weapons</Link>
        </li>
        <li>
          <Link to="/armor/">Armor (also under construction)</Link>
        </li>
      </ul>
    </p>
  </div>
)
