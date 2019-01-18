import React, { Component } from "react"

export default class Wishlist extends Component {
  render() {
    let { armor, weapons, wishlist } = this.props

    // console.log("wishlist: ", wishlist)
    // debugger
    const wishlistArmorIds = wishlist.get("armor")
    const wishlistWeaponIds = wishlist.get("weapons")

    armor = armor.filter(piece => wishlistArmorIds.includes(piece.id))
    weapons = weapons.filter(weapon => wishlistWeaponIds.includes(weapon.id))

    return (
      <div style={{ padding: "10px" }}>
        <h3>Weapons</h3>
        {weapons.map(weapon => (
          <div key={weapon.id}>{weapon.name}</div>
        ))}
        <h3>Armor</h3>
        {armor.map(piece => (
          <div key={piece.id}>{piece.name}</div>
        ))}
      </div>
    )
  }
}
