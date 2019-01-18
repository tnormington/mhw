import React from 'react';

import { titleize } from '../util'

// Icon
import head from "../icons/mhw-helm-headgear-wiki.png"
import waist from "../icons/mhw-waist-belt-wiki.png"
import legs from "../icons/mhw-feet-boots-greaves.png"
import gloves from "../icons/mhw-arm-gauntlets-wiki.png"
import chest from "../icons/mhw-torso-chest-plate-wiki.png"
import greatSword from "../icons/mhw_greatsword-icon.png"
import longSword from "../icons/mhw_longswords-icon.png"
import swordAndShield from "../icons/mhw_sword-shield-icon.png"
import dualBlades from "../icons/mhw_dual-blades-icon.png"
import hammer from "../icons/mhw_hammers-icon.png"
import huntingHorn from "../icons/mhw_hunting-horns-icon.png"
import lance from "../icons/mhw_lances-icon.png"
import gunlance from "../icons/mhw_gunlance-icon.png"
import lightBowgun from "../icons/mhw_light-bowgun-icon.png"
import switchAxe from "../icons/mhw_switch-axe-icon.png"
import chargeBlade from "../icons/mhw_charge-blade-icon.png"
import insectGlaive from "../icons/mhw_insect-glaive-icon.png"
import heavyBowgun from "../icons/mhw_heavy-bowgun-icon.png"
import bow from "../icons/mhw_bow-icon.png"

export default ({icon, size, style}) => {
  let imgSrc = false

  if(!size) size = 20

  switch (icon) {
    case "great-sword":
      imgSrc = greatSword
      break
    case "long-sword":
      imgSrc = longSword
      break
    case "sword-and-shield":
      imgSrc = swordAndShield
      break
    case "dual-blades":
      imgSrc = dualBlades
      break
    case "hammer":
      imgSrc = hammer
      break
    case "hunting-horn":
      imgSrc = huntingHorn
      break
    case "lance":
      imgSrc = lance
      break
    case "gunlance":
      imgSrc = gunlance
      break
    case "light-bowgun":
      imgSrc = lightBowgun
      break
    case "switch-axe":
      imgSrc = switchAxe
      break
    case "charge-blade":
      imgSrc = chargeBlade
      break
    case "insect-glaive":
      imgSrc = insectGlaive
      break
    case "heavy-bowgun":
      imgSrc = heavyBowgun
      break
    case "bow":
      imgSrc = bow
      break
    case "waist":
      imgSrc = waist
      break
    case "legs":
      imgSrc = legs
      break
    case "head":
      imgSrc = head
      break
    case "head":
      imgSrc = head
      break
    case "gloves":
      imgSrc = gloves
      break
    case "chest":
      imgSrc = chest
      break
    default:
      break
  }

  if(!imgSrc) {
    console.warn('no icon found');
    return null
  }

  return (
    <div style={{  ...style, width: `${size}px`, height: `${size}px` }}>
      <img 
        src={imgSrc}
        style={{ width: `${size}px`, height: `${size}px`, objectFit: 'contain'}}
        alt='Icon of' />
    </div>
  )
}