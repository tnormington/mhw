import React, { Component } from "react"

import ListItem from "./InfoMenuListItem"

import Collapsible from "react-collapsible"
import colors from "../colors"

// TODO: Setup small info blurb above all links containing quick important stuff

const links = [
  {
    href: "https://github.com/tnormington/mhw",
    title: "More Information",
    icon: "fas fa-info-circle"
  },
  {
    href:
      "https://github.com/tnormington/mhw/issues/new?assignees=&labels=&template=bug_report.md&title=",
    title: "Report An Issue",
    icon: "fas fa-bug"
  },
  {
    href:
      "https://github.com/tnormington/mhw/issues/new?assignees=&labels=&template=feature_request.md&title=",
    title: "Request A Feature",
    icon: "fas fa-comment"
  },
  {
    href: "https://trello.com/b/0kGZx3Zl/mhw-db",
    title: "Check the Trello board",
    icon: "fab fa-trello"
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
          top: "calc(100% + 15px)",
          right: 0,
          zIndex: 300,
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
          background: colors.grey,
          width: "500px"
        }}>
        <Collapsible transitionTime={200} open={open}>
          <div
            style={{
              padding: "10px",
              textAlign: "right",
              borderBottom: `2px solid ${colors.medGrey}`
            }}>
            All persistent user data is currently saved to your browser
            localStorage. This means it will only be available when accessing it
            from the same browser on the same device. It also means, if you
            clear your browser storage it will wipe all persistant data saved in
            this app.
          </div>
          <ul
            style={{
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
              icon="fas fa-window-close"
              // style={{ color: colors.red }}
              color="red"
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
