import { Range, List, Map } from "immutable"

export const searchArray = (key, arr, value) => {
  let result = false
  arr.forEach(item => {
    if (item[key] === value) {
      result = item
    }
  })

  return result
}

export const titleize = title => {
  if (!title) return false
  return title.charAt(0).toUpperCase() + title.slice(1).replace(/-/g, " ")
}

export const chunkList = (list, chunkSize = 5) => {
  if (!list) return false

  return Range(0, list.count(), chunkSize).map(chunkStart =>
    list.slice(chunkStart, chunkStart + chunkSize)
  )
}

// export const basicCopy = item => {
//   return JSON.parse(JSON.stringify(item))
// }

// export function removeOrAddFromList(list, item) {
//   if (!List.isList(list))
//     throw "must provide list to removeOrAddFromList util method"

//   if (list.includes(item)) {
//     // remove it
//     console.log("items exists, removing...")
//     list = list.delete(list.indexOf(item))
//   } else {
//     // add it
//     console.log("item does not exist, adding...")
//     list = list.push(item)
//   }

//   return list
// }

// map over properties in fresh Map and set to data type of default
// if there are no properties in fresh array, set to default property

export function mapAndMerge(defaults, fresh) {
  if (!Map.isMap(defaults) || !Map.isMap(fresh))
    throw "must pass Map to mapAndMerge"

  let result

  result = fresh.map((option, key) => {
    const defaultOption = defaults.get(key)
    // let optKey = userOptions[key]

    if (List.isList(defaultOption)) {
      // optKey = List(optKey)
      return List(option)
    } else if (Map.isMap(defaultOption)) {
      // optKey = Map(optKey)
      return Map(option)
    } else {
      // optKey = optKey
      return option
    }
  })

  if (result) result = defaults.merge(fresh)

  return result
}

/**
 * @param {Object} obj The Object you want recursively make immutable
 * @return {Map} A Map of the obj with all recursive children
 */
// export function makeImmutable(obj) {
//   // TODO: use recursion to loop through each property and convert to the same data type as the default
//   if (typeof obj != "object") throw "must provide object"

//   let result = Map(obj)

//   result = result.map(property => {
//     if(typeof property === 'array') return List(property)
//     if(typeof property === 'object') return Map(property)

//   })

//   return result
// }

// // compare numbers a to b, return a string of the difference ie. a = 3 b = 5; output would be '-2'
// export function compareNumbersToString(a, b) {

// }

/**
 * @param {Map} map A Map containing atleast one list
 * @param {String} listKey The key inside of map that is the list you want to search
 * @param {String|Number} valueInList The value you would like to either add/remove from the List
 * @return {Map} Returns a new Map with the value added/removed from the List
 */

export function toggleListInMapByKey(map, listKey, valueInList) {
  if (!Map.isMap(map)) throw "must provide an immutable Map as first argument"
  const list = map.get(listKey)
  if (!list) throw `no List found at ${listKey} in ${map}`
  if (!List.isList(list))
    throw `item found at ${listKey} in ${map} is not a list`

  let result = Map(map)
  if (list.includes(valueInList)) {
    // remove the value
    result = result.update(listKey, l => l.delete(l.indexOf(valueInList)))
  } else {
    // add the value
    result = result.update(listKey, l => l.push(valueInList))
  }

  return result
}

/**
 * @param {Object} item The current item in the .filter method
 * @param {Map} filter A Map of the current applied filters
 * @param {Map} userOptions A Map of the current applied userOptions
 * @return {boolean} Returns true if the item should remain in the list, false to filter it out
 */
