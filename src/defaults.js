import { List, Map } from "immutable"

export const defaultFilters = Map({
  armorTypes: List(),
  damageTypes: List(),
  elementTypes: List(),
  groups: List(),
  materials: List(),
  rarity: List(),
  search: "",
  weaponTypes: List()
})

export const defaultUserOptions = Map({
  favorites: Map({
    weapons: List(),
    armor: List()
  }),
  comparisons: Map({
    weapons: List(),
    armor: List()
  }),
  wishlist: Map({
    weapons: List(),
    armor: List()
  }),
  selectedWeapons: List(),
  expandAll: false,
  selectedWeapon: null,
  selectedArmor: null
})
