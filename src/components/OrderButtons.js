import React, { Component } from "react"

// import { searchArray } from "../util"

export default class OrderButtons extends Component {
  render() {
    const { orders, order, handleOrderClick } = this.props

    return (
      <div style={{ marginBottom: "10px" }}>
        <label style={{ display: "block", marginBottom: "6px" }}>
          Order By
        </label>
        {orders.size > 0 &&
          orders.map(key => {
            let direction = false

            if (order.find(obj => obj.key === key)) {
              const currentObjectOrder = order.find(obj => obj.key === key)
              direction = currentObjectOrder.direction
            }

            return (
              <button
                style={{ marginRight: "10px" }}
                key={key}
                onClick={() => handleOrderClick(key)}
                className={direction ? "active" : ""}>
                {key}
                {direction && direction === "ASC" && (
                  <i className="fas fa-angle-double-up fa-fw" />
                )}
                {direction && direction === "DESC" && (
                  <i className="fas fa-angle-double-down fa-fw" />
                )}
                {!direction && <i className="fas fa-sort fa-fw" />}
              </button>
            )
          })}
      </div>
    )
  }
}
