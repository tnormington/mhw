import React from "react"
import { Link } from "react-router-dom"

export default ({ to, title }) => (
  <Link style={{ padding: "10px", display: "block" }} to={to}>
    {title}
  </Link>
)
