import React from "react"
import TopBarLink from "./TopBarLink"
import InfoMenu from "./InfoMenu"

export default ({
  infoMenuOpen,
  handleInfoMenuToggleClick,
  clearUserOptions
}) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "0 10px",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.3)"
    }}>
    <div style={{ display: "flex" }}>
      <TopBarLink to="/" title="Dashboard" />
      <TopBarLink to="/weapons/" title="Weapons" />
    </div>
    <InfoMenu
      open={infoMenuOpen}
      onToggleClick={handleInfoMenuToggleClick}
      resetUserData={clearUserOptions}
    />
  </div>
)
