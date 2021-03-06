import { List, Map } from "immutable"

export const defaultFilters = Map({
  armorTypes: List(),
  damageTypes: List(),
  elementTypes: List(),
  groups: List(),
  materials: List(),
  rarity: List(),
  search: "",
  weaponTypes: List(),
  ranks: List(),
  slots: List(),
  skills: List(),
  resistances: Map({
    dragon: Map({
      active: false,
      min: 0,
      max: 0
    }),
    fire: Map({
      active: false,
      min: 0,
      max: 0
    }),
    ice: Map({
      active: false,
      min: 0,
      max: 0
    }),
    thunder: Map({
      active: false,
      min: 0,
      max: 0
    }),
    water: Map({
      active: false,
      min: 0,
      max: 0
    })
  })
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
