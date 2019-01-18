import React from "react"

import './InfoMenuListItem.css'

export default ({ href, title, icon, onClick, style, color }) => (
  <li>
    <a
      href={href ? href : "#"}
      onClick={e => {
        if (onClick) {
          e.preventDefault()
          onClick()
        }
      }}
      className={`info-menu__list-item ${color ? color : ''}`}>
      {title}
      {icon && (
        <i className={`fas fa-${icon} fa-fw`} style={{ marginLeft: "10px" }} />
      )}
    </a>
  </li>
)
