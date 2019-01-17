import React, { Component } from "react"

import ListItem from "./InfoMenuListItem"

import Collapsible from "react-collapsible"
import colors from "../colors"

const links = [
  {
    href: "https://github.com/tnormington/mhw",
    title: "More Information",
    icon: "info-circle"
  },
  {
    href: "https://github.com/tnormington/mhw/issues/new",
    title: "Report An Issue",
    icon: "bug"
  }
]

export default ({ open, onToggleClick, resetUserData }) => {
  return (
    <div
      style={{
        color: "#fff",
        position: "relative"
      }}>
      <div
        style={{
          position: "absolute",
          top: "calc(100% + 10px)",
          right: 0,
          zIndex: 300,
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.3)"
        }}>
        <Collapsible transitionTime={200} open={open}>
          <ul
            style={{
              background: colors.grey,
              listStyleType: "none",
              padding: 0,
              margin: 0
            }}>
            {links.map(({ href, title, icon }) => (
              <ListItem href={href} title={title} key={href} icon={icon} />
            ))}
            <ListItem
              onClick={resetUserData}
              title="Reset User Data"
              icon="window-close"
              style={{ color: colors.red }}
            />
          </ul>
        </Collapsible>
      </div>
      <button
        onClick={onToggleClick}
        className="fab no-pad no-active"
        href="#"
        style={{ color: "#fff", marginLeft: "auto" }}>
        {!open && <i className="fas fa-question-circle fa-fw" />}
        {open && <i className="fas fa-caret-up fa-fw" />}
      </button>
    </div>
  )
}