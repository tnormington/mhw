import React from "react"

const linkStyle = { padding: "10px", margin: 0, display: "block" }

export default ({ href, title, icon, onClick, style }) => (
  <li>
    <a
      href={href ? href : "#"}
      onClick={e => {
        if (onClick) {
          e.preventDefault()
          onClick()
        }
      }}
      style={{ ...linkStyle, ...style }}>
      {icon && (
        <i className={`fas fa-${icon} fa-fw`} style={{ marginRight: "10px" }} />
      )}
      {title}
    </a>
  </li>
)
