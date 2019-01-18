import React from "react"
import TopBarLink from "./TopBarLink"
import InfoMenu from "./InfoMenu"
import colors from "../colors"

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
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
      background: colors.medGrey
    }}>
    <div style={{ display: "flex", marginLeft: "-10px" }}>
      <TopBarLink to="/" title="Dashboard" exact={true} />
      <TopBarLink to="/weapons/" title="Weapons" />
      <TopBarLink to="/armors/" title="Armor" />
    </div>
    <InfoMenu
      open={infoMenuOpen}
      onToggleClick={handleInfoMenuToggleClick}
      resetUserData={clearUserOptions}
    />
  </div>
)
