import React, { Component } from "react"
import Tab from "./Tab"

export default class TabGroup extends Component {
  render() {
    const { tabs, activeTabs, handleTabClick, label, clean } = this.props

    return (
      <div>
        <label style={{ marginBottom: "6px", display: "block" }}>{label}</label>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            marginBottom: "10px",
            position: "relative"
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
              }}
              label={type}
              onClick={handleTabClick}
              key={type}
              clean={clean}
              active={activeTabs.includes(type)}
            />
          ))}
        </div>
      </div>
    )
  }
}