export function itemFilterMethod(item, filters, userOptions) {
  const weaponTypes = filters.get("weaponTypes"),
    elementTypes = filters.get("elementTypes"),
    rarity = filters.get("rarity"),
    damageTypes = filters.get("damageTypes"),
    groups = filters.get("groups"),
    favorites = userOptions.get("favorites"),
    comparisons = userOptions.get("comparisons"),
    materials = filters.get("materials"),
    search = filters.get("search"),
    armorTypes = filters.get("armorTypes"),
    ranks = filters.get("ranks"),
    slots = filters.get("slots")

  const favWeapons = favorites.get("weapons"),
    favArmor = favorites.get("armor"),
    compWeapons = comparisons.get("weapons"),
    compArmor = comparisons.get("armor")

  // console.log("groups: ", groups)
  // console.log("favWeapons: ", favWeapons.toArray())
  // debugger
  // default let all items through
  let result = true

  // check search keywords

  if (search) {
    // TODO: find a library that can fuzzy search objects
    if (item.name.toLowerCase().includes(search.toLowerCase())) {
      result = true
    } else {
      return false
    }
  }

  // check item groups
  if (groups.size > 0) {
    if (
      groups.includes("favorites") &&
      (!favWeapons.includes(item.id) && !favArmor.includes(item.id))
    )
      return false
    if (
      groups.includes("comparisons") &&
      (!compWeapons.includes(item.id) && !compArmor.includes(item.id))
    )
      return false
  }

  // check weapon types
  if (weaponTypes.size > 0 && !weaponTypes.includes(item.type)) return false

  // check rarity
  if (rarity.size > 0 && !rarity.includes(item.rarity)) return false

  // Check damage types
  if (damageTypes.size > 0 && !damageTypes.includes(item.attributes.damageType))
    return false

  if (elementTypes.size > 0) {
    const weaponElements = List(item.elements).map(e => e.type)

    if (elementTypes.isSubset(weaponElements)) {
      result = true
    } else {
      return false
    }
  }

  // check selected materials

  if (materials.size) {
    const { craftingMaterials, upgradeMaterials } = item.crafting

    const weaponMaterials = item.crafting.craftable
      ? craftingMaterials
      : upgradeMaterials

    // materials.forEach(mat => {
    //   if (weaponMaterials.every(weaponMat => mat.value === weaponMat.item.id))
    //     result = true
    // })

    const selectedMaterialIdList = materials.map(mat => mat.value)
    const weaponMaterialIdList = List(weaponMaterials.map(mat => mat.item.id))

    if (selectedMaterialIdList.isSubset(weaponMaterialIdList)) {
      result = true
    } else {
      return false
    }
    // console.log(selectedMaterialIdList.toJS())
    // console.log(weaponMaterialIdList.toJS())
    // debugger

    // weaponMaterials.forEach(weaponMat => {

    // })
  }

  if (armorTypes.size) {
    if (armorTypes.includes(item.type)) {
      result = true
    } else {
      return false
    }
  }

  if (ranks.size) {
    if (ranks.includes(item.rank)) {
      result = true
    } else {
      return false
    }
  }

  if (slots.size) {
    if (item.slots.length === 0) return false
    let slotResult = false
    item.slots.forEach(slot => {
      if (slots.includes(slot.rank)) slotResult = true
    })

    result = slotResult
  }

  return result
}

export function itemOrderMethod(a, b, order) {
  let aVal = a[order.key]
  let bVal = b[order.key]

  // handle attack ordering
  if (order.key === "attack") {
    aVal = a.attack.display
    bVal = b.attack.display
  }

  // handle elemental damage
  if (order.key === "elemental damage") {
    // if there are no elements on the a item, we push a back
    if (!a.elements) return false
    // if there are no elements on the second item, we leave a in the front
    if (!b.elements) return true

    aVal = a.elements.reduce((total, element) => total + element.damage, 0)
    bVal = b.elements.reduce((total, element) => total + element.damage, 0)
  }

  if (order.key === "defense") {
    // console.log(a.defense, b.defense)
    aVal = a.defense.base
    bVal = b.defense.base
  }

  if (order.key === "slots") {
    aVal = a.slots.reduce((total, s) => {
      return total + s.rank
    }, 0)
    bVal = b.slots.reduce((total, s) => {
      return total + s.rank
    }, 0)
  }

  if (order.direction === "ASC") {
    return aVal - bVal
  } else {
    return bVal - aVal
  }
}

// TODO: Refactor Me!
export function updateOrderList(prev, orderObject) {
  let { order } = prev

  if (order.size > 0) {
    const removeMe = []
    let foundItem = false
    // loop through each order object checking for a match
    // Check matching key directions and change if 'ASC', remove if 'DESC'
    order.forEach((item, i) => {
      if (item.key === orderObject.key) {
        foundItem = true
        if (item.direction === "DESC") {
          item.direction = "ASC"
          return
        }

        if (item.direction === "ASC") {
          removeMe.push(i)
        }
      }
    })

    // if the item was not found in loop, we need to add it
    if (!foundItem) order = order.push(orderObject)

    // remove any orderObjects targetted in earlier loop
    if (removeMe.length > 0)
      order = order.filter((_, i) => !removeMe.includes(i))
    // removeMe.forEach(i => order.splice(i, 1))
    // }
  } else {
    order = order.push(orderObject)
  }

  return order
}
