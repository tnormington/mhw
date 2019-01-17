import React from "react"
import colors from "../colors"

export default ({ show }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(18, 23, 36, 0.7)",
        display: "flex",
        // alignItems: "center",
        padding: "100px 10px",
        justifyContent: "center",
        pointerEvents: show ? "visible" : "none",
        opacity: show ? 1 : 0,
        zIndex: 900
      }}>
      <div
        style={{
          maxWidth: "700px",
          width: "100%",
          background: colors.grey,
          padding: "20px",
          boxShadow: "0 3px 16px rgba(0, 0, 0, 0.3)"
        }}>
        <h2 style={{ marginTop: 0 }}>Information</h2>
        <p>
          Check out the Github project README page{" "}
          <a href="https://github.com/tnormington/mhw" target="_blank">
            here
          </a>{" "}
          for more information. Keep in mind all persistent data is saved to
          your browser storage, so things will be different if you switch
          browsers or clear your cache.
        </p>
      </div>
    </div>
  )
}
