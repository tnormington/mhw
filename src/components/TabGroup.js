import React, { Component } from "react"
import Tab from "./Tab"

import Collapsible from "react-collapsible"

export default class TabGroup extends Component {
  render() {
    const { tabs, activeTabs, handleTabClick, label, clean } = this.props

    return (
      <Collapsible
        open={true}
        trigger={
          <label style={{ marginBottom: "6px", display: "block" }}>
            {label}
          </label>
        }>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            marginBottom: "10px",
            position: "relative",
            marginLeft: "1px",
            marginTop: "1px",
            zIndex: 1
          }}>
          {tabs.map(type => (
            <Tab
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginLeft: "-1px",
                marginTop: "-1px"
                // zIndex: 11
              }}
              label={type}
              onClick={handleTabClick}
              key={type}
              clean={clean}
              active={activeTabs.includes(type)}
            />
          ))}
        </div>
      </Collapsible>
    )
  }
}
