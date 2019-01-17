import React, { Component } from "react"

import ListItem from "./InfoMenuListItem"

import Collapsible from "react-collapsible"
import colors from "../colors"

const links = [
  {
    href: "https://github.com/tnormington/mhw",
    title: "More Information"
  }
]

export default ({ open, onToggleClick, resetUserData }) => {
  return (
    <div
      style={{
        position: "absolute",
        bottom: "10px",
        left: "10px",
        zIndex: 300,
        color: "#fff"
      }}>
      <Collapsible transitionTime={200} open={open}>
        <ul
          style={{
            background: colors.darkGrey,
            listStyleType: "none",
            padding: 0,
            margin: 0
          }}>
          {links.map(({ href, title }) => (
            <ListItem href={href} title={title} key={href} />
          ))}
          <ListItem onClick={resetUserData} title="Reset User Data" />
        </ul>
      </Collapsible>
      <button
        onClick={onToggleClick}
        className="fab no-pad no-active"
        href="#"
        style={{ color: "#fff", marginTop: "10px" }}>
        {!open && <i className="fas fa-question-circle fa-fw" />}
        {open && <i className="fas fa-caret-down fa-fw" />}
      </button>
    </div>
  )
}
