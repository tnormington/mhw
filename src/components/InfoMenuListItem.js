import React from "react"

const linkStyle = { padding: "10px", margin: 0, display: "block" }

export default ({ href, title, onClick }) => (
  <li>
    <a
      href={href ? href : "#"}
      onClick={e => {
        e.preventDefault()
        onClick()
      }}
      style={linkStyle}>
      {title}
    </a>
  </li>
)
