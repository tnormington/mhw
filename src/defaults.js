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
